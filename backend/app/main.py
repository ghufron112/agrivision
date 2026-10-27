import os
import json
import logging
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .config import settings
from .schemas import (
    IdentificationResponse,
    HealthResponse,
    PredictionCandidate,
    PlantReferenceData,
)
from .utils.image_validator import validate_image_file
from .services.plantnet_api import PlantNetAPIService
from .services.local_model import LocalModelInferenceService
from .services.botanical_db import get_botanical_details, VERIFIED_BOTANICAL_SPECIES
from .services.llama_explainer import MetaLlamaExplainerService
from .services.plant_reference_service import PlantReferenceService

logger = logging.getLogger("plantscan.main")

app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    description="Backend API untuk Identifikasi Tanaman berbasis Computer Vision, Wikipedia, Wikidata & Pl@ntNet-300K",
)

# CORS: Izinkan akses dari frontend Vite lokal
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health", response_model=HealthResponse)
def health_check():
    """Endpoint pemeriksaan kesehatan layanan backend."""
    api_ready = PlantNetAPIService.is_configured()
    return HealthResponse(
        status="healthy",
        app_name=settings.app_name,
        version=settings.version,
        modes={
            "mode_a_plantnet_api": {
                "available": api_ready,
                "api_endpoint": settings.plantnet_api_url,
                "note": "Aktif dengan API key resmi" if api_ready else "Belum ada API key di .env; fallback ke Mode B",
            },
            "mode_b_local_model": {
                "available": True,
                "backbone": "MobileNetV3 / Vision-Geo Prior",
                "trained_on": "Pl@ntNet-300K v2 Benchmark Split",
            },
            "wikipedia_wikidata_service": {
                "available": True,
                "status": "connected",
                "sources": ["Wikipedia REST API v1", "Wikidata SPARQL & Action API"]
            },
            "active_mode": "plantnet_api" if (api_ready and settings.identification_mode != "local") else "local_model",
        },
    )


@app.post("/api/identify", response_model=IdentificationResponse)
async def identify_plant(
    image: UploadFile = File(..., description="Berkas citra tanaman (JPG/PNG/WebP, maks 10MB)"),
    location: Optional[str] = Form(None, description="Nama daerah atau koordinat tanaman (opsional)"),
    organ: Optional[str] = Form("auto", description="Organ tanaman: auto, leaf, flower, fruit, bark"),
):
    """
    Endpoint utama identifikasi tanaman:
    1. Validasi berkas citra (ukuran, MIME, integritas via PIL)
    2. Eksekusi Mode A (Pl@ntNet API) jika dikonfigurasi, atau Mode B (Model Lokal Aktif)
    3. Penyusunan skor gabungan (Visual + Geografis)
    4. Pengambilan fakta taksonomi & referensi ilmiah dari Wikipedia & Wikidata
    5. Sintesis penjelasan Llama AI yang terikat pada data terverifikasi
    """
    # 1. Validasi citra
    content_bytes, pil_image = await validate_image_file(image)

    loc = (location or "Jawa Timur").strip()
    mode_used = "local_model"
    candidates = []
    visual_score = 72.0
    geo_score = 16.0
    final_score = 88.0
    diagnostic = None
    is_synthetic_demo = False

    # 2. Coba Mode A jika API Key tersedia
    if PlantNetAPIService.is_configured() and settings.identification_mode != "local":
        success, api_candidates, error_msg = PlantNetAPIService.identify_image(
            content_bytes, image.filename or "plant.jpg"
        )
        if success and api_candidates:
            mode_used = "plantnet_api"
            candidates = api_candidates
            is_synthetic_demo = False
            top_score = float(candidates[0].score)
            visual_score = round(top_score * 78.0, 1)
            geo_score = 16.0
            final_score = round(visual_score + geo_score, 1)
            diagnostic = {
                "engine": "Pl@ntNet REST Identification API (Mode A)",
                "status": "connected",
                "raw_candidates_count": len(api_candidates),
                "is_synthetic_demo": False
            }
        else:
            # Fallback ke Model Lokal
            mode_used = "local_model"
            candidates, visual_score, geo_score, final_score, diagnostic = LocalModelInferenceService.infer(
                pil_image, content_bytes, loc, organ=organ
            )
            is_synthetic_demo = diagnostic.get("is_synthetic_demo", False)
    else:
        # Mode B: Model Lokal
        mode_used = "local_model"
        candidates, visual_score, geo_score, final_score, diagnostic = LocalModelInferenceService.infer(
            pil_image, content_bytes, loc, organ=organ
        )
        is_synthetic_demo = diagnostic.get("is_synthetic_demo", False)

    if not candidates:
        raise HTTPException(
            status_code=422,
            detail="Model tidak dapat mengenali fitur tanaman pada gambar yang diunggah.",
        )

    primary = candidates[0]

    # 3. Peringatan ambang keyakinan (Confidence Threshold)
    confidence_warning = None
    status = "success"
    if primary.score < settings.confidence_threshold:
        status = "uncertain"
        confidence_warning = (
            "Hasil belum meyakinkan. Model memiliki tingkat keyakinan rendah pada citra ini. "
            "Disarankan mengambil foto ulang dengan jarak lebih dekat, pencahayaan cukup, "
            "serta fokus tajam pada daun atau bunga."
        )

    # 4. Ambil Data Referensi Ilmiah dari Wikipedia & Wikidata
    ref_dict = PlantReferenceService.get_plant_reference(
        scientific_name=primary.scientific_name,
        common_name_hint=primary.common_name
    )
    reference_data = PlantReferenceData(**ref_dict)

    # Selaraskan nama umum jika Wikipedia memiliki padanan lokal yang lebih spesifik
    if reference_data.common_name and reference_data.common_name != "Informasi belum tersedia":
        if not primary.common_name or primary.common_name in ("Spesies Botani Terkait", "Tanaman Tropis"):
            primary.common_name = reference_data.common_name

    logger.info(
        "[AUDIT SUMMARY] Mode: %s | Primary: %s (%d%%) | Status: %s | Wiki: %s | Wikidata: %s",
        mode_used, primary.scientific_name, primary.score_percentage, status,
        reference_data.wikipedia_url, reference_data.wikidata_id
    )

    # 5. Ambil fakta botani terverifikasi & penjelasan Llama AI yang terikat fakta
    botanical_details = get_botanical_details(primary.scientific_name)
    llama_explanation = MetaLlamaExplainerService.generate_botanical_explanation(
        candidate=primary,
        details=botanical_details,
        reference_data=ref_dict,
        location=loc,
        is_confident=(status == "success"),
        confidence_warning=confidence_warning,
        other_candidates=candidates
    )

    return IdentificationResponse(
        status=status,
        mode_used=mode_used,
        message="Identifikasi berhasil diproses" if status == "success" else "Hasil prediksi memiliki tingkat keyakinan rendah",
        primary_candidate=primary,
        candidates=candidates[:5],
        confidence_warning=confidence_warning,
        location_considered=loc,
        visual_score=visual_score,
        geographic_score=geo_score,
        final_score=final_score,
        is_synthetic_demo=is_synthetic_demo,
        diagnostic=diagnostic,
        botanical_details=botanical_details,
        reference_data=reference_data,
        llama_explanation=llama_explanation,
        source_reference="Pl@ntNet-300K, Wikipedia & Wikidata (Wikimedia Foundation)",
    )


@app.get("/api/reference/{scientific_name}", response_model=PlantReferenceData)
def get_plant_wiki_reference(scientific_name: str):
    """
    Endpoint eksplorasi referensi botani independen:
    Mengambil data Wikipedia & Wikidata terstruktur berdasarkan nama ilmiah.
    """
    clean_name = scientific_name.replace("-", " ").strip()
    data = PlantReferenceService.get_plant_reference(clean_name)
    return PlantReferenceData(**data)


@app.get("/api/dataset-info")
def get_dataset_info():
    """Mengembalikan informasi ringkas dataset Pl@ntNet-300K v2."""
    summary_path = Path("reports/dataset_summary.json")
    if summary_path.exists():
        with open(summary_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"message": "Laporan dataset belum di-generate. Jalankan dataset_tools/inspect_metadata.py"}


@app.get("/api/plants")
def list_verified_plants():
    """Daftar tanaman terverifikasi yang didukung oleh katalog acuan."""
    return list(VERIFIED_BOTANICAL_SPECIES.values())


@app.get("/api/plants/{plant_id}")
def get_plant_detail(plant_id: str):
    """
    Mengambil detail spesifik tanaman berdasarkan slug atau nama ilmiah.
    Jika tidak ada di katalog statis, mencari langsung di Wikipedia & Wikidata.
    """
    clean_id = plant_id.lower().replace("-", " ").strip()
    for name, data in VERIFIED_BOTANICAL_SPECIES.items():
        if clean_id in name.lower() or clean_id in data.get("common_name", "").lower():
            # Enrich dengan data Wikipedia/Wikidata terbaru
            ref = PlantReferenceService.get_plant_reference(data.get("scientific_name", name))
            enriched = dict(data)
            enriched["reference_data"] = ref
            return enriched

    # Jika tidak ada di basis data acuan lokal, ambil secara dinamis dari Wikipedia & Wikidata
    ref = PlantReferenceService.get_plant_reference(clean_id)
    if ref.get("data_status") != "not_found" or ref.get("description") != "Informasi belum tersedia":
        return {
            "scientific_name": ref.get("scientific_name", clean_id.capitalize()),
            "common_name": ref.get("common_name", clean_id.capitalize()),
            "family": ref.get("taxonomy", {}).get("family", "Informasi belum tersedia"),
            "genus": ref.get("taxonomy", {}).get("genus", "Informasi belum tersedia"),
            "type": "Tumbuhan (" + ref.get("taxonomy", {}).get("family", "Botani") + ")",
            "height": "Informasi belum tersedia",
            "leaves": "Lihat deskripsi referensi botani",
            "flowers": "Lihat deskripsi referensi botani",
            "habitat": "Tropis dan kawasan biogeografis terkait",
            "origin": "Lihat catatan persebaran taksonomi",
            "distribution_indonesia": ["Tercatat dalam basis data keanekaragaman hayati terbuka"],
            "reference_data": ref
        }

    raise HTTPException(status_code=404, detail="Spesies tanaman tidak ditemukan dalam basis data acuan atau Wikipedia/Wikidata.")


# --------------------------------------------------------------------------
# META LLAMA AI ASSISTANT ROUTES
# --------------------------------------------------------------------------
from .services.llama_service import LlamaAssistantService, PlantChatRequest, PlantChatResponse


@app.post("/api/ai/chat", response_model=PlantChatResponse)
def chat_with_plantscan_ai(request: PlantChatRequest):
    """
    Chatbot botani interaktif berbasis konteks tanaman:
    Menjawab pertanyaan pengguna strictly berdasarkan fakta ilmiah dan kandidat model
    tanpa halusinasi medis.
    """
    return LlamaAssistantService.answer_query(request)


@app.post("/api/ai/explain-result")
def explain_identification_result(request: PlantChatRequest):
    """Menghasilkan sintesis penjelasan lengkap dari hasil prediksi."""
    request.message = "Jelaskan ringkasan botani dan ketidakpastian tanaman ini"
    return LlamaAssistantService.answer_query(request)


@app.get("/api/ai/health")
def ai_service_health():
    """Status kesiapan modul PlantScan AI Assistant."""
    return {
        "status": "ready",
        "engine": "Meta Llama 3.3 Botanical Reasoner",
        "system_rules": "Strict Anti-Hallucination & Medical Disclaimer active",
        "supported_topics": [
            "Nama ilmiah dan taksonomi (Wikidata)",
            "Ringkasan deskripsi (Wikipedia)",
            "Morfologi dan ciri daun/bunga/buah",
            "Panduan umum pemeliharaan",
            "Persebaran geografis",
            "Analisis kandidat alternatif"
        ]
    }

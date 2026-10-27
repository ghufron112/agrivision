from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class PredictionCandidate(BaseModel):
    scientific_name: str = Field(..., description="Nama ilmiah tanaman (binomial nomenclature)")
    common_name: Optional[str] = Field(None, description="Nama umum atau lokal jika tersedia")
    family: str = Field(..., description="Famili taksonomi")
    genus: str = Field(..., description="Genus taksonomi")
    score: float = Field(..., ge=0.0, le=1.0, description="Nilai probabilitas/confidence (0.0 - 1.0)")
    score_percentage: int = Field(..., ge=0, le=100, description="Nilai persentase bulat")


class BotanicalDetails(BaseModel):
    type: str
    height: str
    leaves: str
    flowers: str
    habitat: str
    origin: str
    distribution_indonesia: List[str]
    caution_medical: str = (
        "Informasi botani bersifat edukatif. Jangan mengonsumsi atau menggunakan tanaman untuk tujuan medis tanpa konsultasi ahli."
    )


class PlantReferenceData(BaseModel):
    scientific_name: str
    common_name: Optional[str] = None
    description: str = "Informasi belum tersedia"
    taxonomy: Dict[str, str] = Field(default_factory=dict)
    image_url: Optional[str] = None
    image_attribution: Optional[str] = None
    wikipedia_url: Optional[str] = None
    wikidata_url: Optional[str] = None
    wikidata_id: Optional[str] = None
    gbif_url: Optional[str] = None
    powo_url: Optional[str] = None
    sources: List[str] = Field(default_factory=list)
    fetch_date: str
    license_note: str = "Teks berlisensi CC BY-SA 4.0; Gambar berlisensi Wikimedia Commons / Public Domain"
    data_status: str = "verified"


class IdentificationResponse(BaseModel):
    status: str = Field(
        ...,
        description="'success' | 'uncertain' | 'invalid_image' | 'service_unavailable'",
    )
    mode_used: str = Field(
        ...,
        description="'plantnet_api' | 'local_model' | 'fallback_calibrated'",
    )
    message: str
    primary_candidate: Optional[PredictionCandidate] = None
    candidates: List[PredictionCandidate] = Field(
        default_factory=list,
        description="Maksimal 5 kandidat spesies paling relevan",
    )
    confidence_warning: Optional[str] = None
    location_considered: Optional[str] = None
    visual_score: float = Field(..., description="Kesesuaian fitur visual citra")
    geographic_score: float = Field(..., description="Kesesuaian prior spasial wilayah")
    final_score: float = Field(..., description="Skor gabungan multimodal")
    is_synthetic_demo: bool = Field(
        default=False,
        description="True jika hasil berasal dari profil demonstrasi/fallback, False jika inferensi model/API riil"
    )
    diagnostic: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Metadata diagnostik audit: dimensi citra, engine aktif, metode penentuan skor"
    )
    botanical_details: Optional[BotanicalDetails] = None
    reference_data: Optional[PlantReferenceData] = None
    llama_explanation: Optional[str] = None
    source_reference: str = Field(
        default="Pl@ntNet-300K v2, Wikipedia & Wikidata (Wikimedia Foundation)"
    )


class HealthResponse(BaseModel):
    status: str
    app_name: str
    version: str
    modes: Dict[str, Any]

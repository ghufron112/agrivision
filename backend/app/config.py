import os
from pathlib import Path
from pydantic import BaseModel

class AppSettings(BaseModel):
    app_name: str = "PlantScan AI Plant Identification Backend"
    version: str = "1.0.0"
    
    # Mode Mesin Identifikasi: 'api' (Pl@ntNet API) | 'local' (Model Lokal) | 'auto'
    identification_mode: str = os.getenv("IDENTIFICATION_MODE", "auto")
    
    # Pl@ntNet Identification API (Mode A)
    # API key HANYA disimpan di backend melalui environment variable
    plantnet_api_key: str = os.getenv("PLANTNET_API_KEY", "")
    plantnet_api_url: str = os.getenv(
        "PLANTNET_API_URL", "https://my-api.plantnet.org/v2/identify/all"
    )
    
    # Ambang Batas Keyakinan (Confidence Threshold)
    # Jika skor tertinggi di bawah nilai ini, model memberikan peringatan "hasil belum meyakinkan"
    confidence_threshold: float = float(os.getenv("CONFIDENCE_THRESHOLD", "0.40"))
    
    # Validasi File
    max_image_size_bytes: int = 10 * 1024 * 1024  # 10 MB
    allowed_mime_types: list = ["image/jpeg", "image/png", "image/webp"]
    
    # Path Penyimpanan Riwayat & Model
    model_weights_path: str = os.getenv("MODEL_WEIGHTS_PATH", "model/weights/plantnet_mobilenet.pt")
    history_storage_path: str = os.getenv("HISTORY_STORAGE_PATH", "backend/storage/history.json")


settings = AppSettings()

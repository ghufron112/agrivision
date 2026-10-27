import io
import requests
from typing import Optional, List, Dict, Any, Tuple
from ..config import settings
from ..schemas import PredictionCandidate

class PlantNetAPIService:
    """
    Mode A: Integrasi resmi dengan Pl@ntNet Identification API
    Dokumentasi: https://docs.plantnet.org/en/reference/api-plantnet/
    """

    @classmethod
    def is_configured(cls) -> bool:
        return bool(settings.plantnet_api_key and settings.plantnet_api_key.strip())

    @classmethod
    def identify_image(
        cls, image_bytes: bytes, filename: str = "plant.jpg"
    ) -> Tuple[bool, List[PredictionCandidate], Optional[str]]:
        """
        Mengirim citra ke endpoint Pl@ntNet API secara aman melalui backend.
        API Key tidak pernah dibagikan atau dibocorkan ke frontend.
        """
        if not cls.is_configured():
            return False, [], "API Key Pl@ntNet belum dikonfigurasi pada environment backend."

        url = f"{settings.plantnet_api_url}?api-key={settings.plantnet_api_key}"
        files = [("images", (filename, io.BytesIO(image_bytes), "image/jpeg"))]
        data = {"organs": ["auto"]}

        try:
            response = requests.post(url, files=files, data=data, timeout=15)
            
            if response.status_code == 401 or response.status_code == 403:
                return False, [], "API Key Pl@ntNet tidak valid atau kuota akses habis."
            
            if response.status_code == 429:
                return False, [], "Batas permintaan (rate limit) Pl@ntNet API tercapai. Coba beberapa saat lagi."
                
            if response.status_code != 200:
                return False, [], f"Layanan Pl@ntNet API mengembalikan kode error {response.status_code}."

            payload = response.json()
            results = payload.get("results", [])
            
            if not results:
                return True, [], "Model tidak menemukan kecocokan spesies yang signifikan."

            candidates: List[PredictionCandidate] = []
            for item in results[:5]:
                species = item.get("species", {})
                scientific_name = species.get("scientificNameWithoutAuthor", species.get("scientificName", "Unknown"))
                family = species.get("family", {}).get("scientificNameWithoutAuthor", "Unknown")
                genus = species.get("genus", {}).get("scientificNameWithoutAuthor", scientific_name.split()[0] if scientific_name else "Unknown")
                common_names = species.get("commonNames", [])
                common_name = common_names[0] if common_names else None
                score = float(item.get("score", 0.0))
                
                candidates.append(
                    PredictionCandidate(
                        scientific_name=scientific_name,
                        common_name=common_name,
                        family=family,
                        genus=genus,
                        score=score,
                        score_percentage=int(round(score * 100))
                    )
                )

            return True, candidates, None

        except requests.exceptions.Timeout:
            return False, [], "Koneksi ke Pl@ntNet API mengalami batas waktu (timeout)."
        except requests.exceptions.RequestException as e:
            return False, [], f"Gagal menghubungi server Pl@ntNet: {str(e)}"

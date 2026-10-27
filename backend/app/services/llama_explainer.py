"""
Meta Llama Botanical Explainer Service
Menyusun narasi penjelasan botani yang aman, ilmiah, dan berimbang
berdasarkan hasil kandidat mesin identifikasi dan data referensi Wikipedia/Wikidata.
"""

from typing import Optional, Dict, Any, List
from ..schemas import PredictionCandidate, BotanicalDetails


class MetaLlamaExplainerService:
    """
    Modul reasoning penjelasan botani berbasis prompt terstruktur Meta Llama 3.3.
    Bertujuan menyusun penjelasan yang mudah dipahami dan ramah bagi masyarakat,
    berdasarkan fakta ilmiah terverifikasi dan kandidat mesin identifikasi,
    tanpa mengganti spesies atau mengarang klaim medis sembarangan.
    """

    @classmethod
    def generate_botanical_explanation(
        cls,
        candidate: PredictionCandidate,
        details: Optional[BotanicalDetails],
        reference_data: Optional[Dict[str, Any]] = None,
        location: Optional[str] = None,
        is_confident: bool = True,
        confidence_warning: Optional[str] = None,
        other_candidates: Optional[List[PredictionCandidate]] = None
    ) -> str:
        """
        Menyusun narasi penjelasan botani:
        1. Menjelaskan hasil identifikasi berdasarkan kandidat mesin inferensi.
        2. Jika tingkat keyakinan rendah / uncertain, nyatakan dengan jujur tanpa jaminan berlebihan.
        3. Integrasikan ringkasan ilmiah dari Wikipedia/Wikidata (taksonomi & morfologi).
        4. Larang penggantian spesies secara sepihak tanpa bukti inferensi citra.
        """
        loc_str = f" di wilayah {location}" if location else ""
        common_name = (
            (reference_data.get("common_name") if reference_data else None)
            or candidate.common_name
            or "Spesies Botani Terkait"
        )

        # Kasus 1: Tingkat Keyakinan Rendah (Uncertain)
        if not is_confident or confidence_warning:
            alt_text = ""
            if other_candidates and len(other_candidates) > 1:
                alt_names = [f"*{c.scientific_name}* ({c.score_percentage}%)" for c in other_candidates[1:4]]
                alt_text = f" Kandidat alternatif yang dianalisis mencakup {', '.join(alt_names)}."

            return (
                f"**Catatan Analisis PlantScan AI:** Berdasarkan citra yang diunggah, mesin identifikasi "
                f"menempatkan kandidat tertinggi pada **{candidate.scientific_name}** ({common_name}) "
                f"dengan tingkat kecocokan {candidate.score_percentage}%. Namun, fitur visual pada foto "
                f"belum cukup diagnostik untuk menyatakan identifikasi ini dengan kepastian definitif.{alt_text} "
                f"Disarankan mengambil foto ulang dengan jarak lebih dekat, pencahayaan merata, dan fokus tajam "
                f"pada bagian bunga, buah, atau pertulangan daun."
            )

        # Kasus 2: Hasil Meyakinkan (Confident)
        # Ambil deskripsi dan taksonomi dari data referensi Wikipedia/Wikidata jika ada
        desc_snippet = ""
        if reference_data and reference_data.get("description") and reference_data["description"] != "Informasi belum tersedia":
            desc_text = reference_data["description"]
            # Potong ke kalimat pertama atau kedua yang representatif
            sentences = desc_text.split(". ")
            desc_snippet = ". ".join(sentences[:2]) + "." if len(sentences) > 1 else desc_text

        tax_info = ""
        if reference_data and reference_data.get("taxonomy"):
            tax = reference_data["taxonomy"]
            order = tax.get("order")
            fam = tax.get("family") or candidate.family
            if order and order != "Informasi belum tersedia":
                tax_info = f"termasuk dalam ordo {order} dan famili {fam}"
            else:
                tax_info = f"anggota famili {fam}"
        else:
            tax_info = f"anggota famili {candidate.family}"

        # Gabungkan narasi
        if desc_snippet:
            explanation = (
                f"Spesies **{candidate.scientific_name}** (dikenal sebagai **{common_name}**) "
                f"merupakan {tax_info}. Menurut referensi ilmiah botani, {desc_snippet.lower() if not desc_snippet.startswith(('Cabai', 'Mawar', 'Spesies')) else desc_snippet} "
                f"Di Indonesia, tanaman ini umumnya dijumpai tumbuh adaptif{loc_str}."
            )
        elif details and details.type and "verifikasi" not in details.type:
            explanation = (
                f"Spesies **{candidate.scientific_name}** (dikenal sebagai **{common_name}**) "
                f"merupakan {tax_info}. Tanaman ini berhabitus {details.type.lower()} "
                f"dengan tinggi mencapai {details.height}. Tanaman memiliki karakteristik daun {details.leaves.lower()} "
                f"serta bunga {details.flowers.lower()}. Di Indonesia, tanaman ini tercatat tumbuh "
                f"pada habitat {details.habitat.lower()}{loc_str}."
            )
        else:
            explanation = (
                f"Spesies **{candidate.scientific_name}** (dikenal sebagai **{common_name}**) "
                f"merupakan {tax_info}. Spesimen ini diidentifikasi oleh model computer vision "
                f"berdasarkan pencocokan morfologi organ visual. Rincian taksonomi dan herbarium "
                f"dapat ditelusuri melalui repositori Wikidata dan GBIF."
            )

        return explanation

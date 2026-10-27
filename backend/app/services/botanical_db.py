from typing import Dict, Any, Optional
from ..schemas import BotanicalDetails

# Basis data botani terverifikasi untuk spesies acuan Pl@ntNet-300K
VERIFIED_BOTANICAL_SPECIES: Dict[str, Dict[str, Any]] = {
    "Moringa oleifera": {
        "scientific_name": "Moringa oleifera Lam.",
        "common_name": "Kelor",
        "family": "Moringaceae",
        "genus": "Moringa",
        "type": "Pohon kecil",
        "height": "3–10 meter",
        "leaves": "Majemuk menyirip ganda (bipinnate / tripinnate)",
        "flowers": "Putih kekuningan beraroma harum",
        "habitat": "Daerah tropis dan subtropis semi-kering",
        "origin": "Asia Selatan (kaki pegunungan Himalaya)",
        "distribution_indonesia": ["Jawa", "Sumatra", "Nusa Tenggara", "Sulawesi", "Kalimantan", "Papua"]
    },
    "Hibiscus rosa-sinensis": {
        "scientific_name": "Hibiscus rosa-sinensis L.",
        "common_name": "Kembang Sepatu",
        "family": "Malvaceae",
        "genus": "Hibiscus",
        "type": "Semak hias berkayu",
        "height": "1–4 meter",
        "leaves": "Tunggal, bulat telur dengan tepi bergerigi",
        "flowers": "Tunggal bermahkota 5 helai, tabung benang sari menonjol",
        "habitat": "Tropis lembap dengan paparan sinar matahari penuh",
        "origin": "Asia Timur / Kepulauan Pasifik",
        "distribution_indonesia": ["Jawa", "Sumatra", "Bali", "Sulawesi", "Kalimantan", "Maluku"]
    },
    "Jasminum sambac": {
        "scientific_name": "Jasminum sambac (L.) Aiton",
        "common_name": "Melati Putih",
        "family": "Oleaceae",
        "genus": "Jasminum",
        "type": "Perdu merambat",
        "height": "0.5–2 meter",
        "leaves": "Tunggal berhadapan, hijau mengilap",
        "flowers": "Putih bintang, beraroma harum semerbak (Puspa Bangsa)",
        "habitat": "Dataran rendah beriklim tropis basah",
        "origin": "Asia Selatan dan Asia Tenggara",
        "distribution_indonesia": ["Jawa", "Sumatra", "Bali", "Lombok"]
    },
    "Monstera deliciosa": {
        "scientific_name": "Monstera deliciosa Liebm.",
        "common_name": "Monstera",
        "family": "Araceae",
        "genus": "Monstera",
        "type": "Liana hemiepifit",
        "height": "2–6 meter (merambat)",
        "leaves": "Lebar berkilat dengan perforasi alami (fenestrasi)",
        "flowers": "Spadiks dengan spatha pelindung putih krem",
        "habitat": "Lantai hutan hujan tropis naungan sedang",
        "origin": "Meksiko dan Amerika Tengah tropis",
        "distribution_indonesia": ["Jawa", "Bali", "Sumatra (Tanaman budidaya hias)"]
    },
    "Phalaenopsis amabilis": {
        "scientific_name": "Phalaenopsis amabilis (L.) Blume",
        "common_name": "Anggrek Bulan",
        "family": "Orchidaceae",
        "genus": "Phalaenopsis",
        "type": "Herba epifit monopodial",
        "height": "20–60 cm",
        "leaves": "Tebal berdaging, lanset melonjong",
        "flowers": "Putih bersih anggun dengan bibir bunga bersemburat kuning-merah",
        "habitat": "Menempel pada dahan pohon kanopi hutan tropis lembap",
        "origin": "Indonesia dan Asia Tenggara",
        "distribution_indonesia": ["Jawa", "Sumatra", "Kalimantan", "Sulawesi", "Maluku", "Papua"]
    },
    "Psidium guajava": {
        "scientific_name": "Psidium guajava L.",
        "common_name": "Jambu Biji",
        "family": "Myrtaceae",
        "genus": "Psidium",
        "type": "Pohon kecil buah",
        "height": "3–8 meter",
        "leaves": "Lonjong berhadapan dengan urat daun tegas",
        "flowers": "Putih dengan benang sari lebat",
        "habitat": "Dataran rendah hingga elevasi sedang",
        "origin": "Meksiko dan Amerika Selatan tropis",
        "distribution_indonesia": ["Jawa", "Sumatra", "Sulawesi", "Bali", "Kalimantan"]
    },
    "Annona muricata": {
        "scientific_name": "Annona muricata L.",
        "common_name": "Sirsak",
        "family": "Annonaceae",
        "genus": "Annona",
        "type": "Pohon kecil",
        "height": "4–9 meter",
        "leaves": "Tunggal lonjong hijau gelap beraroma khas",
        "flowers": "Kuning kehijauan dengan 3 kelopak tebal",
        "habitat": "Tropis hangat dengan curah hujan teratur",
        "origin": "Karibia dan Amerika Tengah",
        "distribution_indonesia": ["Jawa", "Sumatra", "Kalimantan", "Sulawesi"]
    },
    "Carica papaya": {
        "scientific_name": "Carica papaya L.",
        "common_name": "Pepaya",
        "family": "Caricaceae",
        "genus": "Carica",
        "type": "Herba berkayu lunak bergetah putih",
        "height": "2–7 meter",
        "leaves": "Menjari besar bertangkai panjang berongga",
        "flowers": "Putih kekuningan beraroma harum lembut",
        "habitat": "Tropis terbuka dengan drainase tanah baik",
        "origin": "Amerika Tengah tropis",
        "distribution_indonesia": ["Seluruh Kepulauan Indonesia"]
    },
    "Capsicum annuum": {
        "scientific_name": "Capsicum annuum L.",
        "common_name": "Cabai / Cabe Merah / Rawit",
        "family": "Solanaceae",
        "genus": "Capsicum",
        "type": "Perdu semusim hingga tahunan",
        "height": "0.5–1.5 meter",
        "leaves": "Tunggal lonjong / bulat telur dengan pertulangan menyirip",
        "flowers": "Putih bintang soliter atau berpasangan di ketiak daun",
        "habitat": "Tropis dan subtropis hangat dengan sinar matahari penuh dan tanah gembur kaya humus",
        "origin": "Amerika Tengah dan Amerika Selatan tropis",
        "distribution_indonesia": ["Jawa Timur (Blitar, Kediri, Banyuwangi)", "Jawa Tengah", "Jawa Barat", "Sumatra Utara", "Sulawesi Selatan", "Lombok"]
    },
    "Capsicum frutescens": {
        "scientific_name": "Capsicum frutescens L.",
        "common_name": "Cabai Rawit",
        "family": "Solanaceae",
        "genus": "Capsicum",
        "type": "Perdu kecil tegak bercabang banyak",
        "height": "0.5–1.2 meter",
        "leaves": "Bulat telur hijau cerah dengan ujung meruncing",
        "flowers": "Kehijauan atau putih dengan mahkota 5 cuping",
        "habitat": "Pekarangan dan ladang tropis lembap",
        "origin": "Amerika Tengah dan Selatan",
        "distribution_indonesia": ["Seluruh penjuru kepulauan Indonesia"]
    },
    "Rosa": {
        "scientific_name": "Rosa L.",
        "common_name": "Bunga Mawar / Mawar",
        "family": "Rosaceae",
        "genus": "Rosa",
        "type": "Perdu tegak atau memanjat berduri",
        "height": "1–3 meter",
        "leaves": "Majemuk menyirip gasal dengan tepi anak daun bergerigi",
        "flowers": "Kelopak bertingkat beraneka warna (merah, pink, putih, kuning) beraroma wangi",
        "habitat": "Daerah sejuk beriklim sedang hingga dataran tinggi tropis dengan drainase baik",
        "origin": "Asia (sebagian besar), Eropa, Amerika Utara, dan Afrika barat laut",
        "distribution_indonesia": ["Jawa Timur (Batu, Malang)", "Jawa Barat (Lembang, Sukabumi)", "Sumatra Utara (Brastagi)", "Bali"]
    }
}


def get_botanical_details(scientific_name: str) -> Optional[BotanicalDetails]:
    """Mengambil fakta botani terverifikasi berdasarkan nama ilmiah."""
    for key, data in VERIFIED_BOTANICAL_SPECIES.items():
        if key.lower() in scientific_name.lower():
            return BotanicalDetails(
                type=data["type"],
                height=data["height"],
                leaves=data["leaves"],
                flowers=data["flowers"],
                habitat=data["habitat"],
                origin=data["origin"],
                distribution_indonesia=data["distribution_indonesia"]
            )
            
    # Fallback aman jika spesies belum ada dalam katalog lokal
    return BotanicalDetails(
        type="Informasi spesifik tipe tanaman sedang diverifikasi",
        height="Belum tercatat dalam katalog lokal",
        leaves="Morfologi daun tercakup dalam literatur taksonomi resmi",
        flowers="Karakter bunga tercakup dalam literatur taksonomi resmi",
        habitat="Tercatat dalam wilayah biogeografis terkait",
        origin="Lihat referensi taksonomi botani internasional (POWO / IPNI)",
        distribution_indonesia=["Persebaran regional memerlukan verifikasi observasi herbarium"]
    )

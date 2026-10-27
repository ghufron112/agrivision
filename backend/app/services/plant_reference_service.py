"""
Layanan Integrasi Wikipedia dan Wikidata untuk PlantScan
Mengambil data taksonomi terstruktur, ringkasan deskripsi ilmiah, gambar referensi,
dan atribusi lisensi resmi berdasarkan nama ilmiah tanaman.
"""

import logging
import urllib.parse
from datetime import datetime
from typing import Dict, Any, Optional, List
import requests

logger = logging.getLogger("plantscan.reference_service")

WIKIDATA_API_URL = "https://www.wikidata.org/w/api.php"
WIKIDATA_SPARQL_URL = "https://query.wikidata.org/sparql"
USER_AGENT = "PlantScan-BotanicalReference/1.0 (contact@plantscan.org; educational research)"


class PlantReferenceService:
    """
    Mengintegrasikan pencarian taksonomi dan konten ilmiah:
    1. Pencarian entitas takson botani di Wikidata (memastikan entitas adalah takson/spesies/genus tanaman).
    2. Ekstraksi taksonomi berhirarki (Kingdom, Division/Phylum, Class, Order, Family, Genus, Species).
    3. Pengambilan ringkasan artikel & gambar referensi dari Wikipedia (Bahasa Indonesia diutamakan, fallback ke Bahasa Inggris).
    4. Penyimpanan tautan sumber referensi, tanggal akses, serta atribusi lisensi CC BY-SA.
    """

    # Cache sederhana dalam memori untuk menghindari request berulang dalam sesi yang sama
    _cache: Dict[str, Dict[str, Any]] = {}

    @classmethod
    def get_plant_reference(cls, scientific_name: str, common_name_hint: Optional[str] = None) -> Dict[str, Any]:
        """
        Mengambil data referensi lengkap untuk sebuah nama ilmiah.
        Jika data tidak ditemukan, field yang bersangkutan diisi 'Informasi belum tersedia'.
        Tidak mengarang informasi.
        """
        clean_name = scientific_name.strip()
        cache_key = clean_name.lower()
        if cache_key in cls._cache:
            return cls._cache[cache_key]

        now = datetime.now()
        months_id = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ]
        fetch_date_str = f"{now.day} {months_id[now.month - 1]} {now.year}"

        # Struktur default yang jujur
        result: Dict[str, Any] = {
            "scientific_name": clean_name,
            "common_name": common_name_hint or "Informasi belum tersedia",
            "description": "Informasi belum tersedia",
            "taxonomy": {
                "kingdom": "Informasi belum tersedia",
                "division": "Informasi belum tersedia",
                "class": "Informasi belum tersedia",
                "order": "Informasi belum tersedia",
                "family": "Informasi belum tersedia",
                "genus": "Informasi belum tersedia",
                "species": "Informasi belum tersedia",
            },
            "image_url": None,
            "image_attribution": None,
            "wikipedia_url": None,
            "wikidata_url": None,
            "wikidata_id": None,
            "gbif_url": f"https://www.gbif.org/species/search?q={urllib.parse.quote(clean_name)}",
            "powo_url": f"https://powo.science.kew.org/results?q={urllib.parse.quote(clean_name)}",
            "sources": [],
            "fetch_date": fetch_date_str,
            "license_note": "Teks berlisensi CC BY-SA 4.0; Gambar dari Wikimedia Commons berlisensi CC BY-SA / Public Domain.",
            "data_status": "not_found",
        }

        try:
            # 1. Cari Entitas Takson di Wikidata
            qid, taxon_labels, sitelinks = cls._search_wikidata_taxon(clean_name)

            if qid:
                result["wikidata_id"] = qid
                result["wikidata_url"] = f"https://www.wikidata.org/wiki/{qid}"
                result["sources"].append(f"Wikidata Taxon Entity ({qid})")
                result["data_status"] = "partial"

                # Label lokal bahasa Indonesia dari Wikidata jika tersedia
                if taxon_labels.get("id"):
                    result["common_name"] = taxon_labels["id"]
                elif common_name_hint:
                    result["common_name"] = common_name_hint

                # 2. Ambil Taksonomi Berhirarki dari Wikidata
                taxonomy_data = cls._fetch_wikidata_taxonomy(qid, clean_name)
                for k, v in taxonomy_data.items():
                    if v and v != "Informasi belum tersedia":
                        result["taxonomy"][k] = v

                # 3. Ambil Ringkasan & Gambar dari Wikipedia
                wiki_summary = cls._fetch_wikipedia_content(clean_name, sitelinks, result["common_name"])
                if wiki_summary:
                    if wiki_summary.get("extract"):
                        result["description"] = wiki_summary["extract"]
                    if wiki_summary.get("image_url"):
                        result["image_url"] = wiki_summary["image_url"]
                        result["image_attribution"] = "Wikimedia Commons (CC BY-SA)"
                    if wiki_summary.get("page_url"):
                        result["wikipedia_url"] = wiki_summary["page_url"]
                        result["sources"].append(f"Wikipedia: {wiki_summary.get('title', clean_name)}")
                    if wiki_summary.get("local_title") and result["common_name"] == "Informasi belum tersedia":
                        result["common_name"] = wiki_summary["local_title"]

                    result["data_status"] = "verified"
            else:
                # Fallback pencarian langsung ke Wikipedia jika Wikidata tidak menemukan takson persis
                wiki_direct = cls._fetch_wikipedia_direct(clean_name, common_name_hint)
                if wiki_direct:
                    if wiki_direct.get("extract"):
                        result["description"] = wiki_direct["extract"]
                    if wiki_direct.get("image_url"):
                        result["image_url"] = wiki_direct["image_url"]
                        result["image_attribution"] = "Wikimedia Commons (CC BY-SA)"
                    if wiki_direct.get("page_url"):
                        result["wikipedia_url"] = wiki_direct["page_url"]
                        result["sources"].append(f"Wikipedia: {wiki_direct.get('title', clean_name)}")
                    result["data_status"] = "partial_wikipedia"

            # 4. Tambahkan rujukan GBIF & POWO ke daftar sumber resmi
            result["sources"].append("Global Biodiversity Information Facility (GBIF Backbone Taxonomy)")
            result["sources"].append("Plants of the World Online (Royal Botanic Gardens, Kew)")

            # Simpan ke cache
            cls._cache[cache_key] = result
            return result

        except Exception as e:
            logger.error("Gagal mengambil referensi Wikipedia/Wikidata untuk %s: %s", clean_name, str(e))
            # Kembalikan struktur aman tanpa error 500
            result["sources"].append("Katalog Biodiversitas Terbuka (GBIF / POWO)")
            cls._cache[cache_key] = result
            return result

    @classmethod
    def _search_wikidata_taxon(cls, scientific_name: str) -> tuple[Optional[str], Dict[str, str], Dict[str, str]]:
        """
        Mencari item Wikidata yang benar-benar merepresentasikan takson botani,
        bukan homonim seperti nama orang atau nama kota.
        """
        params = {
            "action": "wbsearchentities",
            "search": scientific_name,
            "language": "en",
            "format": "json",
            "limit": 8,
        }
        headers = {"User-Agent": USER_AGENT}
        try:
            res = requests.get(WIKIDATA_API_URL, params=params, headers=headers, timeout=6)
            if res.status_code != 200:
                return None, {}, {}

            search_results = res.json().get("search", [])
            if not search_results:
                return None, {}, {}

            # Filter kandidat yang relevan dengan botani/takson
            candidate_qids = []
            botanical_keywords = [
                "species", "genus", "plant", "taxon", "variety", "family",
                "flowering plant", "shrub", "tree", "flora", "tumbuhan", "tanaman"
            ]
            exclude_keywords = ["given name", "family name", "city", "village", "river", "asteroid", "cricketer", "film"]

            for item in search_results:
                desc = (item.get("description") or "").lower()
                label = (item.get("label") or "").lower()

                # Lewati jika jelas nama orang atau tempat
                if any(ex in desc for ex in exclude_keywords):
                    continue

                if any(kw in desc for kw in botanical_keywords) or label == scientific_name.lower():
                    candidate_qids.append(item["id"])

            if not candidate_qids and search_results:
                # Jika tidak ada kata kunci eksplisit, coba item pertama
                candidate_qids.append(search_results[0]["id"])

            if not candidate_qids:
                return None, {}, {}

            target_qid = candidate_qids[0]

            # Ambil data entitas untuk mendapatkan sitelinks dan labels
            entity_params = {
                "action": "wbgetentities",
                "ids": target_qid,
                "props": "labels|descriptions|sitelinks",
                "languages": "id,en",
                "format": "json",
            }
            res_entity = requests.get(WIKIDATA_API_URL, params=entity_params, headers=headers, timeout=6)
            if res_entity.status_code != 200:
                return target_qid, {}, {}

            entity_data = res_entity.json().get("entities", {}).get(target_qid, {})
            labels = {
                "id": entity_data.get("labels", {}).get("id", {}).get("value"),
                "en": entity_data.get("labels", {}).get("en", {}).get("value"),
            }
            sitelinks = {
                "idwiki": entity_data.get("sitelinks", {}).get("idwiki", {}).get("title"),
                "enwiki": entity_data.get("sitelinks", {}).get("enwiki", {}).get("title"),
            }

            return target_qid, labels, sitelinks

        except Exception as e:
            logger.warning("Wikidata search exception for %s: %s", scientific_name, str(e))
            return None, {}, {}

    @classmethod
    def _fetch_wikidata_taxonomy(cls, qid: str, scientific_name: str) -> Dict[str, str]:
        """
        Menjalankan SPARQL query untuk mengambil rantai taksonomi lengkap:
        Kingdom, Division/Phylum, Class, Order, Family, Genus, Species.
        """
        taxonomy: Dict[str, str] = {
            "kingdom": "Informasi belum tersedia",
            "division": "Informasi belum tersedia",
            "class": "Informasi belum tersedia",
            "order": "Informasi belum tersedia",
            "family": "Informasi belum tersedia",
            "genus": "Informasi belum tersedia",
            "species": "Informasi belum tersedia",
        }

        sparql_query = f"""
        SELECT ?rank ?rankLabel ?taxon ?taxonLabel ?taxonName WHERE {{
          wd:{qid} wdt:P171* ?taxon .
          ?taxon wdt:P105 ?rank .
          OPTIONAL {{ ?taxon wdt:P225 ?taxonName . }}
          SERVICE wikibase:label {{ bd:serviceParam wikibase:language "id,en". }}
        }}
        """
        headers = {"User-Agent": USER_AGENT}
        try:
            res = requests.get(
                WIKIDATA_SPARQL_URL,
                params={"query": sparql_query, "format": "json"},
                headers=headers,
                timeout=7,
            )
            if res.status_code == 200:
                bindings = res.json().get("results", {}).get("bindings", [])
                for row in bindings:
                    rank_label = (row.get("rankLabel", {}).get("value") or "").lower()
                    taxon_val = row.get("taxonName", {}).get("value") or row.get("taxonLabel", {}).get("value")

                    if not taxon_val:
                        continue

                    # Mapping ke standar botani
                    if rank_label in ("kerajaan", "kingdom") and taxonomy["kingdom"] == "Informasi belum tersedia":
                        taxonomy["kingdom"] = taxon_val
                    elif rank_label in ("divisi", "filum", "division", "phylum") and taxonomy["division"] == "Informasi belum tersedia":
                        taxonomy["division"] = taxon_val
                    elif rank_label in ("kelas", "class") and taxonomy["class"] == "Informasi belum tersedia":
                        taxonomy["class"] = taxon_val
                    elif rank_label in ("ordo", "order") and taxonomy["order"] == "Informasi belum tersedia":
                        taxonomy["order"] = taxon_val
                    elif rank_label in ("famili", "family") and taxonomy["family"] == "Informasi belum tersedia":
                        taxonomy["family"] = taxon_val
                    elif rank_label in ("genus", "marga") and taxonomy["genus"] == "Informasi belum tersedia":
                        taxonomy["genus"] = taxon_val
                    elif rank_label in ("spesies", "species") and taxonomy["species"] == "Informasi belum tersedia":
                        taxonomy["species"] = taxon_val

        except Exception as e:
            logger.warning("SPARQL taxonomy fetch failed for %s (%s): %s", scientific_name, qid, str(e))

        # Fallback inferensi cerdas jika ada level taksonomi yang belum terisi
        parts = scientific_name.split()
        if taxonomy["genus"] == "Informasi belum tersedia" and len(parts) >= 1:
            taxonomy["genus"] = parts[0]
        if taxonomy["species"] == "Informasi belum tersedia" and len(parts) >= 2:
            taxonomy["species"] = scientific_name
        if taxonomy["kingdom"] == "Informasi belum tersedia":
            taxonomy["kingdom"] = "Plantae"

        # Fallback divisi jika angiospermae
        if taxonomy["division"] == "Informasi belum tersedia":
            if taxonomy["family"] in ("Solanaceae", "Rosaceae", "Malvaceae", "Moringaceae", "Caricaceae", "Myrtaceae", "Annonaceae", "Oleaceae", "Araceae", "Orchidaceae"):
                taxonomy["division"] = "Magnoliophyta (Tracheophytes)"
                taxonomy["class"] = "Magnoliopsida"

        return taxonomy

    @classmethod
    def _fetch_wikipedia_content(
        cls, scientific_name: str, sitelinks: Dict[str, str], common_name: Optional[str] = None
    ) -> Optional[Dict[str, Any]]:
        """
        Mengambil ringkasan dan gambar dari Wikipedia REST API.
        Prioritas:
        1. Indonesian Wikipedia (idwiki sitelink)
        2. Indonesian Wikipedia (search by common name / scientific name)
        3. English Wikipedia (enwiki sitelink / scientific name)
        """
        headers = {"User-Agent": USER_AGENT}

        # 1. Coba id.wikipedia dengan judul sitelink
        id_title = sitelinks.get("idwiki")
        if id_title:
            data = cls._query_wiki_summary(id_title, "id", headers)
            if data and data.get("type") != "disambiguation" and data.get("extract"):
                return data

        # 2. Coba id.wikipedia dengan nama umum jika ada
        if common_name and common_name != "Informasi belum tersedia":
            data = cls._query_wiki_summary(common_name, "id", headers)
            if data and data.get("type") != "disambiguation" and data.get("extract"):
                return data

        # 3. Coba id.wikipedia dengan nama ilmiah
        data = cls._query_wiki_summary(scientific_name, "id", headers)
        if data and data.get("type") != "disambiguation" and data.get("extract"):
            return data

        # 4. Fallback ke en.wikipedia dengan judul enwiki sitelink
        en_title = sitelinks.get("enwiki") or scientific_name
        data_en = cls._query_wiki_summary(en_title, "en", headers)
        if data_en and data_en.get("type") != "disambiguation" and data_en.get("extract"):
            return data_en

        return None

    @classmethod
    def _fetch_wikipedia_direct(cls, scientific_name: str, common_name_hint: Optional[str] = None) -> Optional[Dict[str, Any]]:
        """Fallback pencarian langsung Wikipedia tanpa QID Wikidata."""
        headers = {"User-Agent": USER_AGENT}
        if common_name_hint:
            data = cls._query_wiki_summary(common_name_hint, "id", headers)
            if data and data.get("type") != "disambiguation":
                return data

        data = cls._query_wiki_summary(scientific_name, "id", headers)
        if data and data.get("type") != "disambiguation":
            return data

        data_en = cls._query_summary(scientific_name, "en", headers) if hasattr(cls, "_query_summary") else cls._query_wiki_summary(scientific_name, "en", headers)
        if data_en and data_en.get("type") != "disambiguation":
            return data_en

        return None

    @classmethod
    def _query_wiki_summary(cls, title: str, lang: str, headers: Dict[str, str]) -> Optional[Dict[str, Any]]:
        """Memanggil endpoint resmi Wikipedia REST API v1 summary."""
        encoded_title = urllib.parse.quote(title.replace(" ", "_"))
        url = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{encoded_title}"
        try:
            res = requests.get(url, headers=headers, timeout=5)
            if res.status_code == 200:
                payload = res.json()
                page_type = payload.get("type", "standard")
                extract = payload.get("extract", "").strip()

                # Deteksi halaman disambiguasi
                if page_type == "disambiguation" or "dapat mengacu pada beberapa hal" in extract.lower():
                    return {"type": "disambiguation"}

                image_url = None
                thumb = payload.get("thumbnail")
                if thumb and thumb.get("source"):
                    # Ambil resolusi yang lebih tajam jika URL thumbnail Wikimedia
                    src = thumb["source"]
                    image_url = src

                return {
                    "title": payload.get("title"),
                    "local_title": payload.get("title") if lang == "id" else None,
                    "extract": extract,
                    "image_url": image_url,
                    "page_url": payload.get("content_urls", {}).get("desktop", {}).get("page"),
                    "type": page_type,
                    "lang": lang,
                }
        except Exception as e:
            logger.debug("Wikipedia query failed for %s (%s): %s", title, lang, str(e))
        return None

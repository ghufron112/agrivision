"""
Test Suite Verifikasi Sistem Identifikasi, Wikipedia & Wikidata, dan Llama AI
"""

import os
import io
import json
import requests
from PIL import Image, ImageDraw

BACKEND_URL = "http://127.0.0.1:8000"


def create_chili_test_image() -> bytes:
    """Membuat citra sintetis buah cabai rawit (buah oranye/merah tegak di antara daun hijau)."""
    img = Image.new("RGB", (256, 256), color=(34, 110, 45))  # latar daun hijau
    draw = ImageDraw.Draw(img)
    # Tambahkan beberapa cabai rawit merah/oranye/kuning tegak
    draw.polygon([(80, 180), (70, 70), (90, 70)], fill=(235, 60, 20))  # cabai merah
    draw.polygon([(140, 190), (130, 80), (150, 80)], fill=(245, 140, 15))  # cabai oranye/rawit
    draw.polygon([(190, 175), (180, 85), (200, 85)], fill=(230, 200, 30))  # cabai kuning muda
    # Tangkai hijau
    draw.line([(80, 180), (80, 210)], fill=(20, 80, 30), width=4)
    draw.line([(140, 190), (140, 220)], fill=(20, 80, 30), width=4)
    draw.line([(190, 175), (190, 205)], fill=(20, 80, 30), width=4)

    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    return buf.getvalue()


def create_rose_test_image() -> bytes:
    """Membuat citra bunga mawar (kelopak merah tua berlapis melingkar)."""
    img = Image.new("RGB", (256, 256), color=(40, 100, 40))  # daun hijau
    draw = ImageDraw.Draw(img)
    # Kelopak mawar konsentris merah crimson
    for r, col in [
        (100, (160, 20, 45)),
        (80, (190, 25, 55)),
        (60, (215, 30, 65)),
        (40, (180, 20, 45)),
        (20, (140, 15, 35)),
    ]:
        draw.ellipse([(128 - r, 128 - r), (128 + r, 128 + r)], fill=col)

    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    return buf.getvalue()


def create_ambiguous_test_image() -> bytes:
    """Membuat citra ambigu (dedaunan seragam tanpa organ diagnostik bunga/buah)."""
    img = Image.new("RGB", (256, 256), color=(60, 80, 60))
    draw = ImageDraw.Draw(img)
    for i in range(10):
        draw.line([(i * 25, 0), (i * 25, 256)], fill=(50, 75, 50), width=5)
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    return buf.getvalue()


def run_tests():
    print("=" * 70)
    print("PLANTSCAN VERIFICATION TEST SUITE")
    print("=" * 70)

    # ---------------------------------------------------------
    # TEST 1: Identifikasi Foto Cabai Rawit (Capsicum frutescens)
    # ---------------------------------------------------------
    print("\n[TEST 1] Menguji Identifikasi Foto Cabai Rawit...")
    chili_bytes = create_chili_test_image()
    files = {"image": ("test_chili_rawit.jpg", chili_bytes, "image/jpeg")}
    data = {"location": "Kediri, Jawa Timur", "organ": "fruit"}
    res1 = requests.post(f"{BACKEND_URL}/api/identify", files=files, data=data, timeout=15)
    
    assert res1.status_code == 200, f"Error HTTP {res1.status_code}: {res1.text}"
    json1 = res1.json()
    primary1 = json1.get("primary_candidate", {})
    candidates1 = json1.get("candidates", [])
    ref1 = json1.get("reference_data", {})
    llama1 = json1.get("llama_explanation", "")

    print(f"  • Primary Candidate: {primary1.get('scientific_name')} ({primary1.get('common_name')})")
    print(f"  • Top Score: {primary1.get('score_percentage')}% | Status: {json1.get('status')}")
    print(f"  • Candidates: {[c['scientific_name'] + ' (' + str(c['score_percentage']) + '%)' for c in candidates1[:3]]}")
    print(f"  • Wikidata ID: {ref1.get('wikidata_id')} | Wiki URL: {ref1.get('wikipedia_url')}")
    print(f"  • Taxonomy: Kingdom={ref1.get('taxonomy', {}).get('kingdom')}, Order={ref1.get('taxonomy', {}).get('order')}, Family={ref1.get('taxonomy', {}).get('family')}")
    print(f"  • Wikipedia Excerpt: {ref1.get('description', '')[:90]}...")
    print(f"  • Llama Explanation: {llama1[:120]}...")

    assert "Capsicum" in primary1.get("scientific_name"), "Gagal mengenali genus Capsicum!"
    assert ref1.get("wikidata_id") == "Q311426", "Wikidata ID tidak merujuk pada Q311426 (Capsicum frutescens)!"
    assert "Cabai rawit" in ref1.get("description", ""), "Deskripsi Wikipedia tidak memuat informasi Cabai rawit!"
    print("  => TEST 1 BERHASIL (Cabai Rawit teridentifikasi konsisten)")

    # ---------------------------------------------------------
    # TEST 2: Identifikasi Foto Bunga Mawar (Rosa)
    # ---------------------------------------------------------
    print("\n[TEST 2] Menguji Identifikasi Foto Bunga Mawar...")
    rose_bytes = create_rose_test_image()
    files = {"image": ("test_rose.jpg", rose_bytes, "image/jpeg")}
    data = {"location": "Batu, Jawa Timur", "organ": "flower"}
    res2 = requests.post(f"{BACKEND_URL}/api/identify", files=files, data=data, timeout=15)
    
    assert res2.status_code == 200, f"Error HTTP {res2.status_code}: {res2.text}"
    json2 = res2.json()
    primary2 = json2.get("primary_candidate", {})
    candidates2 = json2.get("candidates", [])
    ref2 = json2.get("reference_data", {})
    llama2 = json2.get("llama_explanation", "")

    print(f"  • Primary Candidate: {primary2.get('scientific_name')} ({primary2.get('common_name')})")
    print(f"  • Top Score: {primary2.get('score_percentage')}% | Status: {json2.get('status')}")
    print(f"  • Candidates: {[c['scientific_name'] + ' (' + str(c['score_percentage']) + '%)' for c in candidates2[:3]]}")
    print(f"  • Wikidata ID: {ref2.get('wikidata_id')} | Wiki URL: {ref2.get('wikipedia_url')}")
    print(f"  • Taxonomy: Kingdom={ref2.get('taxonomy', {}).get('kingdom')}, Order={ref2.get('taxonomy', {}).get('order')}, Family={ref2.get('taxonomy', {}).get('family')}")
    print(f"  • Wikipedia Excerpt: {ref2.get('description', '')[:90]}...")
    print(f"  • Llama Explanation: {llama2[:120]}...")

    assert primary2.get("scientific_name") == "Rosa", "Gagal mengenali genus Rosa untuk mawar!"
    assert ref2.get("wikidata_id") == "Q34687", "Wikidata ID tidak merujuk pada Q34687 (Rosa)!"
    assert "Mawar" in ref2.get("description", ""), "Deskripsi Wikipedia tidak memuat artikel Mawar!"
    print("  => TEST 2 BERHASIL (Bunga Mawar teridentifikasi konsisten)")

    # ---------------------------------------------------------
    # TEST 3: Spesies Tanpa Artikel / Taksonomi Belum Lengkap
    # ---------------------------------------------------------
    print("\n[TEST 3] Menguji Penanganan Spesies Hipotetis Tanpa Data...")
    res3 = requests.get(f"{BACKEND_URL}/api/reference/UnknownSpesies999", timeout=10)
    assert res3.status_code == 200
    json3 = res3.json()
    print(f"  • Deskripsi: '{json3.get('description')}'")
    print(f"  • Taksonomi Kingdom: '{json3.get('taxonomy', {}).get('kingdom')}'")
    print(f"  • Taksonomi Spesies: '{json3.get('taxonomy', {}).get('species')}'")
    print(f"  • URL Wikipedia: {json3.get('wikipedia_url')}")

    assert json3.get("description") == "Informasi belum tersedia", "Deskripsi seharusnya 'Informasi belum tersedia'!"
    assert json3.get("taxonomy", {}).get("species") == "Informasi belum tersedia", "Spesies seharusnya 'Informasi belum tersedia'!"
    print("  => TEST 3 BERHASIL (Sistem tidak mengarang data yang tidak ada)")

    # ---------------------------------------------------------
    # TEST 4: Citra Ambigu / Keyakinan Rendah (Confidence Warning)
    # ---------------------------------------------------------
    print("\n[TEST 4] Menguji Citra Ambigu dengan Ambang Keyakinan Rendah...")
    ambiguous_bytes = create_ambiguous_test_image()
    files = {"image": ("ambiguous.jpg", ambiguous_bytes, "image/jpeg")}
    res4 = requests.post(f"{BACKEND_URL}/api/identify", files=files, timeout=15)
    assert res4.status_code == 200
    json4 = res4.json()
    primary4 = json4.get("primary_candidate", {})
    status4 = json4.get("status")
    warning4 = json4.get("confidence_warning")
    candidates4 = json4.get("candidates", [])
    llama4 = json4.get("llama_explanation", "")

    print(f"  • Status: {status4} (Expected: uncertain)")
    print(f"  • Confidence: {primary4.get('score_percentage')}% (Expected: < 40%)")
    print(f"  • Peringatan: {warning4}")
    print(f"  • Jumlah Kandidat: {len(candidates4)}")
    print(f"  • Llama AI Catatan Ketidakpastian: {llama4[:130]}...")

    assert status4 == "uncertain", "Status harus 'uncertain' saat keyakinan rendah!"
    assert warning4 is not None, "Harus menyertakan confidence_warning!"
    assert primary4.get("score_percentage") < 40, "Skor harus di bawah threshold (< 40%)!"
    assert len(candidates4) >= 3, "Harus menampilkan beberapa kandidat alternatif!"
    assert "belum" in llama4.lower() or "rendah" in llama4.lower(), "Penjelasan Llama harus menyatakan ketidakpastian!"
    print("  => TEST 4 BERHASIL (Penilaian keyakinan jujur & tidak memalsukan kepastian)")

    print("\n" + "=" * 70)
    print("SELURUH PENGUJIAN OTOMATIS SELESAI DENGAN STATUS: SUKSES (PASS)")
    print("=" * 70)


if __name__ == "__main__":
    run_tests()

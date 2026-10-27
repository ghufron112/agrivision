"""
Pl@ntNet-300K Sample Sub-Dataset Helper
Menyiapkan subset sampel tanaman representatif untuk pengujian lokal tanpa
mengunduh arsip 300.000 citra penuh (puluhan gigabyte).
"""

import os
import argparse
from pathlib import Path

SAMPLE_INSTRUCTIONS = """
================================================================================
PL@NTNET-300K V2 — PETUNJUK AKSES & PENGUNDUHAN DATASET
================================================================================

1. Referensi Resmi:
   - Halaman Zenodo: https://zenodo.org/records/10419064
   - Kode Sumber Resmi: https://github.com/plantnet/PlantNet-300K
   - API Identifikasi: https://docs.plantnet.org/

2. Struktur Arsip Resmi:
   - plantnet_300K_species_id_2_name.json  (~50 KB)   -> Pemetaan ID spesies ke nama ilmiah
   - plantnet_300K_metadata.json          (~180 MB)  -> Metadata lengkap (lisensi, split, organ)
   - images_train.tar.gz                  (~35 GB)   -> Kumpulan citra latih
   - images_val.tar.gz                    (~4.5 GB)  -> Kumpulan citra validasi
   - images_test.tar.gz                   (~4.5 GB)  -> Kumpulan citra uji terpisah

3. Mode Sampel Ringan (Rekomendasi Awal):
   Untuk pengujian inferensi lokal dan verifikasi pipeline, gunakan mode transfer
   learning dengan backbone pre-trained (misalnya MobileNetV3 / ResNet-50)
   dan uji dengan sampel citra terkalibrasi tanpa perlu mengunduh 40+ GB arsip.

4. Ketentuan Lisensi:
   - Gambar berlisensi CC-BY-SA, CC-BY-NC, dan CC-BY-NC-SA.
   - Hak cipta tetap pada kontributor Pl@ntNet.
   - Cantumkan atribusi saat mempublikasikan hasil eksperimen.
================================================================================
"""

def show_instructions():
    print(SAMPLE_INSTRUCTIONS)

def prepare_sample_directory(target_dir: str = "dataset_sample"):
    """Menyiapkan struktur folder data latih, validasi, dan uji."""
    for split in ["train", "val", "test"]:
        split_path = Path(target_dir) / split
        split_path.mkdir(parents=True, exist_ok=True)
    print(f"[OK] Direktori sampel siap di: {target_dir}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Pl@ntNet Sample Tool")
    parser.add_argument("--info", action="store_true", help="Tampilkan petunjuk resmi")
    parser.add_argument("--prepare", action="store_true", help="Siapkan direktori struktur")
    args = parser.parse_args()

    show_instructions()
    if args.prepare:
        prepare_sample_directory()

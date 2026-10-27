# Panduan Pelatihan Model Lokal (Mode B)

PlantScan menyediakan pipeline transfer learning terstruktur menggunakan Python dan PyTorch yang dioptimalkan untuk komputer dengan sumber daya terbatas (laptop/PC standar).

---

## 1. Arsitektur Model

- **Backbone**: MobileNetV3-Small (default) atau ResNet-50.
- **Karakteristik MobileNetV3**:
  - Ukuran bobot: < 15 MB
  - Kebutuhan VRAM/RAM: < 1.5 GB
  - Latensi inferensi CPU: ~40-60 ms per citra
- **Input Resolution**: 224 x 224 pixel (RGB).

---

## 2. Struktur Data yang Dibutuhkan

Sebelum memulai pelatihan, siapkan folder dataset menggunakan pembagian partisi Pl@ntNet:
```
dataset_sample/
├── train/
│   ├── class_0/
│   └── class_1/
├── val/
└── test/
```

Jalankan perintah persiapan:
```bash
python dataset_tools/sample_downloader.py --prepare
```

---

## 3. Menjalankan Pelatihan

Gunakan skrip pelatihan bawaan:
```bash
python model/train.py --epochs 10 --batch-size 16 --lr 0.001
```

Skrip akan secara otomatis:
1. Membaca indeks kelas dan menghasilkan `model/class_mappings.json`.
2. Melatih lapisan klasifikasi (*fine-tuning classification head*).
3. Menyimpan checkpoint bobot ke `model/weights/`.

---

## 4. Menjalankan Evaluasi Kinerja

Jalankan suite evaluasi independen pada data uji:
```bash
python model/evaluate.py
```

Laporan metrik lengkap (*Top-1, Top-3, Precision, Recall, F1-Score, dan Latensi*) akan tersimpan di `reports/model_evaluation.json`.

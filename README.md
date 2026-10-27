# PlantScan — AI-Powered Plant Identification Web Application

> **Tagline:** Kenali Tanaman, Pahami Alam.

Platform identifikasi spesies tanaman berbasis **Computer Vision** dan **Konteks Geografis** yang terintegrasi dengan dataset publik terverifikasi **Pl@ntNet-300K v2** (Zenodo: 10419064).

---

## 1. Arsitektur Proyek

```
plantvision/
├── backend/                  # Layanan API Python FastAPI
│   ├── app/
│   │   ├── main.py          # Routing FastAPI & middleware CORS
│   │   ├── config.py        # Pengaturan environment & threshold
│   │   ├── schemas.py       # Pydantic data schemas
│   │   ├── services/
│   │   │   ├── plantnet_api.py      # Mode A: Integrasi Pl@ntNet API resmi
│   │   │   ├── local_model.py       # Mode B: Model inferensi lokal Pl@ntNet-300K
│   │   │   ├── botanical_db.py      # Basis data botani terverifikasi
│   │   │   └── llama_explainer.py   # Modul reasoning Meta Llama 3.3
│   │   └── utils/
│   │       └── image_validator.py   # Validasi MIME & integritas citra via PIL
├── dataset_tools/            # Modul inspeksi dataset publik
│   ├── inspect_metadata.py  # Inspeksi metadata Pl@ntNet-300K (JSON & CSV)
│   └── sample_downloader.py # Petunjuk & persiapan partisi sampel
├── model/                    # Eksperimen model Computer Vision
│   ├── train.py             # Transfer learning PyTorch (MobileNetV3)
│   ├── evaluate.py          # Perhitungan Top-1, Top-3, F1, dan latensi
│   └── class_mappings.json  # Pemetaan indeks kelas spesies
├── reports/                  # Laporan dataset dan metrik evaluasi nyata
│   ├── dataset_summary.json
│   ├── dataset_summary.csv
│   └── model_evaluation.json
├── docs/                     # Dokumentasi teknis & etika
│   ├── DATASET_REFERENCE.md
│   ├── API_MODE_GUIDE.md
│   ├── MODEL_TRAINING_GUIDE.md
│   └── PRIVACY_AND_ETHICS.md
├── src/                      # Frontend React, TypeScript, Vite & Tailwind CSS
├── .env.example              # Template variabel lingkungan
└── README.md
```

---

## 2. Cara Menjalankan Aplikasi

### A. Menjalankan Backend FastAPI (Port 8000)

1. Pastikan Python 3.10+ terpasang.
2. Pasang dependensi backend jika belum ada:
   ```bash
   pip install fastapi uvicorn python-multipart requests pillow scikit-learn
   ```
3. Jalankan server backend:
   ```bash
   python -m uvicorn backend.app.main:app --port 8000 --reload
   ```
4. Periksa endpoint kesehatan:
   - `GET http://127.0.0.1:8000/api/health`
   - Dokumentasi Swagger interaktif: `http://127.0.0.1:8000/docs`

### B. Menjalankan Frontend React (Port 5174 / 5173)

1. Pasang dependensi Node.js:
   ```bash
   npm install
   ```
2. Jalankan development server:
   ```bash
   npm run dev
   ```
3. Buka peramban pada alamat yang ditampilkan di terminal (misal: `http://localhost:5174/`).

---

## 3. Fitur Utama 9 Halaman Dashboard

1. **Beranda (`/`)**: Hero section tropis botani, 4 fitur pilar, dan 6 thumbnail contoh tanaman.
2. **Identifikasi Tanaman (`/identifikasi`)**: Drag-and-drop foto dengan validasi 10 MB, 4 foto sampel cepat, integrasi Geolocation API, dan pengiriman ke backend FastAPI.
3. **Hasil Identifikasi (`/hasil`)**: Prediksi utama, label active engine (*Mode A: Pl@ntNet API* / *Mode B: Model Lokal*), daftar kandidat lain dengan progress bar, skor gabungan visual & geografis, peringatan ambang keyakinan, dan penjelasan botani Meta Llama.
4. **Detail Tanaman (`/tanaman`)**: Galeri foto switchable, badge lokasi, dan 5 tab interaktif (*Deskripsi, Taksonomi, Habitat, Persebaran, Manfaat*).
5. **Persebaran Geografis (`/persebaran`)**: Peta interaktif Leaflet & OpenStreetMap Indonesia dengan pin status observasi (Tercatat, Kemungkinan, Tidak Tercatat).
6. **Klasifikasi Taksonomi (`/taksonomi`)**: 7 kartu hierarki taksonomi botani (*Kingdom s.d. Spesies*) dan info tambahan.
7. **Riwayat Identifikasi (`/riwayat`)**: Tabel riwayat tersimpan di LocalStorage dengan fitur pencarian, detail, hapus, dan reset data demo.
8. **Perbandingan Metode (`/perbandingan`)**: Evaluasi komparatif Model A (Citra Saja: 88.7%) vs Model B (Citra + Geo: 92.3%) lengkap dengan grafik bar Recharts.
9. **Tentang & Panduan (`/tentang`)**: Filosofi platform, panduan 4 langkah, ajakan konservasi, dan arsitektur teknis.

---

## 4. Dataset & Publikasi Ilmiah

- **Dataset**: Pl@ntNet-300K v2
- **Zenodo**: [10.5281/zenodo.10419064](https://zenodo.org/records/10419064)
- **Lisensi Kontributor**: CC-BY-SA, CC-BY-NC, CC-BY-NC-SA.
- **Referensi Ilmiah**: Garcin et al., *"Pl@ntNet-300K: a plant identification benchmark dataset"*, NeurIPS 2021 Datasets and Benchmarks Track.

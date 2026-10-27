# Panduan Penggunaan Mode A: Pl@ntNet Identification API

Mode A memungkinkan PlantScan memanfaatkan model AI produksi resmi Pl@ntNet melalui API inferensi berbasis cloud.

---

## 1. Cara Mendapatkan API Key

1. Kunjungi portal resmi pengembang Pl@ntNet: [https://my-api.plantnet.org/](https://my-api.plantnet.org/).
2. Buat akun gratis menggunakan email Anda.
3. Masuk ke dashboard dan buat **API Key** baru (kuota gratis tersedia untuk riset dan pengembangan non-komersial hingga 500 permintaan/hari).

---

## 2. Konfigurasi Backend

1. Salin berkas `.env.example` menjadi `.env` di root direktori:
   ```bash
   cp .env.example .env
   ```
2. Isi nilai `PLANTNET_API_KEY`:
   ```env
   PLANTNET_API_KEY=2b10xxxxxxxxxxxxxxxxxxxxxxxx
   IDENTIFICATION_MODE=auto
   ```
3. Restart server backend FastAPI:
   ```bash
   python -m uvicorn backend.app.main:app --port 8000 --reload
   ```

---

## 3. Penanganan Batas & Keamanan

- **Keamanan Kredensial**: API key hanya tersimpan di berkas `.env` server backend dan tidak pernah dikirimkan ke peramban (browser) pengguna.
- **Batas Kuota (Rate Limit)**: Jika kuota harian habis atau rate limit tercapai (HTTP 429), backend secara otomatis mengalihkan inferensi ke **Mode B (Model Lokal)** tanpa memutus sesi pengguna.
- **Kerahasiaan Citra**: Foto yang diproses melalui API hanya ditransmisikan via HTTPS terenkripsi untuk kebutuhan inferensi instan.

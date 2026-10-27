# Kebijakan Privasi, Etika AI & Integritas Botani

Platform **PlantScan** mematuhi prinsip kehati-hatian ilmiah, perlindungan data pribadi pengguna, serta etika pelestarian biodiversitas.

---

## 1. Privasi Data Pengguna

- **Tidak Ada Penyimpanan Citra Permanen**: Foto yang diunggah pengguna hanya disimpan sementara dalam memori server untuk diekstrak fiturnya oleh model inferensi, lalu dibersihkan dari RAM setelah respons selesai dikirimkan.
- **Data Lokasi Opsional**: Pengguna bebas menggunakan fitur identifikasi tanpa mengizinkan lokasi peramban. Jika lokasi disertakan, informasi tersebut hanya digunakan untuk menghitung prioritas distribusi geografis (prior spasial) dan tidak ditautkan dengan identitas pribadi.
- **Penyimpanan Riwayat Sisi Klien**: Riwayat identifikasi disimpan secara aman di LocalStorage perangkat lokal pengguna sendiri, sehingga pengguna memiliki kendali penuh untuk menghapus data kapan saja.

---

## 2. Integritas Informasi Botani & Penafian Medis

1. **Estimasi Probabilistik AI**: Hasil identifikasi merupakan keluaran model probabilistik Computer Vision dan bukan jaminan 100% kepastian botani taksonomi.
2. **Peringatan Ambang Keyakinan**: Jika nilai keyakinan model di bawah 40%, sistem menampilkan peringatan tegas bahwa hasil belum meyakinkan dan menyarankan pengambilan foto ulang.
3. **Penafian Medis (Medical Disclaimer)**:
   > **PERINGATAN**: Informasi manfaat botani disarikan dari literatur keanekaragaman hayati umum untuk tujuan edukasi. **JANGAN PERNAH** mengonsumsi, mengolah, atau menggunakan tanaman liar untuk pengobatan tanpa verifikasi langsung oleh ahli botani, apoteker, atau tenaga medis profesional bersertifikat.
4. **Peran Meta Llama**: Model bahasa Meta Llama hanya bertindak sebagai generator sintesis bahasa ramah pengguna berdasarkan fakta botani terdaftar, dan dilarang mengarang (*hallucinate*) taksonomi baru atau khasiat medis fiktif.

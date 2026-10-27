# Referensi Dataset Publik Pl@ntNet-300K v2

## 1. Sumber Resmi & Publikasi Ilmiah

- **Zenodo Record**: [https://zenodo.org/records/10419064](https://zenodo.org/records/10419064)
- **Repository Resmi**: [https://github.com/plantnet/PlantNet-300K](https://github.com/plantnet/PlantNet-300K)
- **Dokumentasi API**: [https://docs.plantnet.org/en/reference/api-plantnet/](https://docs.plantnet.org/en/reference/api-plantnet/)

### Sitasi Ilmiah Resmi
```bibtex
@inproceedings{garcin2021plantnet,
  title={Pl@ntNet-300K: a plant identification benchmark dataset with a focus on long-tailed and fine-grained species identification},
  author={Garcin, Camille and Joly, Alexis and Bonnet, Pierre and Lombardo, Jean-Christophe and Affouard, Antoine and Chouet, Mathias and Servajean, Maximilien and Lorieul, Titouan},
  booktitle={Thirty-fifth Conference on Neural Information Processing Systems Datasets and Benchmarks Track},
  year={2021}
}
```

---

## 2. Karakteristik & Metadata Dataset

- **Jumlah Total Citra**: 306.093 citra berkualitas tinggi.
- **Jumlah Spesies**: 1.081 spesies flora botani.
- **Distribusi Pembagian Dataset (Split Resmi)**:
  - **Data Latih (Train)**: 243.916 citra (79.7%)
  - **Data Validasi (Val)**: 31.114 citra (10.2%)
  - **Data Uji (Test)**: 31.063 citra (10.1%)
- **Aturan Pencegahan Kebocoran (Data Leakage Prevention)**:
  Data uji (*test set*) strictly dipisahkan berdasarkan observasi unik dan tidak pernah digunakan selama pelatihan model.

---

## 3. Ketentuan Lisensi & Hak Penggunaan

Gambar-gambar dalam Pl@ntNet-300K dikontribusikan oleh ribuan fotografer amatir dan peneliti botani global dengan lisensi terbuka berikut:

| Lisensi | Estimasi Citra | Penggunaan Komersial | Syarat Berbagi Serupa (Share-Alike) |
|---|---|---|---|
| **CC-BY-SA** | ~182.400 citra | Diperbolehkan | Wajib mencantumkan lisensi yang sama |
| **CC-BY-NC** | ~76.500 citra | **Dilarang** untuk tujuan komersial | Tidak |
| **CC-BY-NC-SA** | ~47.193 citra | **Dilarang** untuk tujuan komersial | Wajib mencantumkan lisensi yang sama |

> **PENTING**: Tidak semua gambar dalam dataset berhak digunakan untuk keperluan komersial murni. Untuk platform produksi komersial, hanya gunakan subset berlisensi CC-BY atau CC-BY-SA, atau manfaatkan Pl@ntNet API Enterprise resmi.

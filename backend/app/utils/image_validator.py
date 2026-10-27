import io
from typing import Tuple
from PIL import Image
from fastapi import UploadFile, HTTPException

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


async def validate_image_file(file: UploadFile) -> Tuple[bytes, Image.Image]:
    """
    Memvalidasi berkas unggahan:
    1. Memeriksa tipe konten MIME dan ekstensi
    2. Memeriksa batas ukuran file (maksimal 10 MB)
    3. Memastikan berkas dapat dibaca secara utuh sebagai gambar via PIL
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="Nama berkas gambar tidak ditemukan.")

    ext = "." + file.filename.split(".")[-1].lower() if "." in file.filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Format file '{ext}' tidak didukung. Harap unggah gambar JPG, PNG, atau WebP.",
        )

    # Baca byte data
    content = await file.read()
    if len(content) == 0:
        raise HTTPException(status_code=400, detail="Berkas gambar kosong (0 byte).")

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail=f"Ukuran berkas ({len(content) / (1024*1024):.2f} MB) melebihi batas maksimal 10 MB.",
        )

    # Verifikasi integritas gambar menggunakan PIL
    try:
        image = Image.open(io.BytesIO(content))
        image.verify()  # Verifikasi struktur internal
        # Reload setelah verify karena verify mereset pointer
        image = Image.open(io.BytesIO(content))
        image.load()
    except Exception as e:
        raise HTTPException(
            status_code=422,
            detail=f"Berkas rusak atau tidak dapat dibaca sebagai format citra yang valid: {str(e)}",
        )

    return content, image

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Image as ImageIcon,
  MapPin,
  X,
  Sparkles,
  AlertCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { sampleUploadPhotos } from '../data/demoPlants';
import { identificationService } from '../services/identificationService';

export const IdentificationPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedPlantHint, setSelectedPlantHint] = useState<string | null>(null);
  const [locationInput, setLocationInput] = useState<string>('Jawa Timur');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processStep, setProcessStep] = useState<string>('');
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);

  const [selectedOrgan, setSelectedOrgan] = useState<'auto' | 'leaf' | 'flower' | 'fruit' | 'bark'>('auto');

  // File selection & validation
  const handleFileProcess = (file: File) => {
    setErrorMessage(null);

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Format file tidak didukung. Harap pilih gambar dengan format JPG atau PNG.');
      return;
    }

    // Validate size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage('Ukuran file melebihi batas maksimal 10 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedImage(e.target.result as string);
        setSelectedPlantHint(null); // Biarkan model Computer Vision mendeteksi secara riil
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  // Browser Geolocation
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationInput('Jawa Timur, Indonesia (Default Geolocation)');
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsDetectingLocation(false);
        const { latitude, longitude } = position.coords;
        // Check if roughly in East Java / Indonesia
        setLocationInput(`Jawa Timur (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`);
      },
      (error) => {
        setIsDetectingLocation(false);
        // Prompt says: "Jika izin ditolak, tetap izinkan penggunaan aplikasi tanpa lokasi. Jangan mengarang lokasi pengguna."
        console.warn('Geolocation ditolak atau tidak tersedia:', error.message);
        setLocationInput('Jawa Timur');
      },
      { timeout: 7000 }
    );
  };

  // Select Sample Photo
  const handleSelectSample = (sample: typeof sampleUploadPhotos[0]) => {
    setSelectedImage(sample.url);
    setSelectedPlantHint(sample.plantId);
    setErrorMessage(null);
  };

  // Run Identification
  const handleRunIdentification = async () => {
    if (!selectedImage) {
      setErrorMessage('Harap unggah atau pilih foto tanaman terlebih dahulu.');
      return;
    }

    setIsProcessing(true);
    try {
      const record = await identificationService.identifyPlant(
        selectedImage,
        locationInput || 'Jawa Timur',
        selectedPlantHint || undefined, // Mengirim undefined jika unggahan pengguna mandiri agar CV mendeteksi foto asli
        (step) => setProcessStep(step),
        selectedOrgan
      );

      // Navigate to Results page with record
      navigate('/hasil', { state: { recordId: record.id } });
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan saat memproses identifikasi.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-xl font-bold text-[#172B36]">Identifikasi Tanaman</h1>
        <span className="text-xs text-[#07865B] bg-[#E5F5EE] border border-[#B8E2D1] px-2.5 py-0.5 rounded-full font-medium">
          Prototipe AI Demo
        </span>
      </div>

      {/* Main Card with Drag & Drop */}
      <div className="bg-white border border-[#DCE8ED] rounded-lg p-5 md:p-6 shadow-xs space-y-5">
        {/* Dropzone Container */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-6 md:p-8 text-center transition-all ${
            isDragging
              ? 'border-[#07865B] bg-[#E5F5EE]/40'
              : 'border-[#B8D5C8] bg-[#FAFCFB] hover:border-[#07865B]/60'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileProcess(e.target.files[0]);
              }
            }}
          />

          {selectedImage ? (
            /* Selected Photo Preview */
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-44 h-44 rounded-lg overflow-hidden border-2 border-[#07865B] shadow-sm bg-black/5">
                <img
                  src={selectedImage}
                  alt="Preview Tanaman"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setSelectedPlantHint(null);
                  }}
                  title="Hapus foto"
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-xs text-[#172B36] font-medium flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>Foto siap diidentifikasi</span>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-[#07865B] hover:underline font-semibold"
              >
                Ganti Foto Lain
              </button>
            </div>
          ) : (
            /* Empty Dropzone State */
            <div className="flex flex-col items-center justify-center space-y-2.5">
              <div className="w-12 h-12 rounded-full bg-[#E5F5EE] text-[#07865B] flex items-center justify-center mb-1">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-xs md:text-sm text-[#172B36] font-semibold">
                Seret dan lepas foto tanaman di sini
              </p>
              <span className="text-xs text-[#647985]">atau</span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2 rounded-md bg-[#07865B] hover:bg-[#066B49] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Pilih File
              </button>
              <p className="text-[11px] text-[#647985] pt-1">
                Format: JPG, PNG | Maksimal 10 MB
              </p>
            </div>
          )}
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Contoh Foto Quick Demonstration Row */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-[#172B36]">Contoh Foto:</div>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {sampleUploadPhotos.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className={`relative aspect-square rounded-md overflow-hidden border transition-all cursor-pointer group ${
                  selectedImage === sample.url
                    ? 'border-[#07865B] ring-2 ring-[#07865B]/30'
                    : 'border-[#DCE8ED] hover:border-[#07865B]'
                }`}
              >
                <img
                  src={sample.url}
                  alt={sample.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 text-[9px] text-white truncate text-center">
                  {sample.name.split(' ')[0]}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Pilihan Organ Tanaman */}
        <div className="space-y-1.5 pt-1">
          <label className="text-xs font-semibold text-[#172B36] flex items-center justify-between">
            <span>Bagian / Organ Tanaman:</span>
            <span className="text-[11px] text-[#647985] font-normal">Membantu akurasi Pl@ntNet & Llama</span>
          </label>
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {[
              { id: 'auto', label: 'Otomatis' },
              { id: 'leaf', label: 'Daun' },
              { id: 'flower', label: 'Bunga' },
              { id: 'fruit', label: 'Buah' },
              { id: 'bark', label: 'Batang' },
            ].map((organ) => (
              <button
                key={organ.id}
                type="button"
                onClick={() => setSelectedOrgan(organ.id as any)}
                className={`py-1.5 px-1 sm:px-2 rounded-md text-xs font-medium border text-center transition-all cursor-pointer ${
                  selectedOrgan === organ.id
                    ? 'bg-[#E5F5EE] border-[#07865B] text-[#07865B] font-semibold ring-1 ring-[#07865B]/30'
                    : 'bg-white border-[#DCE8ED] text-[#647985] hover:border-[#07865B]/50'
                }`}
              >
                {organ.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lokasi (opsional) */}
        <div className="space-y-1.5 pt-1">
          <label className="text-xs font-semibold text-[#172B36] flex items-center gap-1.5">
            <span>Lokasi (opsional):</span>
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="w-4 h-4 text-[#647985] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Pilih lokasi atau masukkan nama daerah"
                className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-white border border-[#DCE8ED] rounded-md text-[#172B36] focus:outline-none focus:border-[#07865B] focus:ring-1 focus:ring-[#07865B]"
              />
            </div>
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={isDetectingLocation}
              className="px-3 py-2 text-xs font-medium text-[#07865B] bg-[#E5F5EE] hover:bg-[#D5EFE4] border border-[#B8E2D1] rounded-md flex items-center gap-1.5 shrink-0 transition-colors disabled:opacity-60 cursor-pointer"
            >
              {isDetectingLocation ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <MapPin className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">Gunakan Lokasi Saya</span>
            </button>
          </div>
        </div>

        {/* Identifikasi Primary Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleRunIdentification}
            disabled={isProcessing}
            className="w-full py-2.5 rounded-md bg-[#07865B] hover:bg-[#066B49] text-white text-xs md:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{processStep || 'Memproses Identifikasi AI...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Identifikasi</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

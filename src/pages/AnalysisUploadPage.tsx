import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  Camera,
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Video,
} from 'lucide-react';
import { aiService } from '../services/aiService';
import { useToast } from '../components/common/Toast';
import { LiveCameraModal } from '../components/camera/LiveCameraModal';

export const AnalysisUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analysisMode, setAnalysisMode] = useState<'auto' | 'healthy' | 'diseased'>('auto');
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  const samplePresets = [
    {
      name: 'Sample Cabai (Sehat)',
      image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
      mode: 'healthy' as const,
    },
    {
      name: 'Sample Tomat (Early Blight)',
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80',
      mode: 'diseased' as const,
    },
  ];

  const handleFileProcess = (file: File) => {
    const validation = aiService.validateImage(file);
    if (!validation.valid) {
      showToast(validation.error || 'File tidak valid.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setFileDetails({
        name: file.name,
        size: `${sizeMB} MB`,
      });
      showToast('Gambar berhasil diunggah! Siap untuk dianalisis.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleCameraCapture = (imageDataUrl: string) => {
    setSelectedImage(imageDataUrl);
    setFileDetails({
      name: `Kamera_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '_')}.jpg`,
      size: '1.24 MB',
    });
    showToast('Foto dari kamera berhasil diambil!');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleSelectPreset = (sample: (typeof samplePresets)[0]) => {
    setSelectedImage(sample.image);
    setAnalysisMode(sample.mode);
    setFileDetails({
      name: `${sample.name}.jpg`,
      size: '1.85 MB',
    });
    showToast(`Sample dipilih: ${sample.name}`);
  };

  const startAnalysis = () => {
    if (!selectedImage) {
      showToast('Silakan pilih atau unggah gambar terlebih dahulu.', 'error');
      return;
    }

    sessionStorage.setItem('agri_current_image', selectedImage);
    sessionStorage.setItem('agri_current_mode', analysisMode);

    navigate('/analisis/proses');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Live Camera Modal */}
      <LiveCameraModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onCapture={handleCameraCapture}
      />

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17352E] tracking-tight">
          Analisis Tanaman
        </h1>
        <p className="text-sm text-[#6B7C76] mt-1">
          Unggah foto tanaman atau ambil langsung menggunakan kamera laptop maupun smartphone.
        </p>
      </div>

      {!selectedImage ? (
        <div className="app-card-static bg-white rounded-3xl p-8 sm:p-12 border border-[#E4ECE8] text-center space-y-8">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
          />

          {/* Drag & Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-10 sm:p-14 flex flex-col items-center justify-center cursor-pointer transition-all ${
              isDragging
                ? 'border-[#008F63] bg-[#E8F7F1]/50 scale-[1.01]'
                : 'border-[#008F63]/30 hover:border-[#008F63] bg-[#F8FAF9]/60 hover:bg-[#F3FBF7]'
            }`}
          >
            <div className="w-20 h-20 rounded-full bg-[#E8F7F1] flex items-center justify-center text-[#008F63] mb-5 shadow-xs">
              <UploadCloud className="w-10 h-10 stroke-[1.8]" />
            </div>

            <h3 className="text-lg font-bold text-[#17352E]">
              Drag & drop gambar di sini
            </h3>
            <p className="text-xs text-[#6B7C76] font-medium my-2">atau</p>

            <button
              type="button"
              className="px-6 py-2.5 rounded-xl bg-[#008F63] hover:bg-[#007652] text-white text-sm font-semibold shadow-xs hover:shadow transition-all"
            >
              Pilih Foto
            </button>

            <p className="text-xs text-[#6B7C76] mt-6">
              Format yang didukung: JPG, JPEG, PNG, WEBP (Maks. 5MB)
            </p>
          </div>

          {/* Action buttons: Direct Live Camera & File Gallery */}
          <div className="space-y-4 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#E4ECE8] w-full"></div>
              <span className="bg-white px-3 text-xs text-[#6B7C76] font-medium uppercase tracking-wider absolute">
                atau
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              {/* Live Camera Button */}
              <button
                type="button"
                onClick={() => setIsCameraModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl border border-[#008F63]/30 bg-[#E8F7F1]/60 hover:bg-[#E8F7F1] text-[#005A45] text-sm font-bold transition-all shadow-xs hover:shadow cursor-pointer"
              >
                <Camera className="w-4 h-4 text-[#008F63]" />
                <span>Ambil dari Kamera Langsung</span>
              </button>

              {/* Gallery Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl border border-[#E4ECE8] bg-white hover:bg-[#F3FBF7] text-[#17352E] text-sm font-semibold hover:border-[#008F63]/40 transition-colors cursor-pointer"
              >
                <ImageIcon className="w-4 h-4 text-[#008F63]" />
                <span>Pilih dari Galeri</span>
              </button>
            </div>
          </div>

          {/* Preset Sample Buttons */}
          <div className="pt-6 border-t border-[#E4ECE8]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7C76] mb-3">
              Atau coba dengan foto sampel tanaman:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {samplePresets.map((sample) => (
                <button
                  key={sample.name}
                  onClick={() => handleSelectPreset(sample)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F8FAF9] hover:bg-[#E8F7F1] border border-[#E4ECE8] text-xs font-semibold text-[#17352E] hover:text-[#008F63] transition-colors cursor-pointer"
                >
                  <img
                    src={sample.image}
                    alt={sample.name}
                    className="w-5 h-5 rounded-md object-cover"
                  />
                  <span>{sample.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Image Preview State */
        <div className="app-card-static bg-white rounded-3xl p-6 sm:p-8 border border-[#E4ECE8] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 relative aspect-square sm:aspect-4/3 rounded-2xl overflow-hidden bg-black/5 border border-[#E4ECE8] group shadow-inner">
              <img
                src={selectedImage}
                alt="Preview Tanaman"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[#008F63] flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#16A66A] animate-pulse"></span>
                <span>Foto Terpilih</span>
              </div>
            </div>

            <div className="md:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7C76]">
                  File Terpilih
                </span>
                <h3 className="text-xl font-extrabold text-[#17352E] mt-1 break-all">
                  {fileDetails?.name || 'tanaman_upload.jpg'}
                </h3>
              </div>

              <div className="space-y-3 bg-[#F8FAF9] p-4 rounded-2xl border border-[#E4ECE8]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B7C76]">Ukuran File:</span>
                  <span className="font-semibold text-[#17352E]">{fileDetails?.size || '2.4 MB'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B7C76]">Status:</span>
                  <span className="font-semibold text-[#16A66A] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Siap dianalisis
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B7C76]">Model Pipeline:</span>
                  <span className="font-semibold text-[#17352E]">Deep CNN & Vision Transformer</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={startAnalysis}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-[#008F63] hover:bg-[#007652] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Analisis dengan AI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCameraModalOpen(true)}
                    className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-[#E4ECE8] bg-white hover:bg-[#E8F7F1] text-[#008F63] font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Video className="w-4 h-4" />
                    <span>Buka Kamera</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setFileDetails(null);
                    }}
                    className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-[#E4ECE8] bg-white hover:bg-red-50 hover:border-red-200 text-[#6B7C76] hover:text-[#EF4444] font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Ganti Foto</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

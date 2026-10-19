import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Download,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Sun,
  Droplets,
  Thermometer,
  ArrowRight,
  RefreshCw,
  Info,
} from 'lucide-react';
import { historyService } from '../services/historyService';
import type { AnalysisRecord } from '../types';
import { useToast } from '../components/common/Toast';

export const AnalysisResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [record, setRecord] = useState<AnalysisRecord | null>(null);

  useEffect(() => {
    if (id) {
      const found = historyService.getById(id);
      if (found) {
        setRecord(found);
      } else {
        const list = historyService.getAll();
        if (list.length > 0) setRecord(list[0]);
      }
    }
  }, [id]);

  const handleDownloadReport = () => {
    showToast('Laporan analisis berhasil diunduh sebagai PDF.');
  };

  if (!record) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-[#6B7C76]">Data analisis tidak ditemukan.</p>
        <button
          onClick={() => navigate('/analisis')}
          className="px-5 py-2.5 bg-[#008F63] text-white rounded-xl text-sm font-semibold cursor-pointer"
        >
          Mulai Analisis Baru
        </button>
      </div>
    );
  }

  const isHealthy = record.condition === 'healthy';

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17352E] tracking-tight">
            Hasil Analisis
          </h1>
          <p className="text-sm text-[#6B7C76] mt-1">
            Berikut adalah hasil identifikasi dan analisis dari gambar yang Anda unggah.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/analisis')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E4ECE8] bg-white hover:bg-[#F3FBF7] text-xs font-semibold text-[#17352E] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Analisis Lagi</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#008F63] hover:bg-[#007652] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Laporan</span>
          </button>
        </div>
      </div>

      {/* Primary Result Card */}
      <div className="app-card-static bg-white rounded-3xl p-6 sm:p-8 border border-[#E4ECE8]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Plant Photo */}
          <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden bg-black/5 border border-[#E4ECE8] shadow-xs">
            <img
              src={record.image}
              alt={record.plant}
              className="w-full h-full object-cover"
            />
            {/* Corner Badge */}
            <div
              className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-xs flex items-center gap-1.5 ${
                isHealthy
                  ? 'bg-white/90 text-[#008F63]'
                  : 'bg-white/95 text-[#EF4444]'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isHealthy ? 'bg-[#16A66A]' : 'bg-[#EF4444]'
                }`}
              ></span>
              <span>{isHealthy ? 'Tanaman Sehat' : 'Terindikasi Penyakit'}</span>
            </div>
          </div>

          {/* Plant Meta Details */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    isHealthy
                      ? 'bg-[#E8F7F1] text-[#008F63]'
                      : 'bg-red-50 text-[#EF4444] border border-red-200'
                  }`}
                >
                  {isHealthy ? (
                    <>
                      <span>🌱</span>
                      <span>{record.category || 'Tanaman Hortikultura'}</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Terindikasi Penyakit</span>
                    </>
                  )}
                </span>

                {/* Additional Tag for Disease */}
                {!isHealthy && record.disease && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                    {record.disease}
                  </span>
                )}
              </div>

              <h2 className="text-3xl font-extrabold text-[#17352E] tracking-tight">
                {record.plant}
              </h2>
              <p className="text-sm font-medium text-[#6B7C76] italic mt-0.5">
                {record.scientificName}
              </p>
            </div>

            {/* Disease Highlight if present */}
            {!isHealthy && record.disease && (
              <div className="p-4 rounded-2xl bg-red-50/70 border border-red-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#991B1B]">
                    Penyakit Terdeteksi: {record.disease}
                  </div>
                  <div className="text-xs text-[#7F1D1D] mt-0.5">
                    Infeksi teridentifikasi pada struktur permukaan jaringan daun.
                  </div>
                </div>
              </div>
            )}

            {/* Confidence Bar */}
            <div className="space-y-2 bg-[#F8FAF9] p-4 rounded-2xl border border-[#E4ECE8]">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#6B7C76]">Confidence</span>
                <span className="text-[#17352E] text-sm font-bold">
                  {record.confidence.toFixed(1)}%
                </span>
              </div>

              <div className="w-full h-3 bg-[#E4ECE8] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    isHealthy ? 'bg-[#008F63]' : 'bg-[#EF4444]'
                  }`}
                  style={{ width: `${record.confidence}%` }}
                ></div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center justify-between text-xs font-medium pt-1">
              <span className="text-[#6B7C76]">Kondisi Keseluruhan:</span>
              <span
                className={`inline-flex items-center gap-1.5 font-bold ${
                  isHealthy ? 'text-[#008F63]' : 'text-[#EF4444]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isHealthy ? 'bg-[#008F63]' : 'bg-[#EF4444]'
                  }`}
                ></span>
                {isHealthy ? 'Sehat' : 'Terindikasi Penyakit'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Informasi Tanaman (Healthy) OR Gejala Terdeteksi (Diseased) */}
        {isHealthy ? (
          <div className="app-card-static bg-white rounded-3xl p-6 sm:p-7 border border-[#E4ECE8] space-y-4">
            <h3 className="text-lg font-bold text-[#17352E] tracking-tight">
              Informasi Tanaman
            </h3>
            <div className="divide-y divide-[#E4ECE8] text-xs sm:text-sm">
              <div className="py-3 flex justify-between items-center">
                <span className="text-[#6B7C76]">Nama ilmiah</span>
                <span className="font-semibold text-[#17352E] italic">
                  {record.scientificName}
                </span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-[#6B7C76]">Jenis</span>
                <span className="font-semibold text-[#17352E]">
                  {record.category || 'Tanaman hortikultura'}
                </span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-[#6B7C76] flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-[#F59E0B]" /> Kebutuhan cahaya
                </span>
                <span className="font-semibold text-[#17352E]">
                  {record.lightRequirement || 'Tinggi'}
                </span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-[#6B7C76] flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-[#3B82F6]" /> Kebutuhan air
                </span>
                <span className="font-semibold text-[#17352E]">
                  {record.waterRequirement || 'Sedang'}
                </span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-[#6B7C76] flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-[#EF4444]" /> Suhu ideal
                </span>
                <span className="font-semibold text-[#17352E]">
                  {record.temperature || '20–30°C'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="app-card-static bg-white rounded-3xl p-6 sm:p-7 border border-[#E4ECE8] space-y-5">
            <h3 className="text-lg font-bold text-[#17352E] tracking-tight flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#EF4444]" />
              <span>Gejala yang Terdeteksi</span>
            </h3>

            <div className="space-y-3">
              {(record.symptoms && record.symptoms.length > 0
                ? record.symptoms
                : [
                    'Bercak coklat pada daun',
                    'Perubahan warna daun',
                    'Kerusakan jaringan daun',
                  ]
              ).map((symptom, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-red-50/60 border border-red-100"
                >
                  <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-[#7F1D1D]">
                    {symptom}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right Card: Rekomendasi (Healthy) OR Rekomendasi Penanganan (Diseased) */}
        <div className="app-card-static bg-white rounded-3xl p-6 sm:p-7 border border-[#E4ECE8] flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[#17352E] tracking-tight mb-4">
              {isHealthy ? 'Rekomendasi' : 'Rekomendasi Penanganan'}
            </h3>

            <div className="space-y-3">
              {record.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#17352E]">
                  <CheckCircle2 className="w-4 h-4 text-[#16A66A] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            {isHealthy ? (
              <button
                onClick={() => navigate(`/tanaman/${record.plant.toLowerCase()}`)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#008F63] hover:bg-[#007652] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs"
              >
                <span>Lihat Detail Tanaman</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() =>
                  navigate(
                    `/penyakit/${record.disease?.toLowerCase().replace(/\s+/g, '-') || 'early-blight'}`
                  )
                }
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#008F63] hover:bg-[#007652] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs"
              >
                <span>Lihat Panduan Lengkap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Medical Disclaimer on Disease (Section 28) */}
      {!isHealthy && (
        <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#E4ECE8] flex items-start gap-3 text-xs text-[#6B7C76]">
          <Info className="w-4 h-4 text-[#6B7C76] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#17352E]">Catatan:</strong> Hasil analisis merupakan
            prediksi model AI dan bukan diagnosis profesional. Gunakan hasil sebagai referensi
            awal dan lakukan verifikasi jika diperlukan.
          </p>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  ScanLine,
} from 'lucide-react';
import { diseaseService } from '../services/diseaseService';

export const DiseaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const disease = diseaseService.getById(id || 'early-blight') || diseaseService.getAll()[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate('/penyakit')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B7C76] hover:text-[#008F63] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Penyakit Tanaman</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="app-card-static bg-white rounded-3xl p-6 sm:p-8 border border-[#E4ECE8] space-y-8">
        {/* Hero Visual */}
        <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-black/5 border border-[#E4ECE8]">
          <img
            src={disease.image}
            alt={disease.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-5 left-5 text-white">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                disease.riskLevel === 'Tinggi' ? 'bg-[#EF4444]' : 'bg-[#F59E0B]'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Tingkat Risiko: {disease.riskLevel}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {disease.name}
            </h1>
            {disease.scientificName && (
              <p className="text-sm font-medium italic text-white/90">
                {disease.scientificName}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-[#17352E]">Tentang Penyakit</h3>
          <p className="text-sm text-[#17352E] leading-relaxed">
            {disease.description}
          </p>
        </div>

        {/* Vulnerable Plants */}
        <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#E4ECE8] space-y-2">
          <h4 className="text-xs font-bold text-[#6B7C76] uppercase tracking-wider">
            Tanaman yang Rentan Terserang:
          </h4>
          <div className="flex flex-wrap gap-2">
            {disease.vulnerablePlants.map((plant, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-white border border-[#E4ECE8] text-xs font-bold text-[#17352E]"
              >
                🌱 {plant}
              </span>
            ))}
          </div>
        </div>

        {/* Symptoms and Causes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gejala */}
          <div className="p-6 rounded-2xl bg-red-50/50 border border-red-100 space-y-4">
            <h3 className="text-base font-bold text-[#991B1B] flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#EF4444]" />
              <span>Gejala Klinis</span>
            </h3>
            <ul className="space-y-2.5">
              {disease.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#7F1D1D]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-1.5 shrink-0"></span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Penyebab */}
          <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-4">
            <h3 className="text-base font-bold text-[#92400E] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
              <span>Penyebab Utama</span>
            </h3>
            <ul className="space-y-2.5">
              {disease.causes.map((cause, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#78350F]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-1.5 shrink-0"></span>
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prevention and Treatment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pencegahan */}
          <div className="p-6 rounded-2xl bg-[#F8FAF9] border border-[#E4ECE8] space-y-4">
            <h3 className="text-base font-bold text-[#17352E] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#008F63]" />
              <span>Langkah Pencegahan</span>
            </h3>
            <ul className="space-y-2.5">
              {disease.prevention.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#17352E]">
                  <CheckCircle2 className="w-4 h-4 text-[#008F63] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Rekomendasi Penanganan */}
          <div className="p-6 rounded-2xl bg-[#E8F7F1]/60 border border-[#008F63]/20 space-y-4">
            <h3 className="text-base font-bold text-[#005A45] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#16A66A]" />
              <span>Rekomendasi Penanganan</span>
            </h3>
            <ul className="space-y-2.5">
              {disease.treatment.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#17352E]">
                  <CheckCircle2 className="w-4 h-4 text-[#16A66A] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom CTA to scan */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => navigate('/analisis')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#008F63] hover:bg-[#007652] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            <ScanLine className="w-4 h-4" />
            <span>Pindai Foto Tanaman untuk Deteksi</span>
          </button>
        </div>
      </div>
    </div>
  );
};

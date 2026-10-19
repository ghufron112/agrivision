import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Sun,
  Droplets,
  Thermometer,
  ShieldAlert,
  CheckCircle2,
  ScanLine,
} from 'lucide-react';
import { plantService } from '../services/plantService';

export const PlantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'deskripsi' | 'kebutuhan' | 'penyakit' | 'tips'>('deskripsi');

  const plant = plantService.getById(id || 'cabai') || plantService.getAll()[0];

  const tabs = [
    { key: 'deskripsi', label: 'Deskripsi' },
    { key: 'kebutuhan', label: 'Kebutuhan' },
    { key: 'penyakit', label: 'Penyakit Umum' },
    { key: 'tips', label: 'Tips Perawatan' },
  ] as const;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate('/tanaman')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B7C76] hover:text-[#008F63] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Data Tanaman</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="app-card-static bg-white rounded-3xl p-6 sm:p-8 border border-[#E4ECE8] space-y-6">
        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-black/5 border border-[#E4ECE8]">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute bottom-5 left-5 text-white">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#008F63] text-white shadow-sm mb-2">
              <span>🌱</span>
              <span>{plant.category}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {plant.name}
            </h1>
            <p className="text-sm font-medium italic text-white/90">
              {plant.scientificName}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E4ECE8] gap-4 sm:gap-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.key
                  ? 'border-[#008F63] text-[#008F63]'
                  : 'border-transparent text-[#6B7C76] hover:text-[#17352E]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-2">
          {activeTab === 'deskripsi' && (
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-[#17352E] leading-relaxed">
                {plant.description}
              </p>
            </div>
          )}

          {activeTab === 'kebutuhan' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#E4ECE8]">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center mb-3">
                  <Sun className="w-5 h-5" />
                </div>
                <div className="text-xs text-[#6B7C76] font-medium">Kebutuhan Cahaya</div>
                <div className="text-sm font-bold text-[#17352E] mt-1">
                  {plant.lightRequirement}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#E4ECE8]">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#3B82F6] flex items-center justify-center mb-3">
                  <Droplets className="w-5 h-5" />
                </div>
                <div className="text-xs text-[#6B7C76] font-medium">Kebutuhan Air</div>
                <div className="text-sm font-bold text-[#17352E] mt-1">
                  {plant.waterRequirement}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#E4ECE8]">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-[#EF4444] flex items-center justify-center mb-3">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div className="text-xs text-[#6B7C76] font-medium">Suhu Ideal</div>
                <div className="text-sm font-bold text-[#17352E] mt-1">
                  {plant.temperature}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'penyakit' && (
            <div className="space-y-3">
              <p className="text-xs text-[#6B7C76]">
                Penyakit yang sering menyerang tanaman {plant.name}:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {plant.commonDiseases.map((d, i) => (
                  <div
                    key={i}
                    onClick={() => navigate('/penyakit')}
                    className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#E4ECE8] flex items-center justify-between hover:border-[#008F63]/30 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
                      <span className="text-xs font-bold text-[#17352E]">{d}</span>
                    </div>
                    <span className="text-[11px] text-[#008F63] font-semibold">Lihat info →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-3">
              {plant.tips.map((tip, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#E4ECE8]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#16A66A] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#17352E] leading-relaxed">
                    {tip}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fakta Menarik Callout Card (Screenshot 9) */}
        <div className="p-5 rounded-2xl bg-[#E8F7F1]/60 border border-[#008F63]/20 flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-[#008F63] text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#008F63]">
              Fakta Menarik
            </h4>
            <p className="text-xs sm:text-sm text-[#17352E] mt-1 leading-relaxed font-medium">
              {plant.interestingFact}
            </p>
          </div>
        </div>

        {/* CTA to analyze this plant */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => navigate('/analisis')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#008F63] hover:bg-[#007652] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            <ScanLine className="w-4 h-4" />
            <span>Analisis Foto {plant.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

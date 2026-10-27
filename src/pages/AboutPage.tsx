import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Cpu,
  MapPin,
  Database,
  ArrowRight,
  Sparkles,
  Heart,
  ShieldAlert,
  Layers
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Computer Vision',
      desc: 'Mengidentifikasi tanaman dari foto menggunakan model deep learning.',
      icon: Cpu
    },
    {
      title: 'Geographic Context',
      desc: 'Mempertimbangkan persebaran spesies berdasarkan lokasi.',
      icon: MapPin
    },
    {
      title: 'Database Taksonomi',
      desc: 'Menampilkan informasi lengkap tentang klasifikasi dan botani tanaman.',
      icon: Database
    }
  ];

  const steps = [
    'Upload foto tanaman atau pilih dari galeri.',
    '(Opsional) Tentukan lokasi tanaman.',
    'Sistem akan memproses dan menampilkan hasil identifikasi.',
    'Lihat informasi lengkap pada halaman detail.'
  ];

  return (
    <div className="space-y-5 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* 1. Header & Overview */}
      <div className="bg-white border border-[#DCE8ED] rounded-lg p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-[#07865B]">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Tentang Platform</span>
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-[#172B36]">Tentang PlantScan</h1>

        <p className="text-xs md:text-sm text-[#172B36] leading-relaxed max-w-2xl">
          PlantScan adalah sistem identifikasi spesies tanaman berbasis Computer Vision yang
          mengintegrasikan informasi geografis dan taksonomi untuk memberikan hasil identifikasi yang
          lebih akurat dan relevan.
        </p>
      </div>

      {/* 2. Three Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-[#DCE8ED] rounded-lg p-5 shadow-xs space-y-3 hover:border-[#B8D8CC] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#E5F5EE] text-[#07865B] flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs md:text-sm font-bold text-[#172B36]">{item.title}</h3>
                <p className="text-xs text-[#647985] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Panduan Penggunaan & Biodiversity Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left: Panduan Penggunaan (4 steps) */}
        <div className="md:col-span-8 bg-white border border-[#DCE8ED] rounded-lg p-5 shadow-xs space-y-4">
          <h2 className="text-xs md:text-sm font-bold text-[#172B36] border-b border-[#DCE8ED] pb-2">
            Panduan Penggunaan
          </h2>

          <div className="space-y-3">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs">
                <div className="w-6 h-6 rounded-full bg-[#07865B] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  {idx + 1}
                </div>
                <div className="pt-0.5 text-[#172B36] font-medium leading-relaxed">{step}</div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/identifikasi')}
              className="px-4 py-2 rounded-md bg-[#07865B] hover:bg-[#066B49] text-white text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>Coba Identifikasi Tanaman Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Mari Menjaga Keanekaragaman Hayati Card */}
        <div className="md:col-span-4 bg-[#E5F5EE] border border-[#B8E2D1] rounded-lg p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#07865B] text-white flex items-center justify-center">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <h3 className="text-sm font-bold text-[#066B49] leading-snug">
              Mari menjaga keanekaragaman hayati bersama!
            </h3>
            <p className="text-xs text-[#172B36]/80 leading-relaxed">
              Dokumentasi flora lokal membantu riset konservasi dan pemetaan biodiversitas Nusantara
              secara berkelanjutan.
            </p>
          </div>

          <div className="text-[10px] text-[#066B49] font-medium pt-2 border-t border-[#B8E2D1]">
            PlantScan • Inisiatif Sains Terbuka
          </div>
        </div>
      </div>

      {/* 4. Arsitektur AI & Disclaimer Integritas Botani */}
      <div className="bg-white border border-[#DCE8ED] rounded-lg p-5 shadow-xs space-y-4 text-xs">
        <div className="flex items-center gap-2 font-bold text-[#172B36]">
          <Layers className="w-4 h-4 text-[#07865B]" />
          <span>Arsitektur Sistem AI & Alur Inferensi (Meta Llama & Vision)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[#647985] text-[11px]">
          <div className="p-3 bg-[#FAFCFB] border border-[#DCE8ED] rounded-md space-y-1">
            <div className="font-semibold text-[#172B36]">1. Vision Inference</div>
            <p>Citra tanaman diproses oleh model Computer Vision berbasis konvolusi/transformer.</p>
          </div>
          <div className="p-3 bg-[#FAFCFB] border border-[#DCE8ED] rounded-md space-y-1">
            <div className="font-semibold text-[#172B36]">2. Prior Geografis</div>
            <p>Kecocokan spasial dihitung berdasarkan data persebaran dan iklim wilayah Indonesia.</p>
          </div>
          <div className="p-3 bg-[#FAFCFB] border border-[#DCE8ED] rounded-md space-y-1">
            <div className="font-semibold text-[#172B36]">3. Meta Llama Reasoning</div>
            <p>Model Llama 3.3 menyusun sintesis botani dan penjelasan konteks secara aman.</p>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-[11px] text-[#647985] flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <b>Catatan Etika & Akurasi:</b> Hasil identifikasi AI merupakan estimasi probabilitas dan
            dapat keliru. Informasi botani harus diverifikasi dengan literatur ilmiah terakreditasi
            sebelum dimanfaatkan untuk konsumsi atau keperluan medis.
          </span>
        </div>
      </div>
    </div>
  );
};

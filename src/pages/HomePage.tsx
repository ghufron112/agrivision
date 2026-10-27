import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import { demoPlants } from '../data/demoPlants';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // 6 example plants for the thumbnail carousel/grid
  const examplePlants = demoPlants.slice(0, 6);

  const features = [
    {
      title: 'Identifikasi Akurat',
      desc: 'Menggunakan AI',
      icon: Sparkles
    },
    {
      title: 'Konteks Geografis',
      desc: 'Meningkatkan Relevansi',
      icon: MapPin
    },
    {
      title: 'Informasi Lengkap',
      desc: 'Taksonomi & Botani',
      icon: BookOpen
    },
    {
      title: 'Data Terpercaya',
      desc: 'Dari Sumber Biodiversitas',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Hero Section */}
      <div className="relative rounded-xl overflow-hidden shadow-sm min-h-[260px] md:min-h-[300px] flex items-center p-6 md:p-10 border border-[#DCE8ED]">
        {/* Background Tropical Leaf Image with Dark Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1600&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03261A]/95 via-[#064E35]/85 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-xl text-white space-y-4">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Kenali Tanaman
            <br />
            di Sekitarmu
          </h1>
          <p className="text-xs md:text-sm text-white/90 leading-relaxed font-normal max-w-lg">
            Unggah foto tanaman, temukan nama, klasifikasi, dan informasi lengkapnya dengan bantuan
            AI dan konteks geografis.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/identifikasi')}
              className="px-5 py-2.5 rounded-lg bg-[#07865B] hover:bg-[#066B49] text-white text-xs md:text-sm font-semibold transition-all shadow-sm hover:shadow flex items-center gap-2 cursor-pointer"
            >
              <span>Mulai Identifikasi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/tentang')}
              className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-medium border border-white/30 backdrop-blur-xs transition-colors cursor-pointer"
            >
              Lihat Panduan
            </button>
          </div>
        </div>
      </div>

      {/* 2. Four Feature Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-[#DCE8ED] rounded-lg p-4 flex items-center gap-3 shadow-xs hover:border-[#B8D8CC] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#E5F5EE] text-[#07865B] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs md:text-sm font-bold text-[#172B36] truncate">
                  {item.title}
                </div>
                <div className="text-[11px] md:text-xs text-[#647985] truncate">
                  {item.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Contoh Tanaman Section */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h2 className="text-sm md:text-base font-bold text-[#172B36]">Contoh Tanaman</h2>
          <button
            onClick={() => navigate('/tanaman')}
            className="text-xs text-[#07865B] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Lihat Semua Spesies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {examplePlants.map((plant) => (
            <div
              key={plant.id}
              onClick={() => navigate(`/tanaman/${plant.slug}`)}
              className="group cursor-pointer bg-white border border-[#DCE8ED] rounded-lg overflow-hidden shadow-xs hover:border-[#07865B] hover:shadow-sm transition-all"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <img
                  src={plant.images[0]}
                  alt={plant.localName}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-[10px] text-white font-medium">Buka Botani &rarr;</span>
                </div>
              </div>
              <div className="p-2.5">
                <div className="text-xs font-semibold text-[#172B36] truncate group-hover:text-[#07865B] transition-colors">
                  {plant.localName}
                </div>
                <div className="text-[10px] text-[#647985] italic truncate">
                  {plant.scientificName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

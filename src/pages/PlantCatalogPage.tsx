import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Droplets, Sun, Thermometer } from 'lucide-react';
import { plantService } from '../services/plantService';

export const PlantCatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');

  const plants = plantService.search(search, category);

  const categories = ['Semua', 'Tanaman Hortikultura', 'Tanaman Sayuran Daun'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17352E] tracking-tight">
          Data Tanaman
        </h1>
        <p className="text-sm text-[#6B7C76] mt-1">
          Katalog botani dan informasi budidaya tanaman yang didukung oleh sistem AI.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#6B7C76] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama tanaman atau latin..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E4ECE8] bg-white text-xs sm:text-sm text-[#17352E] focus:outline-none focus:ring-2 focus:ring-[#008F63]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                category === cat
                  ? 'bg-[#008F63] text-white shadow-xs'
                  : 'bg-white text-[#6B7C76] border border-[#E4ECE8] hover:border-[#008F63]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.map((plant) => (
          <div
            key={plant.id}
            onClick={() => navigate(`/tanaman/${plant.id}`)}
            className="app-card group bg-white rounded-2xl border border-[#E4ECE8] overflow-hidden cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-black/5">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-[#008F63] shadow-xs">
                  {plant.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-[#17352E] group-hover:text-[#008F63] transition-colors">
                  {plant.name}
                </h3>
                <p className="text-xs text-[#6B7C76] italic font-medium mt-0.5">
                  {plant.scientificName}
                </p>

                <p className="text-xs text-[#6B7C76] mt-3 line-clamp-2 leading-relaxed">
                  {plant.description}
                </p>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#E4ECE8] text-[11px] text-[#6B7C76]">
                  <div className="flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span className="truncate">{plant.lightRequirement.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span className="truncate">{plant.waterRequirement.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-[#EF4444]" />
                    <span className="truncate">{plant.temperature}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button className="w-full py-2.5 rounded-xl border border-[#E4ECE8] group-hover:border-[#008F63] group-hover:bg-[#008F63] group-hover:text-white text-xs font-semibold text-[#17352E] transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                <span>Lihat Detail</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

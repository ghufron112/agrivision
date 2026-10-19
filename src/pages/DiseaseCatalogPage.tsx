import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { diseaseService } from '../services/diseaseService';

export const DiseaseCatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const diseases = diseaseService.search(search);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17352E] tracking-tight">
          Penyakit Tanaman
        </h1>
        <p className="text-sm text-[#6B7C76] mt-1">
          Katalog patologi tanaman, gejala klinis, serta panduan penanggulangan penyakit berbasis AI.
        </p>
      </div>

      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 text-[#6B7C76] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari penyakit atau tanaman rentan..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E4ECE8] bg-white text-xs sm:text-sm text-[#17352E] focus:outline-none focus:ring-2 focus:ring-[#008F63]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {diseases.map((d) => (
          <div
            key={d.id}
            onClick={() => navigate(`/penyakit/${d.id}`)}
            className="app-card group bg-white rounded-2xl border border-[#E4ECE8] overflow-hidden cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-black/5">
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold shadow-xs backdrop-blur-md ${
                    d.riskLevel === 'Tinggi'
                      ? 'bg-red-500/90 text-white'
                      : 'bg-amber-500/90 text-white'
                  }`}
                >
                  Risiko {d.riskLevel}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-[#17352E] group-hover:text-[#008F63] transition-colors">
                  {d.name}
                </h3>
                {d.scientificName && (
                  <p className="text-xs text-[#6B7C76] italic font-medium mt-0.5">
                    {d.scientificName}
                  </p>
                )}

                <p className="text-xs text-[#6B7C76] mt-3 line-clamp-2 leading-relaxed">
                  {d.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#E4ECE8]">
                  <span className="text-[11px] font-semibold text-[#6B7C76] block mb-1.5">
                    Tanaman Rentan:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {d.vulnerablePlants.map((plant, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-lg bg-[#F8FAF9] border border-[#E4ECE8] text-[11px] font-medium text-[#17352E]"
                      >
                        {plant}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button className="w-full py-2.5 rounded-xl border border-[#E4ECE8] group-hover:border-[#008F63] group-hover:bg-[#008F63] group-hover:text-white text-xs font-semibold text-[#17352E] transition-all flex items-center justify-center gap-1.5">
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

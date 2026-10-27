import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight, ShieldCheck } from 'lucide-react';
import { plantService } from '../services/plantService';

export const TaxonomyPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const allPlants = plantService.getAllPlants();
  const currentPlant = plantService.getPlantBySlug(slug || 'moringa-oleifera') || allPlants[0];

  const handleSelectPlant = (newSlug: string) => {
    navigate(`/taksonomi/${newSlug}`);
  };

  const taxonomyRanks = [
    { rank: 'Kingdom', value: currentPlant.taxonomy.kingdom },
    { rank: 'Divisi', value: currentPlant.taxonomy.division },
    { rank: 'Kelas', value: currentPlant.taxonomy.class },
    { rank: 'Ordo', value: currentPlant.taxonomy.order },
    { rank: 'Famili', value: currentPlant.taxonomy.family },
    { rank: 'Genus', value: currentPlant.taxonomy.genus },
    { rank: 'Spesies', value: currentPlant.taxonomy.species, isItalic: true }
  ];

  return (
    <div className="space-y-4 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-[#172B36]">Klasifikasi Taksonomi</h1>
          <p className="text-xs text-[#647985]">
            Tata nama ilmiah hierarkis berdasarkan standar International Code of Nomenclature (ICN)
          </p>
        </div>

        {/* Species Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#647985] font-medium hidden sm:inline">Pilih Spesies:</span>
          <select
            value={currentPlant.slug}
            onChange={(e) => handleSelectPlant(e.target.value)}
            className="text-xs md:text-sm bg-white border border-[#DCE8ED] rounded-md px-3 py-1.5 font-semibold text-[#172B36] focus:outline-none focus:border-[#07865B] shadow-xs cursor-pointer"
          >
            {allPlants.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.localName} ({p.scientificName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left Column: 7 Hierarchy Cards */}
        <div className="md:col-span-7 space-y-2">
          {taxonomyRanks.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#DCE8ED] rounded-lg p-3.5 flex items-center justify-between shadow-xs hover:border-[#B8D8CC] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E5F5EE] text-[#07865B] flex items-center justify-center shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-[#172B36]">{item.rank}</span>
              </div>
              <span
                className={`text-xs md:text-sm font-bold text-[#172B36] ${
                  item.isItalic ? 'italic text-[#07865B]' : ''
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Right Column: Informasi Tambahan Card */}
        <div className="md:col-span-5 bg-white border border-[#DCE8ED] rounded-lg p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h2 className="text-xs md:text-sm font-bold text-[#172B36] border-b border-[#DCE8ED] pb-2">
              Informasi Tambahan
            </h2>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-3">
                <span className="text-[#647985]">Nama lokal:</span>
                <span className="col-span-2 font-medium text-[#172B36]">
                  {currentPlant.localName}
                </span>
              </div>

              <div className="grid grid-cols-3">
                <span className="text-[#647985]">Asal:</span>
                <span className="col-span-2 font-medium text-[#172B36]">
                  {currentPlant.origin}
                </span>
              </div>

              <div className="grid grid-cols-3">
                <span className="text-[#647985]">Habitat:</span>
                <span className="col-span-2 font-medium text-[#172B36]">
                  {currentPlant.habitat}
                </span>
              </div>

              <div className="grid grid-cols-3">
                <span className="text-[#647985]">Ketinggian:</span>
                <span className="col-span-2 font-medium text-[#172B36]">
                  {currentPlant.altitude}
                </span>
              </div>

              <div className="grid grid-cols-3">
                <span className="text-[#647985]">Siklus hidup:</span>
                <span className="col-span-2 font-medium text-[#172B36]">
                  {currentPlant.lifecycle}
                </span>
              </div>

              <div className="grid grid-cols-3">
                <span className="text-[#647985]">Bagian yang digunakan:</span>
                <span className="col-span-2 font-medium text-[#172B36]">
                  {currentPlant.partsUsed}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#E5F5EE]/60 border border-[#B8E2D1] rounded-md text-[11px] text-[#066B49] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-[#07865B]" />
              <span>
                Data taksonomi disinkronkan dengan referensi botani global dan divalidasi dengan pohon filogenetik APG IV.
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#DCE8ED]">
            <button
              onClick={() => navigate(`/tanaman/${currentPlant.slug}`)}
              className="w-full py-2 px-3 rounded-md bg-[#07865B] hover:bg-[#066B49] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Buka Profil Tanaman Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

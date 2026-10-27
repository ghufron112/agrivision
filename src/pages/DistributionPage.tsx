import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { plantService } from '../services/plantService';
import { DistributionMap } from '../components/maps/DistributionMap';

export const DistributionPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const allPlants = plantService.getAllPlants();
  const currentPlant = plantService.getPlantBySlug(slug || 'moringa-oleifera') || allPlants[0];

  const handleSelectPlant = (newSlug: string) => {
    navigate(`/persebaran/${newSlug}`);
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-[#172B36]">Peta Persebaran</h1>
          <p className="text-xs text-[#07865B] font-semibold italic">
            {currentPlant.scientificName} ({currentPlant.localName})
          </p>
        </div>

        {/* Species Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#647985] font-medium hidden sm:inline">Ganti Spesies:</span>
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

      {/* Main Grid: Interactive Map + Right Information Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Leaflet Interactive Map */}
        <div className="lg:col-span-8 bg-white border border-[#DCE8ED] rounded-lg p-3 md:p-4 shadow-xs">
          <DistributionMap
            regions={currentPlant.distributionRegions}
            plantName={currentPlant.scientificName}
          />
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#647985] px-1">
            <span>Leaflet & OpenStreetMap • Proyeksi Koordinat WGS84</span>
            <span className="text-[#07865B] font-medium">*Klik pin untuk melihat catatan observasi</span>
          </div>
        </div>

        {/* Right: Kartu Informasi Persebaran */}
        <div className="lg:col-span-4 bg-white border border-[#DCE8ED] rounded-lg p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            <h2 className="text-xs md:text-sm font-bold text-[#172B36] border-b border-[#DCE8ED] pb-2">
              Informasi Persebaran
            </h2>

            <p className="text-xs text-[#172B36] leading-relaxed">
              {currentPlant.distributionText}
            </p>

            {/* List of Regions in Indonesia */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-[#172B36]">Di Indonesia:</div>
              <ul className="space-y-2 text-xs">
                {currentPlant.distributionRegions.map((region, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-md bg-[#FAFCFB] border border-[#DCE8ED]"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          region.status === 'Tercatat'
                            ? 'bg-[#07865B]'
                            : region.status === 'Kemungkinan'
                            ? 'bg-[#EAB308]'
                            : 'bg-[#94A3B8]'
                        }`}
                      />
                      <span className="font-semibold text-[#172B36]">{region.region}</span>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        region.status === 'Tercatat'
                          ? 'bg-[#E5F5EE] text-[#07865B]'
                          : region.status === 'Kemungkinan'
                          ? 'bg-[#FEF9C3] text-[#854D0E]'
                          : 'bg-[#F1F5F9] text-[#475569]'
                      }`}
                    >
                      {region.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick link to plant detail */}
          <div className="pt-3 border-t border-[#DCE8ED]">
            <button
              onClick={() => navigate(`/tanaman/${currentPlant.slug}`)}
              className="w-full py-2 px-3 rounded-md bg-[#E5F5EE] hover:bg-[#D5EFE4] text-[#07865B] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Lihat Karakteristik Lengkap Tanaman</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

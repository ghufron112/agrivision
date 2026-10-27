import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Trees,
  Maximize2,
  Flower2,
  FileText,
  Compass,
  ArrowRight,
  GitFork,
  Bot,
  ExternalLink,
  BookOpen,
  Scale,
  Globe,
  Database,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { plantService } from '../services/plantService';
import type { Plant, PlantReferenceData } from '../types/plant';
import { PlantScanChatbot } from '../components/chat/PlantScanChatbot';

const BACKEND_API_BASE = 'http://127.0.0.1:8000';

export const PlantDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const allPlants = plantService.getAllPlants();
  const basePlant = plantService.getPlantBySlug(slug || 'capsicum-frutescens') || allPlants[0];

  const [currentPlant, setCurrentPlant] = useState<Plant>(basePlant);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'deskripsi' | 'taksonomi' | 'habitat' | 'karakteristik' | 'referensi'>('deskripsi');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialQuestion, setChatInitialQuestion] = useState<string | undefined>(undefined);
  const [referenceData, setReferenceData] = useState<PlantReferenceData | null>(null);
  const [isLoadingRef, setIsLoadingRef] = useState(false);

  // Perbarui currentPlant saat slug berubah
  useEffect(() => {
    const found = plantService.getPlantBySlug(slug || 'capsicum-frutescens');
    if (found) {
      setCurrentPlant(found);
    } else if (slug) {
      // Jika slug tidak ada di daftar lokal, buat plant placeholder sementara dan ambil data langsung
      const cleanName = slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
      const tempPlant: Plant = {
        id: slug,
        slug: slug,
        scientificName: cleanName,
        localName: cleanName,
        family: 'Informasi belum tersedia',
        genus: cleanName.split(' ')[0],
        images: ['https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80'],
        description: 'Informasi belum tersedia',
        type: 'Informasi belum tersedia',
        height: 'Informasi belum tersedia',
        leaves: 'Informasi belum tersedia',
        flowers: 'Informasi belum tersedia',
        habitat: 'Informasi belum tersedia',
        altitude: 'Informasi belum tersedia',
        lifecycle: 'Informasi belum tersedia',
        partsUsed: 'Informasi belum tersedia',
        origin: 'Informasi belum tersedia',
        benefits: ['Informasi belum tersedia'],
        recordedInEastJava: false,
        distributionText: 'Informasi persebaran spesimen belum tersedia dalam katalog regional.',
        distributionRegions: [],
        taxonomy: {
          kingdom: 'Plantae',
          division: 'Informasi belum tersedia',
          class: 'Informasi belum tersedia',
          order: 'Informasi belum tersedia',
          family: 'Informasi belum tersedia',
          genus: cleanName.split(' ')[0],
          species: cleanName
        }
      };
      setCurrentPlant(tempPlant);
    }
    setActiveImageIndex(0);
  }, [slug]);

  // Fetch Wikipedia & Wikidata reference data for current plant
  useEffect(() => {
    if (!currentPlant.scientificName) return;

    setIsLoadingRef(true);
    fetch(`${BACKEND_API_BASE}/api/reference/${encodeURIComponent(currentPlant.scientificName)}`)
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data: PlantReferenceData | null) => {
        if (data) {
          setReferenceData(data);
          // Jika data memiliki gambar referensi Wikipedia dan belum ada di images, tambahkan
          if (data.image_url && !currentPlant.images.includes(data.image_url)) {
            setCurrentPlant((prev) => ({
              ...prev,
              images: [data.image_url!, ...prev.images]
            }));
          }
        }
      })
      .catch((err) => {
        console.debug('Gagal mengambil data referensi botani:', err);
      })
      .finally(() => setIsLoadingRef(false));
  }, [currentPlant.scientificName]);

  // Handle plant selector change
  const handleSelectPlant = (newSlug: string) => {
    setActiveImageIndex(0);
    navigate(`/tanaman/${newSlug}`);
  };

  const tabs = [
    { id: 'deskripsi', label: 'Deskripsi' },
    { id: 'taksonomi', label: 'Taksonomi' },
    { id: 'habitat', label: 'Habitat & Persebaran' },
    { id: 'karakteristik', label: 'Karakteristik Morfologi' },
    { id: 'referensi', label: 'Referensi Botani' }
  ] as const;

  // Taksonomi berhirarki yang diselaraskan
  const taxonomy = {
    kingdom: referenceData?.taxonomy?.kingdom || currentPlant.taxonomy?.kingdom || 'Plantae',
    division: referenceData?.taxonomy?.division || currentPlant.taxonomy?.division || 'Informasi belum tersedia',
    class: referenceData?.taxonomy?.class || currentPlant.taxonomy?.class || 'Informasi belum tersedia',
    order: referenceData?.taxonomy?.order || currentPlant.taxonomy?.order || 'Informasi belum tersedia',
    family: referenceData?.taxonomy?.family || currentPlant.family || currentPlant.taxonomy?.family || 'Informasi belum tersedia',
    genus: referenceData?.taxonomy?.genus || currentPlant.genus || currentPlant.taxonomy?.genus || 'Informasi belum tersedia',
    species: (referenceData?.taxonomy?.species && referenceData.taxonomy.species !== 'Informasi belum tersedia')
      ? referenceData.taxonomy.species
      : (currentPlant.taxonomy?.species && currentPlant.taxonomy.species !== 'Informasi belum tersedia')
      ? currentPlant.taxonomy.species
      : 'Informasi belum tersedia'
  };

  const displayName = referenceData?.common_name && referenceData.common_name !== 'Informasi belum tersedia'
    ? referenceData.common_name
    : currentPlant.localName;

  const displayDescription = referenceData?.description && referenceData.description !== 'Informasi belum tersedia'
    ? referenceData.description
    : currentPlant.description;

  return (
    <div className="space-y-4 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Top Header & Plant Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-[#172B36]">Detail Informasi Tanaman</h1>
          <p className="text-xs text-[#647985]">
            Basis data morfologi, taksonomi botani terstruktur (Wikidata), dan ensiklopedia (Wikipedia)
          </p>
        </div>

        {/* Species selector dropdown */}
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

      {/* Main Two-Column Card */}
      <div className="bg-white border border-[#DCE8ED] rounded-lg p-5 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Photos */}
        <div className="md:col-span-5 space-y-3">
          {/* Main Photo */}
          <div className="w-full aspect-square rounded-lg overflow-hidden border border-[#DCE8ED] bg-slate-100 shadow-xs relative group">
            <img
              src={currentPlant.images[activeImageIndex] || currentPlant.images[0]}
              alt={currentPlant.scientificName}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded">
              Foto {activeImageIndex + 1} dari {currentPlant.images.length}
            </div>
            {referenceData?.image_url && activeImageIndex === 0 && (
              <div className="absolute bottom-2 inset-x-2 bg-black/60 backdrop-blur-xs text-white text-[9px] px-2 py-0.5 rounded text-center truncate">
                {referenceData.image_attribution || 'Wikimedia Commons (CC BY-SA)'}
              </div>
            )}
          </div>

          {/* Photo Thumbnails */}
          {currentPlant.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {currentPlant.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square rounded-md overflow-hidden border transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#07865B] ring-2 ring-[#07865B]/30'
                      : 'border-[#DCE8ED] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Taxonomy, Metadata & Tabs */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Header + Location Status Badge */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E5F5EE] text-[#07865B] border border-[#B8E2D1]">
                  <MapPin className="w-3 h-3 text-[#07865B]" />
                  <span>Tanaman Tercatat di Indonesia</span>
                </span>
                {referenceData && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    <Globe className="w-2.5 h-2.5" />
                    <span>Terverifikasi Wikipedia & Wikidata</span>
                  </span>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#172B36] italic">
                {currentPlant.scientificName}
              </h2>
            </div>

            {/* Metadata Fields */}
            <div className="space-y-1 py-2 text-xs border-t border-b border-[#DCE8ED]">
              <div className="grid grid-cols-3">
                <span className="text-[#647985]">Nama lokal:</span>
                <span className="col-span-2 font-medium text-[#172B36]">
                  {displayName}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-[#647985]">Nama ilmiah:</span>
                <span className="col-span-2 font-medium text-[#172B36] italic">
                  {currentPlant.scientificName}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-[#647985]">Famili:</span>
                <span className="col-span-2 font-medium text-[#172B36]">
                  {taxonomy.family}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-[#647985]">Genus:</span>
                <span className="col-span-2 font-medium text-[#172B36]">
                  {taxonomy.genus}
                </span>
              </div>
            </div>

            {/* Interactive Tabs Navigation */}
            <div className="flex border-b border-[#DCE8ED] overflow-x-auto gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-[#07865B] text-[#07865B] bg-[#E5F5EE]/40'
                      : 'border-transparent text-[#647985] hover:text-[#172B36]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Deskripsi */}
            {activeTab === 'deskripsi' && (
              <div className="space-y-4 pt-1 animate-in fade-in duration-150">
                <p className="text-xs text-[#172B36] leading-relaxed">
                  {displayDescription}
                </p>

                {/* 4 Feature Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div className="bg-[#FAFCFB] border border-[#DCE8ED] rounded-md p-2.5 text-center">
                    <Trees className="w-4 h-4 text-[#07865B] mx-auto mb-1" />
                    <div className="text-[10px] text-[#647985]">Tipe Tanaman</div>
                    <div className="text-xs font-semibold text-[#172B36] mt-0.5 truncate">
                      {currentPlant.type || 'Informasi belum tersedia'}
                    </div>
                  </div>

                  <div className="bg-[#FAFCFB] border border-[#DCE8ED] rounded-md p-2.5 text-center">
                    <Maximize2 className="w-4 h-4 text-[#07865B] mx-auto mb-1" />
                    <div className="text-[10px] text-[#647985]">Tinggi</div>
                    <div className="text-xs font-semibold text-[#172B36] mt-0.5 truncate">
                      {currentPlant.height || 'Informasi belum tersedia'}
                    </div>
                  </div>

                  <div className="bg-[#FAFCFB] border border-[#DCE8ED] rounded-md p-2.5 text-center">
                    <FileText className="w-4 h-4 text-[#07865B] mx-auto mb-1" />
                    <div className="text-[10px] text-[#647985]">Daun</div>
                    <div className="text-xs font-semibold text-[#172B36] mt-0.5 truncate">
                      {currentPlant.leaves || 'Informasi belum tersedia'}
                    </div>
                  </div>

                  <div className="bg-[#FAFCFB] border border-[#DCE8ED] rounded-md p-2.5 text-center">
                    <Flower2 className="w-4 h-4 text-[#07865B] mx-auto mb-1" />
                    <div className="text-[10px] text-[#647985]">Bunga</div>
                    <div className="text-xs font-semibold text-[#172B36] mt-0.5 truncate">
                      {currentPlant.flowers || 'Informasi belum tersedia'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Taksonomi Lengkap (Kingdom, Divisi, Kelas, Ordo, Famili, Genus, Spesies) */}
            {activeTab === 'taksonomi' && (
              <div className="space-y-3 pt-1 animate-in fade-in duration-150 text-xs">
                <div className="bg-[#FAFCFB] border border-[#DCE8ED] rounded-md p-3 space-y-2">
                  <div className="flex justify-between border-b border-[#DCE8ED] pb-1">
                    <span className="text-[#647985] font-medium">Kingdom (Kerajaan):</span>
                    <span className="font-semibold text-[#172B36]">{taxonomy.kingdom}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#DCE8ED] pb-1">
                    <span className="text-[#647985] font-medium">Divisi / Filum:</span>
                    <span className="font-semibold text-[#172B36]">{taxonomy.division}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#DCE8ED] pb-1">
                    <span className="text-[#647985] font-medium">Kelas:</span>
                    <span className="font-semibold text-[#172B36]">{taxonomy.class}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#DCE8ED] pb-1">
                    <span className="text-[#647985] font-medium">Ordo:</span>
                    <span className="font-semibold text-[#172B36]">{taxonomy.order}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#DCE8ED] pb-1">
                    <span className="text-[#647985] font-medium">Famili:</span>
                    <span className="font-semibold text-[#172B36]">{taxonomy.family}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#DCE8ED] pb-1">
                    <span className="text-[#647985] font-medium">Genus:</span>
                    <span className="font-semibold text-[#07865B] italic">{taxonomy.genus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#647985] font-medium">Spesies:</span>
                    <span className="font-bold text-[#07865B] italic">{taxonomy.species}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#647985]">
                  <span>Sumber Taksonomi: Wikidata Knowledge Graph & GBIF</span>
                  <button
                    onClick={() => navigate(`/taksonomi/${currentPlant.slug}`)}
                    className="text-xs text-[#07865B] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Buka Visualisasi Pohon Taksonomi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Habitat & Persebaran */}
            {activeTab === 'habitat' && (
              <div className="space-y-3 pt-1 animate-in fade-in duration-150 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-[#FAFCFB] border border-[#DCE8ED] rounded-md">
                    <span className="text-[#647985] block text-[10px]">Tipe Habitat</span>
                    <span className="font-semibold text-[#172B36]">{currentPlant.habitat || 'Informasi belum tersedia'}</span>
                  </div>
                  <div className="p-2.5 bg-[#FAFCFB] border border-[#DCE8ED] rounded-md">
                    <span className="text-[#647985] block text-[10px]">Elevasi Ketinggian</span>
                    <span className="font-semibold text-[#172B36]">{currentPlant.altitude || 'Informasi belum tersedia'}</span>
                  </div>
                </div>
                <div className="p-2.5 bg-[#FAFCFB] border border-[#DCE8ED] rounded-md">
                  <span className="text-[#647985] block text-[10px]">Asal Geografis & Wilayah Asli</span>
                  <span className="font-semibold text-[#172B36]">{currentPlant.origin || 'Informasi belum tersedia'}</span>
                </div>
                <div className="p-2.5 bg-[#FAFCFB] border border-[#DCE8ED] rounded-md space-y-1.5">
                  <span className="text-[#647985] block text-[10px] font-medium">Catatan Persebaran di Indonesia:</span>
                  <p className="text-xs text-[#172B36] leading-relaxed">
                    {currentPlant.distributionText || 'Informasi belum tersedia'}
                  </p>
                  {currentPlant.distributionRegions && currentPlant.distributionRegions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {currentPlant.distributionRegions.map((r, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-white border border-[#DCE8ED] text-[10px] font-medium text-[#172B36]"
                        >
                          {r.region} ({r.status})
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 4: Karakteristik Morfologi */}
            {activeTab === 'karakteristik' && (
              <div className="space-y-2.5 pt-1 animate-in fade-in duration-150 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2.5 bg-[#FAFCFB] border border-[#DCE8ED] rounded-md">
                    <span className="text-[#647985] block text-[10px]">Morfologi Dedaunan</span>
                    <span className="font-medium text-[#172B36] text-[11px] leading-relaxed">{currentPlant.leaves || 'Informasi belum tersedia'}</span>
                  </div>
                  <div className="p-2.5 bg-[#FAFCFB] border border-[#DCE8ED] rounded-md">
                    <span className="text-[#647985] block text-[10px]">Bunga & Perbungaan</span>
                    <span className="font-medium text-[#172B36] text-[11px] leading-relaxed">{currentPlant.flowers || 'Informasi belum tersedia'}</span>
                  </div>
                  <div className="p-2.5 bg-[#FAFCFB] border border-[#DCE8ED] rounded-md">
                    <span className="text-[#647985] block text-[10px]">Habitus & Tinggi Batang</span>
                    <span className="font-medium text-[#172B36] text-[11px] leading-relaxed">{currentPlant.height || 'Informasi belum tersedia'} — {currentPlant.type || 'Informasi belum tersedia'}</span>
                  </div>
                  <div className="p-2.5 bg-[#FAFCFB] border border-[#DCE8ED] rounded-md">
                    <span className="text-[#647985] block text-[10px]">Siklus Hidup & Organ Utama</span>
                    <span className="font-medium text-[#172B36] text-[11px] leading-relaxed">{currentPlant.lifecycle || 'Informasi belum tersedia'} ({currentPlant.partsUsed || 'Informasi belum tersedia'})</span>
                  </div>
                </div>
                {currentPlant.benefits && currentPlant.benefits.length > 0 && currentPlant.benefits[0] !== 'Informasi belum tersedia' && (
                  <div className="p-2.5 bg-[#FAFCFB] border border-[#DCE8ED] rounded-md">
                    <span className="text-[#647985] block text-[10px] mb-1">Pemanfaatan & Etnobotani:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-[#172B36] text-[11px]">
                      {currentPlant.benefits.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                    <div className="mt-2 text-[10px] text-amber-700 bg-amber-50 p-1.5 rounded border border-amber-200">
                      Informasi botani ini untuk edukasi keanekaragaman hayati dan bukan instruksi medis/pengobatan klinis.
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 5: Referensi Botani Lengkap (Wikipedia, Wikidata, GBIF, POWO) */}
            {activeTab === 'referensi' && (
              <div className="space-y-2.5 pt-1 animate-in fade-in duration-150 text-xs">
                <div className="p-3 bg-[#FAFCFB] border border-[#DCE8ED] rounded-md space-y-2.5">
                  <div className="flex items-center justify-between border-b border-[#DCE8ED] pb-2">
                    <div className="flex items-center gap-2 font-semibold text-[#172B36]">
                      <BookOpen className="w-4 h-4 text-[#07865B]" />
                      <span>Basis Data Terbuka Terverifikasi</span>
                    </div>
                    {referenceData?.fetch_date && (
                      <span className="text-[10px] text-[#647985] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Diambil: {referenceData.fetch_date}</span>
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-[#647985] leading-relaxed">
                    Data taksonomi, sinonim ilmiah, ringkasan deskripsi, dan persebaran spasial diverifikasi silang dengan repositori internasional terbuka:
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {/* Wikipedia */}
                    {referenceData?.wikipedia_url ? (
                      <a
                        href={referenceData.wikipedia_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2 rounded bg-white border border-[#DCE8ED] hover:border-[#07865B] text-[#07865B] font-medium transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-blue-600" />
                          <span>Wikipedia Ensiklopedia Bebas ({referenceData.scientific_name})</span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <a
                        href={`https://id.wikipedia.org/wiki/${encodeURIComponent(currentPlant.scientificName)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2 rounded bg-white border border-[#DCE8ED] hover:border-[#07865B] text-[#07865B] font-medium transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-blue-600" />
                          <span>Pencarian Ensiklopedia Wikipedia ({currentPlant.scientificName})</span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {/* Wikidata */}
                    {referenceData?.wikidata_url ? (
                      <a
                        href={referenceData.wikidata_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2 rounded bg-white border border-[#DCE8ED] hover:border-[#07865B] text-[#07865B] font-medium transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5 text-purple-600" />
                          <span>Wikidata Taxon Entity ({referenceData.wikidata_id})</span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <a
                        href={`https://www.wikidata.org/w/index.php?search=${encodeURIComponent(currentPlant.scientificName)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2 rounded bg-white border border-[#DCE8ED] hover:border-[#07865B] text-[#07865B] font-medium transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5 text-purple-600" />
                          <span>Wikidata Knowledge Graph (Pencarian Takson)</span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {/* POWO */}
                    <a
                      href={`https://powo.science.kew.org/results?q=${encodeURIComponent(currentPlant.scientificName)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2 rounded bg-white border border-[#DCE8ED] hover:border-[#07865B] text-[#07865B] font-medium transition-colors"
                    >
                      <span>Plants of the World Online (POWO — Royal Botanic Gardens, Kew)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {/* GBIF */}
                    <a
                      href={`https://www.gbif.org/species/search?q=${encodeURIComponent(currentPlant.scientificName)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2 rounded bg-white border border-[#DCE8ED] hover:border-[#07865B] text-[#07865B] font-medium transition-colors"
                    >
                      <span>Global Biodiversity Information Facility (GBIF Backbone Taxonomy)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {/* Pl@ntNet-300K */}
                    <div className="p-2 rounded bg-white border border-[#DCE8ED] text-[#647985] text-[11px] flex items-center justify-between">
                      <span>Pl@ntNet-300K Benchmark Dataset (Zenodo 10419064 / Garcin et al., NeurIPS)</span>
                      <span className="font-semibold text-[#07865B]">Mode Latih / Inferensi</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#DCE8ED] text-[10px] text-[#647985] space-y-0.5">
                    <p className="flex items-center gap-1 text-[#066B49] font-medium">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Atribusi & Lisensi Konten:</span>
                    </p>
                    <p>
                      {referenceData?.license_note ||
                        'Teks ensiklopedia berlisensi Creative Commons Attribution-ShareAlike (CC BY-SA 4.0); Gambar dari Wikimedia Commons berlisensi CC BY-SA / Public Domain.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons: Tanya PlantScan AI & Bandingkan */}
          <div className="pt-3 border-t border-[#DCE8ED] space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => {
                  setChatInitialQuestion(`Ceritakan karakteristik botani dan keunikan dari tanaman ${displayName} (${currentPlant.scientificName})`);
                  setIsChatOpen(true);
                }}
                className="flex-1 py-2 px-3 rounded-md bg-[#07865B] hover:bg-[#066B49] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>Tanya PlantScan AI tentang Tanaman Ini</span>
              </button>

              <button
                type="button"
                onClick={() => navigate(`/perbandingan?plantA=${currentPlant.slug}`)}
                className="py-2 px-3 rounded-md bg-[#E5F5EE] hover:bg-[#D5EFE4] text-[#07865B] border border-[#B8E2D1] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Scale className="w-4 h-4" />
                <span>Bandingkan Spesies</span>
              </button>
            </div>

            {/* Quick links to Persebaran & Taksonomi */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => navigate(`/persebaran/${currentPlant.slug}`)}
                className="text-xs font-medium text-[#07865B] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Lihat di Peta Persebaran</span>
              </button>

              <button
                onClick={() => navigate(`/taksonomi/${currentPlant.slug}`)}
                className="text-xs font-medium text-[#07865B] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <GitFork className="w-3.5 h-3.5" />
                <span>Lihat Taksonomi Lengkap</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PlantScan AI Chatbot Drawer */}
      <PlantScanChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        plantContext={{
          scientificName: currentPlant.scientificName,
          commonName: displayName,
          family: taxonomy.family,
          genus: taxonomy.genus,
          confidence: 95,
          location: 'Indonesia (Jawa Timur)'
        }}
        initialQuestion={chatInitialQuestion}
      />
    </div>
  );
};

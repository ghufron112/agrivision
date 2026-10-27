import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Share2,
  ExternalLink,
  CheckCircle,
  RotateCcw,
  Sparkles,
  MessageSquare,
  AlertTriangle,
  BookOpen,
  Globe,
  Database,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { historyService } from '../services/historyService';
import type { IdentificationRecord, PlantReferenceData } from '../types/plant';
import { PlantScanChatbot } from '../components/chat/PlantScanChatbot';

const BACKEND_API_BASE = 'http://127.0.0.1:8000';

export const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve state or latest history item
  const recordId = (location.state as any)?.recordId;
  const historyList = historyService.getHistory();
  const currentRecord: IdentificationRecord =
    (recordId ? historyService.getRecordById(recordId) : null) ||
    historyList[0] || {
      id: 'default-result',
      date: new Date().toISOString(),
      dateFormatted: '23 Oktober 2026',
      photoUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Capsicum_%27Siling_Labuyo%27_%28Mindanao%2C_Philippines%29_2.jpg/800px-Capsicum_%27Siling_Labuyo%27_%28Mindanao%2C_Philippines%29_2.jpg',
      scientificName: 'Capsicum frutescens',
      localName: 'Cabai Rawit',
      family: 'Solanaceae',
      genus: 'Capsicum',
      location: 'Jawa Timur',
      confidence: 58,
      visualScore: 74,
      geographicScore: 16,
      finalScore: 90,
      plantSlug: 'capsicum-frutescens',
      isSimulation: false,
      modeUsed: 'local_model',
      otherCandidates: [
        { scientificName: 'Capsicum frutescens', confidence: 58 },
        { scientificName: 'Capsicum annuum', confidence: 32 },
        { scientificName: 'Capsicum chinense', confidence: 7 },
        { scientificName: 'Solanum lycopersicum', confidence: 3 }
      ]
    };

  const [locationName, setLocationName] = useState(currentRecord.location);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialQuestion, setChatInitialQuestion] = useState<string | undefined>(undefined);
  const [referenceData, setReferenceData] = useState<PlantReferenceData | null>(
    currentRecord.referenceData || null
  );
  const [isLoadingRef, setIsLoadingRef] = useState(false);

  // Jika record belum memiliki referenceData, ambil secara asinkron dari backend
  useEffect(() => {
    if (!referenceData && currentRecord.scientificName) {
      setIsLoadingRef(true);
      fetch(`${BACKEND_API_BASE}/api/reference/${encodeURIComponent(currentRecord.scientificName)}`)
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .then((data: PlantReferenceData | null) => {
          if (data) {
            setReferenceData(data);
          }
        })
        .catch((err) => {
          console.debug('Tidak dapat memuat referensi Wikipedia:', err);
        })
        .finally(() => setIsLoadingRef(false));
    }
  }, [currentRecord.scientificName]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setSharedToast(true);
    setTimeout(() => setSharedToast(false), 2500);
  };

  const isUncertain = !!currentRecord.confidenceWarning || currentRecord.confidence < 40;

  return (
    <div className="space-y-4 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-[#172B36]">Hasil Identifikasi</h1>
          <p className="text-xs text-[#647985]">
            Diidentifikasi pada {currentRecord.dateFormatted} • Status:{' '}
            <span className={isUncertain ? 'text-amber-700 font-semibold' : 'text-[#07865B] font-semibold'}>
              {isUncertain ? 'Belum Meyakinkan (Perlu Verifikasi)' : 'Teridentifikasi Aktif'}
            </span>
          </p>
        </div>
        <button
          onClick={() => navigate('/identifikasi')}
          className="px-3 py-1.5 rounded-md border border-[#DCE8ED] bg-white hover:bg-[#F7FAFC] text-xs font-semibold text-[#172B36] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#07865B]" />
          <span>Identifikasi Ulang</span>
        </button>
      </div>

      {/* Peringatan Ambang Keyakinan Rendah (Confidence Threshold Warning) */}
      {isUncertain && (
        <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-lg text-amber-900 text-xs flex items-start gap-3 shadow-2xs">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-950 block">Peringatan: Bukti Identifikasi Belum Cukup Pasti</span>
            <p className="text-amber-800 text-[11px] leading-relaxed">
              {currentRecord.confidenceWarning ||
                'Hasil belum meyakinkan. Model memiliki tingkat keyakinan rendah pada citra ini. Disarankan mengambil foto ulang dengan jarak lebih dekat, pencahayaan cukup, serta fokus tajam pada daun atau bunga.'}
            </p>
          </div>
        </div>
      )}

      {/* 1. BAGIAN HASIL IDENTIFIKASI MESIN INFERENSI */}
      <div className="bg-white border border-[#DCE8ED] rounded-lg p-5 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left: Plant Photo */}
        <div className="md:col-span-5 flex items-center justify-center">
          <div className="w-full aspect-4/3 md:aspect-square rounded-lg overflow-hidden border border-[#DCE8ED] bg-slate-100 shadow-xs relative">
            <img
              src={currentRecord.photoUrl}
              alt={currentRecord.scientificName}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-medium">
              Citra Input Pengguna
            </div>
          </div>
        </div>

        {/* Right: Prediction Details */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                isUncertain
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-[#E5F5EE] text-[#07865B] border border-[#B8E2D1]'
              }`}>
                <CheckCircle className="w-3 h-3" />
                {isUncertain ? 'Kandidat Teratas (Probabilitas Rendah)' : 'Kandidat Prediksi Utama'}
              </span>
              
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                currentRecord.modeUsed === 'plantnet_api'
                  ? 'bg-blue-50 border-blue-200 text-blue-800'
                  : currentRecord.modeUsed === 'local_model'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}>
                {currentRecord.modeUsed === 'plantnet_api'
                  ? 'Mode A: Pl@ntNet API'
                  : currentRecord.modeUsed === 'local_model'
                  ? 'Mode B: Model Lokal (Pl@ntNet-300K)'
                  : 'Mode Terkalibrasi'}
              </span>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#172B36] italic">
                {currentRecord.scientificName}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-sm font-bold ${isUncertain ? 'text-amber-700' : 'text-[#07865B]'}`}>
                  Confidence: {currentRecord.confidence}%
                </span>
                <span className="text-[11px] text-[#647985]">
                  • Skor Gabungan: {currentRecord.finalScore}%
                </span>
              </div>
            </div>

            {/* Details Table */}
            <div className="space-y-1.5 py-2 border-t border-b border-[#DCE8ED] text-xs">
              <div className="grid grid-cols-3">
                <span className="text-[#647985]">Nama lokal:</span>
                <span className="col-span-2 font-medium text-[#172B36]">
                  {referenceData?.common_name && referenceData.common_name !== 'Informasi belum tersedia'
                    ? referenceData.common_name
                    : currentRecord.localName}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-[#647985]">Nama ilmiah:</span>
                <span className="col-span-2 font-medium text-[#172B36] italic">
                  {currentRecord.scientificName}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-[#647985]">Famili:</span>
                <span className="col-span-2 font-medium text-[#172B36]">
                  {referenceData?.taxonomy?.family && referenceData.taxonomy.family !== 'Informasi belum tersedia'
                    ? referenceData.taxonomy.family
                    : currentRecord.family}
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-[#647985]">Genus:</span>
                <span className="col-span-2 font-medium text-[#172B36]">
                  {referenceData?.taxonomy?.genus && referenceData.taxonomy.genus !== 'Informasi belum tersedia'
                    ? referenceData.taxonomy.genus
                    : currentRecord.genus}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() =>
                navigate(`/tanaman/${currentRecord.plantSlug || 'capsicum-frutescens'}`)
              }
              className="flex-1 min-w-[140px] py-2 px-3 rounded-md bg-[#07865B] hover:bg-[#066B49] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>Lihat Detail Lengkap</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setChatInitialQuestion('Jelaskan tanaman ini secara lengkap dan apa potensi risikonya?');
                setIsChatOpen(true);
              }}
              className="py-2 px-3 rounded-md bg-[#E5F5EE] hover:bg-[#D5EFE4] text-[#07865B] border border-[#B8E2D1] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#07865B]" />
              <span>Jelaskan dengan AI</span>
            </button>

            <button
              onClick={() => {
                setChatInitialQuestion(undefined);
                setIsChatOpen(true);
              }}
              className="py-2 px-3 rounded-md bg-white hover:bg-[#F7FAFC] text-[#172B36] border border-[#DCE8ED] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#07865B]" />
              <span>Tanya PlantScan AI</span>
            </button>

            <button
              onClick={handleShare}
              title="Bagikan Hasil"
              className="p-2 rounded-md border border-[#DCE8ED] bg-white hover:bg-[#F7FAFC] text-[#647985] hover:text-[#172B36] transition-colors relative cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              {sharedToast && (
                <span className="absolute -top-8 right-0 bg-[#172B36] text-white text-[10px] px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                  Tautan disalin!
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. BAGIAN DATA REFERENSI WIKIPEDIA & WIKIDATA (TERPISAH & JELAS) */}
      <div className="bg-white border border-[#DCE8ED] rounded-lg p-5 shadow-xs space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE8ED] pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#07865B]" />
            <h3 className="text-sm font-bold text-[#172B36]">
              Data Referensi Ilmiah (Wikipedia & Wikidata)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
              <Globe className="w-3 h-3" />
              Wikipedia API
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
              <Database className="w-3 h-3" />
              Wikidata Taxon
            </span>
          </div>
        </div>

        {referenceData ? (
          <div className="space-y-3 text-xs">
            {/* Description & Reference Specimen Photo */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              {/* Reference Thumbnail from Wikimedia Commons */}
              {referenceData.image_url && (
                <div className="md:col-span-3">
                  <div className="aspect-4/3 rounded-md overflow-hidden border border-[#DCE8ED] bg-slate-50 relative group">
                    <img
                      src={referenceData.image_url}
                      alt={`Referensi ${referenceData.scientific_name}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-2xs text-white text-[9px] p-1 text-center truncate">
                      {referenceData.image_attribution || 'Wikimedia Commons'}
                    </div>
                  </div>
                </div>
              )}

              {/* Text Extract Description */}
              <div className={referenceData.image_url ? 'md:col-span-9 space-y-2' : 'md:col-span-12 space-y-2'}>
                <p className="text-[#172B36] leading-relaxed text-xs">
                  {referenceData.description !== 'Informasi belum tersedia'
                    ? referenceData.description
                    : 'Informasi deskriptif belum tersedia pada artikel ensiklopedia terverifikasi.'}
                </p>

                {/* Structured Taxonomy Badges */}
                <div className="pt-2">
                  <div className="text-[10px] font-semibold text-[#647985] mb-1.5 flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#07865B]" />
                    <span>Hirarki Taksonomi Wikidata:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-[#FAFCFB] border border-[#DCE8ED] text-[#172B36]">
                      <strong className="text-[#647985]">Kingdom:</strong>{' '}
                      {referenceData.taxonomy.kingdom || 'Plantae'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#FAFCFB] border border-[#DCE8ED] text-[#172B36]">
                      <strong className="text-[#647985]">Divisi:</strong>{' '}
                      {referenceData.taxonomy.division || 'Tracheophytes'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#FAFCFB] border border-[#DCE8ED] text-[#172B36]">
                      <strong className="text-[#647985]">Ordo:</strong>{' '}
                      {referenceData.taxonomy.order || 'Informasi belum tersedia'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#FAFCFB] border border-[#DCE8ED] text-[#172B36]">
                      <strong className="text-[#647985]">Famili:</strong>{' '}
                      {referenceData.taxonomy.family || currentRecord.family}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#FAFCFB] border border-[#DCE8ED] text-[#172B36]">
                      <strong className="text-[#647985]">Genus:</strong>{' '}
                      <em className="text-[#07865B]">{referenceData.taxonomy.genus || currentRecord.genus}</em>
                    </span>
                    {referenceData.taxonomy.species && referenceData.taxonomy.species !== 'Informasi belum tersedia' && (
                      <span className="px-2 py-0.5 rounded bg-[#E5F5EE] border border-[#B8E2D1] text-[#07865B] font-semibold">
                        <strong>Spesies:</strong> <em>{referenceData.taxonomy.species}</em>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Official External Reference Links */}
            <div className="pt-3 border-t border-[#DCE8ED] flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {referenceData.wikipedia_url && (
                  <a
                    href={referenceData.wikipedia_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F7FAFC] hover:bg-slate-100 border border-[#DCE8ED] text-[11px] font-medium text-[#172B36] transition-colors"
                  >
                    <Globe className="w-3 h-3 text-blue-600" />
                    <span>Buka Artikel Wikipedia</span>
                    <ExternalLink className="w-2.5 h-2.5 text-[#647985]" />
                  </a>
                )}
                {referenceData.wikidata_url && (
                  <a
                    href={referenceData.wikidata_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F7FAFC] hover:bg-slate-100 border border-[#DCE8ED] text-[11px] font-medium text-[#172B36] transition-colors"
                  >
                    <Database className="w-3 h-3 text-purple-600" />
                    <span>Entitas Wikidata ({referenceData.wikidata_id})</span>
                    <ExternalLink className="w-2.5 h-2.5 text-[#647985]" />
                  </a>
                )}
                {referenceData.gbif_url && (
                  <a
                    href={referenceData.gbif_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F7FAFC] hover:bg-slate-100 border border-[#DCE8ED] text-[11px] font-medium text-[#172B36] transition-colors"
                  >
                    <span>GBIF Backbone</span>
                    <ExternalLink className="w-2.5 h-2.5 text-[#647985]" />
                  </a>
                )}
              </div>

              <div className="text-[10px] text-[#647985]">
                Diakses pada {referenceData.fetch_date} • {referenceData.license_note}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-3 text-center text-xs text-[#647985]">
            {isLoadingRef
              ? 'Memuat data taksonomi dari Wikipedia dan Wikidata...'
              : 'Informasi referensi ensiklopedia belum tersedia untuk spesimen ini.'}
          </div>
        )}
      </div>

      {/* 3. BAGIAN PENJELASAN AI LLAMA (TERPISAH SEBAGAI SINTESIS REASONING) */}
      {currentRecord.llamaExplanation && (
        <div className="bg-white border border-[#DCE8ED] rounded-lg p-5 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between border-b border-[#DCE8ED] pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#07865B]" />
              <h3 className="text-sm font-bold text-[#172B36]">
                Penjelasan Botani Meta Llama
              </h3>
            </div>
            <span className="text-[10px] bg-[#E5F5EE] px-2 py-0.5 rounded text-[#066B49] font-semibold border border-[#B8E2D1]">
              Sintesis Reasoning AI Terikat Fakta
            </span>
          </div>

          <p className="text-xs md:text-sm text-[#172B36] leading-relaxed pt-1">
            {currentRecord.llamaExplanation}
          </p>

          <div className="pt-2 border-t border-[#DCE8ED] flex flex-wrap items-center justify-between text-[11px] text-[#647985] gap-2">
            <span>
              Basis Penjelasan: Kandidat Mesin Identifikasi, Referensi Wikipedia & Wikidata
            </span>
            <span className="text-[#07865B] font-medium">
              *Edukasi keanekaragaman hayati — bukan saran medis klinis
            </span>
          </div>
        </div>
      )}

      {/* Bottom Panels (2 Columns: Kandidat Lain & Skor Gabungan) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Column: Kandidat Lain */}
        <div className="md:col-span-7 bg-white border border-[#DCE8ED] rounded-lg p-5 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs md:text-sm font-bold text-[#172B36]">
              Daftar Kandidat Spesies Alternatif
            </h3>
            <span className="text-[10px] text-[#647985]">Probabilitas Relatif Model</span>
          </div>

          <div className="space-y-3">
            {currentRecord.otherCandidates.map((cand, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#F7FAFC] border border-[#DCE8ED] text-[#647985] text-[10px] flex items-center justify-center font-semibold">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-[#172B36] italic">
                      {cand.scientificName}
                    </span>
                  </div>
                  <span className="font-semibold text-[#07865B]">{cand.confidence}%</span>
                </div>
                {/* Horizontal Progress Bar */}
                <div className="w-full h-2 rounded-full bg-[#E5F5EE] overflow-hidden">
                  <div
                    className="h-full bg-[#07865B] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, cand.confidence)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-[#647985] pt-2 border-t border-[#DCE8ED]">
            *Kandidat alternatif ditampilkan jika terdapat kemiripan morfologi organ antara beberapa spesies kerabat.
          </p>
        </div>

        {/* Right Column: Lokasi yang Digunakan & Skor Gabungan */}
        <div className="md:col-span-5 space-y-4">
          {/* Card: Lokasi yang Digunakan */}
          <div className="bg-white border border-[#DCE8ED] rounded-lg p-4 shadow-xs space-y-2">
            <div className="text-xs font-semibold text-[#647985]">Lokasi yang Digunakan</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#E5F5EE] text-[#07865B] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                {isEditingLocation ? (
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setIsEditingLocation(false);
                    }}
                    autoFocus
                    className="text-xs border border-[#07865B] rounded px-2 py-1 w-32"
                  />
                ) : (
                  <span className="text-sm font-bold text-[#172B36]">{locationName}</span>
                )}
              </div>
              <button
                onClick={() => setIsEditingLocation(!isEditingLocation)}
                className="text-xs text-[#07865B] font-semibold hover:underline cursor-pointer"
              >
                {isEditingLocation ? 'Simpan' : 'Ubah Lokasi'}
              </button>
            </div>
          </div>

          {/* Card: Skor Gabungan */}
          <div className="bg-white border border-[#DCE8ED] rounded-lg p-4 shadow-xs space-y-3">
            <div className="text-xs font-semibold text-[#647985]">Skor Gabungan Multimodal</div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#647985]">Kesesuaian Visual Citra</span>
                <span className="font-semibold text-[#172B36]">
                  {currentRecord.visualScore}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#647985]">Kesesuaian Prior Geografis</span>
                <span className="font-semibold text-[#172B36]">
                  {currentRecord.geographicScore}%
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#DCE8ED] flex items-baseline justify-between">
              <span className="text-xs font-bold text-[#172B36]">Final Score</span>
              <span className="text-2xl font-black text-[#07865B]">
                {currentRecord.finalScore}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Meta Llama Chatbot Drawer */}
      <PlantScanChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialQuestion={chatInitialQuestion}
        plantContext={{
          scientificName: currentRecord.scientificName,
          commonName: referenceData?.common_name || currentRecord.localName,
          family: referenceData?.taxonomy?.family || currentRecord.family,
          genus: referenceData?.taxonomy?.genus || currentRecord.genus,
          confidence: currentRecord.confidence,
          candidates: currentRecord.otherCandidates,
          location: currentRecord.location
        }}
      />
    </div>
  );
};

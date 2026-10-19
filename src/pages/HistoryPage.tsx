import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Trash2,
  ScanLine,
  ChevronDown,
  AlertTriangle,
  RotateCcw,
  X,
} from 'lucide-react';
import { historyService } from '../services/historyService';
import type { AnalysisRecord } from '../types';
import { useToast } from '../components/common/Toast';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [history, setHistory] = useState<AnalysisRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [plantFilter, setPlantFilter] = useState('Semua');
  const [conditionFilter, setConditionFilter] = useState('Semua');

  // Modal confirmation state
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<AnalysisRecord | null>(null);

  useEffect(() => {
    setHistory(historyService.getAll());
  }, []);

  const confirmDeleteSingle = (record: AnalysisRecord, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecordToDelete(record);
  };

  const executeDeleteSingle = () => {
    if (!recordToDelete) return;
    historyService.deleteRecord(recordToDelete.id);
    setHistory(historyService.getAll());
    showToast(`Catatan analisis ${recordToDelete.plant} berhasil dihapus.`);
    setRecordToDelete(null);
  };

  const executeDeleteAll = () => {
    const totalCount = history.length;
    historyService.clearAll();
    setHistory([]);
    setIsDeleteAllModalOpen(false);
    showToast(`Seluruh (${totalCount}) riwayat analisis berhasil dihapus.`);
  };

  const handleResetSampleData = () => {
    historyService.resetToDefault();
    setHistory(historyService.getAll());
    showToast('Sampel data riwayat berhasil dipulihkan.');
  };

  const filteredList = history.filter((item) => {
    const matchesQuery =
      item.plant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.disease && item.disease.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPlant =
      plantFilter === 'Semua' ? true : item.plant.toLowerCase() === plantFilter.toLowerCase();

    const matchesCondition =
      conditionFilter === 'Semua'
        ? true
        : conditionFilter === 'Sehat'
        ? item.condition === 'healthy'
        : item.condition === 'diseased';

    return matchesQuery && matchesPlant && matchesCondition;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17352E] tracking-tight">
            Riwayat Analisis
          </h1>
          <p className="text-sm text-[#6B7C76] mt-1">
            Berikut adalah semua riwayat analisis tanaman yang pernah Anda lakukan.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Hapus Semua Riwayat Button */}
          {history.length > 0 && (
            <button
              onClick={() => setIsDeleteAllModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 bg-white hover:bg-red-50 text-[#EF4444] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Hapus Semua Riwayat</span>
            </button>
          )}

          {/* Analisis Baru Button */}
          <button
            onClick={() => navigate('/analisis')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#008F63] hover:bg-[#007652] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer w-fit"
          >
            <ScanLine className="w-4 h-4" />
            <span>Analisis Baru</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="app-card-static bg-white p-4 sm:p-5 rounded-2xl border border-[#E4ECE8] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#6B7C76] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tanaman, penyakit..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E4ECE8] bg-white text-xs sm:text-sm text-[#17352E] placeholder-[#6B7C76]/60 focus:outline-none focus:ring-2 focus:ring-[#008F63] focus:border-transparent transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={plantFilter}
              onChange={(e) => setPlantFilter(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl border border-[#E4ECE8] bg-white text-xs sm:text-sm font-medium text-[#17352E] focus:outline-none focus:ring-2 focus:ring-[#008F63] cursor-pointer"
            >
              <option value="Semua">Semua Tanaman</option>
              <option value="Cabai">Cabai</option>
              <option value="Tomat">Tomat</option>
              <option value="Terong">Terong</option>
              <option value="Sawi">Sawi</option>
              <option value="Kangkung">Kangkung</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6B7C76] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative flex-1 sm:flex-initial">
            <select
              value={conditionFilter}
              onChange={(e) => setConditionFilter(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl border border-[#E4ECE8] bg-white text-xs sm:text-sm font-medium text-[#17352E] focus:outline-none focus:ring-2 focus:ring-[#008F63] cursor-pointer"
            >
              <option value="Semua">Semua Kondisi</option>
              <option value="Sehat">Sehat</option>
              <option value="Terindikasi Penyakit">Terindikasi Penyakit</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6B7C76] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="app-card-static bg-white rounded-2xl border border-[#E4ECE8] overflow-hidden">
        {filteredList.length === 0 ? (
          <div className="text-center py-16 px-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E8F7F1] text-[#008F63] flex items-center justify-center mx-auto">
              <ScanLine className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#17352E]">Belum Ada Analisis</h3>
              <p className="text-xs sm:text-sm text-[#6B7C76] mt-1 max-w-sm mx-auto">
                {searchQuery || plantFilter !== 'Semua' || conditionFilter !== 'Semua'
                  ? 'Tidak ada riwayat yang cocok dengan filter yang dipilih.'
                  : 'Mulai analisis tanaman pertama Anda sekarang atau pulihkan sampel data.'}
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigate('/analisis')}
                className="px-5 py-2.5 rounded-xl bg-[#008F63] hover:bg-[#007652] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                Mulai Analisis
              </button>

              <button
                onClick={handleResetSampleData}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E4ECE8] bg-white hover:bg-[#F3FBF7] text-[#17352E] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#008F63]" />
                <span>Pulihkan Data Sampel</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E4ECE8] bg-[#F8FAF9]/80 text-[11px] font-bold text-[#6B7C76] uppercase tracking-wider">
                  <th className="py-4 px-6">Tanggal</th>
                  <th className="py-4 px-4">Gambar</th>
                  <th className="py-4 px-6">Tanaman</th>
                  <th className="py-4 px-6">Kondisi</th>
                  <th className="py-4 px-6">Confidence</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4ECE8] text-xs sm:text-sm">
                {filteredList.map((item) => {
                  const isHealthy = item.condition === 'healthy';
                  return (
                    <tr
                      key={item.id}
                      onClick={() => navigate(`/analisis/${item.id}`)}
                      className="hover:bg-[#F3FBF7]/60 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-6 text-[#6B7C76] font-medium whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                        <span className="block text-[11px] text-[#9CA3AF]">
                          {new Date(item.createdAt).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <img
                          src={item.image}
                          alt={item.plant}
                          className="w-12 h-12 rounded-xl object-cover ring-1 ring-[#E4ECE8] group-hover:scale-105 transition-transform"
                        />
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-bold text-[#17352E]">{item.plant}</div>
                        <div className="text-[11px] text-[#6B7C76] italic font-normal">
                          {item.scientificName}
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                            isHealthy
                              ? 'bg-[#E8F7F1] text-[#008F63]'
                              : item.disease === 'Early Blight'
                              ? 'bg-red-50 text-[#EF4444]'
                              : 'bg-amber-50 text-[#D97706]'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isHealthy
                                ? 'bg-[#008F63]'
                                : item.disease === 'Early Blight'
                                ? 'bg-[#EF4444]'
                                : 'bg-[#D97706]'
                            }`}
                          ></span>
                          <span>{isHealthy ? 'Sehat' : item.disease || 'Terindikasi Penyakit'}</span>
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <span className="font-bold text-[#17352E]">
                          {item.confidence.toFixed(1)}%
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/analisis/${item.id}`);
                            }}
                            className="px-3.5 py-1.5 rounded-lg border border-[#E4ECE8] group-hover:border-[#008F63] group-hover:text-[#008F63] text-xs font-semibold text-[#17352E] transition-all bg-white cursor-pointer"
                          >
                            Detail
                          </button>

                          <button
                            onClick={(e) => confirmDeleteSingle(item, e)}
                            className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#EF4444] hover:bg-red-50 transition-colors cursor-pointer"
                            title="Hapus riwayat"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal: Hapus Semua Riwayat */}
      {isDeleteAllModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#E4ECE8] shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-[#EF4444]">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <button
                onClick={() => setIsDeleteAllModalOpen(false)}
                className="p-1.5 rounded-xl text-[#6B7C76] hover:text-[#17352E] hover:bg-[#F8FAF9] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#17352E]">
                Hapus Semua Riwayat?
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7C76] mt-2 leading-relaxed">
                Tindakan ini akan menghapus permanen seluruh <strong>{history.length} catatan analisis</strong> Anda.
                Data yang telah dihapus tidak dapat dipulihkan kembali.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsDeleteAllModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-[#E4ECE8] text-[#17352E] hover:bg-[#F8FAF9] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={executeDeleteAll}
                className="px-5 py-2.5 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                Ya, Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Hapus Satuan */}
      {recordToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#E4ECE8] shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-[#EF4444]">
                <Trash2 className="w-6 h-6" />
              </div>
              <button
                onClick={() => setRecordToDelete(null)}
                className="p-1.5 rounded-xl text-[#6B7C76] hover:text-[#17352E] hover:bg-[#F8FAF9] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#17352E]">
                Hapus Catatan Ini?
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7C76] mt-2 leading-relaxed">
                Apakah Anda yakin ingin menghapus hasil analisis untuk <strong>{recordToDelete.plant}</strong> ({recordToDelete.scientificName})?
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setRecordToDelete(null)}
                className="px-5 py-2.5 rounded-xl border border-[#E4ECE8] text-[#17352E] hover:bg-[#F8FAF9] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={executeDeleteSingle}
                className="px-5 py-2.5 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

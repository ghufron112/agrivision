import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Trash2,
  RotateCcw,
  Search,
  AlertTriangle,
  Sparkles,
  Inbox
} from 'lucide-react';
import { historyService } from '../services/historyService';
import type { IdentificationRecord } from '../types/plant';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState<IdentificationRecord[]>(() =>
    historyService.getHistory()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Filter based on search query
  const filteredHistory = historyList.filter(
    (item) =>
      item.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.localName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDetail = (record: IdentificationRecord) => {
    navigate('/hasil', { state: { recordId: record.id } });
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      const updated = historyService.deleteRecord(deleteTargetId);
      setHistoryList(updated);
      setDeleteTargetId(null);
    }
  };

  const handleResetDemoHistory = () => {
    const updated = historyService.resetHistory();
    setHistoryList(updated);
    setIsResetConfirmOpen(false);
  };

  const handleClearAll = () => {
    const updated = historyService.clearHistory();
    setHistoryList(updated);
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-[#172B36]">Riwayat Identifikasi</h1>
          <p className="text-xs text-[#647985]">
            Daftar catatan identifikasi tersimpan di penyimpanan lokal perangkat Anda
          </p>
        </div>

        <div className="flex items-center gap-2">
          {historyList.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-2.5 py-1.5 rounded-md border border-[#DCE8ED] bg-white hover:bg-red-50 text-xs font-semibold text-[#647985] hover:text-red-600 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Kosongkan</span>
            </button>
          )}

          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="px-2.5 py-1.5 rounded-md border border-[#DCE8ED] bg-white hover:bg-[#F7FAFC] text-xs font-semibold text-[#647985] hover:text-[#172B36] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={() => navigate('/identifikasi')}
            className="px-3 py-1.5 rounded-md bg-[#07865B] hover:bg-[#066B49] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Identifikasi Baru</span>
          </button>
        </div>
      </div>

      {/* Search Filter Bar */}
      <div className="bg-white border border-[#DCE8ED] rounded-lg p-3 shadow-xs flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#647985] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan nama tanaman atau lokasi..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAFCFB] border border-[#DCE8ED] rounded-md focus:outline-none focus:border-[#07865B]"
          />
        </div>

        <div className="text-xs text-[#647985] hidden sm:block">
          Total: <b>{filteredHistory.length}</b> catatan
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-[#DCE8ED] rounded-lg shadow-xs overflow-hidden">
        {filteredHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAFCFB] border-b border-[#DCE8ED] text-[11px] font-semibold text-[#647985] uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">No</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4 w-20">Foto</th>
                  <th className="py-3 px-4">Hasil Identifikasi</th>
                  <th className="py-3 px-4">Lokasi</th>
                  <th className="py-3 px-4 w-28 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE8ED] text-xs">
                {filteredHistory.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#F7FAFC] transition-colors group"
                  >
                    <td className="py-3 px-4 text-center font-medium text-[#647985]">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 font-medium text-[#172B36] whitespace-nowrap">
                      {item.dateFormatted}
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 rounded-md overflow-hidden border border-[#DCE8ED] bg-slate-100 shadow-2xs">
                        <img
                          src={item.photoUrl}
                          alt={item.scientificName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#172B36] italic">
                        {item.scientificName}
                      </div>
                      <div className="text-[11px] text-[#647985]">
                        {item.localName} • {item.confidence}% akurasi
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#172B36] font-medium whitespace-nowrap">
                      {item.location}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenDetail(item)}
                          className="px-3 py-1 rounded bg-[#07865B] hover:bg-[#066B49] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                        >
                          Lihat
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(item.id)}
                          title="Hapus Catatan"
                          className="p-1 rounded text-[#647985] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#E5F5EE] text-[#07865B] flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6" />
            </div>
            <div className="text-sm font-bold text-[#172B36]">Belum Ada Riwayat</div>
            <p className="text-xs text-[#647985] max-w-sm mx-auto">
              {searchQuery
                ? 'Tidak ada hasil identifikasi yang cocok dengan kata kunci pencarian Anda.'
                : 'Mulai identifikasi tanaman pertama Anda untuk menyimpan catatan botani.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => (searchQuery ? setSearchQuery('') : navigate('/identifikasi'))}
                className="px-4 py-2 rounded-md bg-[#07865B] hover:bg-[#066B49] text-white text-xs font-semibold shadow-xs"
              >
                {searchQuery ? 'Hapus Pencarian' : 'Mulai Identifikasi Sekarang'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#DCE8ED] rounded-lg max-w-sm w-full p-5 shadow-lg space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#172B36]">Hapus Catatan?</h3>
                <p className="text-xs text-[#647985]">
                  Catatan identifikasi ini akan dihapus dari riwayat lokal perangkat.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="px-3 py-1.5 text-xs font-semibold text-[#647985] hover:text-[#172B36] border border-[#DCE8ED] rounded-md hover:bg-[#F7FAFC]"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md shadow-xs"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Demo Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#DCE8ED] rounded-lg max-w-sm w-full p-5 shadow-lg space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E5F5EE] text-[#07865B] flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#172B36]">Kembalikan 5 Data Demo?</h3>
                <p className="text-xs text-[#647985]">
                  Riwayat akan diisi ulang dengan data simulasi awal (Kelor, Kembang Sepatu, Jambu, Sirsak, Pepaya).
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-3 py-1.5 text-xs font-semibold text-[#647985] hover:text-[#172B36] border border-[#DCE8ED] rounded-md hover:bg-[#F7FAFC]"
              >
                Batal
              </button>
              <button
                onClick={handleResetDemoHistory}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#07865B] hover:bg-[#066B49] rounded-md shadow-xs"
              >
                Reset Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import type { IdentificationRecord } from '../types/plant';
import { initialDemoHistory } from '../data/demoHistory';

const STORAGE_KEY = 'plantscan_identification_history_v1';

export const historyService = {
  getHistory: (): IdentificationRecord[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDemoHistory));
        return initialDemoHistory;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Gagal membaca riwayat dari LocalStorage', e);
      return initialDemoHistory;
    }
  },

  getRecordById: (id: string): IdentificationRecord | undefined => {
    const list = historyService.getHistory();
    return list.find((item) => item.id === id);
  },

  addRecord: (record: IdentificationRecord): IdentificationRecord[] => {
    try {
      const current = historyService.getHistory();
      // Ensure we don't save huge data URLs if photoUrl is a raw uncompressed file
      const updated = [record, ...current].slice(0, 30); // limit to 30 records
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Gagal menyimpan riwayat ke LocalStorage', e);
      return historyService.getHistory();
    }
  },

  deleteRecord: (id: string): IdentificationRecord[] => {
    try {
      const current = historyService.getHistory();
      const filtered = current.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return filtered;
    } catch (e) {
      console.error('Gagal menghapus riwayat dari LocalStorage', e);
      return historyService.getHistory();
    }
  },

  resetHistory: (): IdentificationRecord[] => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDemoHistory));
      return initialDemoHistory;
    } catch (e) {
      console.error('Gagal me-reset riwayat ke demo awal', e);
      return initialDemoHistory;
    }
  },

  clearHistory: (): IdentificationRecord[] => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    } catch (e) {
      console.error('Gagal mengosongkan riwayat', e);
      return [];
    }
  }
};

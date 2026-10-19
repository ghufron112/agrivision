import type { AnalysisRecord } from '../types';
import { mockHistory } from '../data/mockData';

const STORAGE_KEY = 'agrivision_history_v1';

class HistoryService {
  private getInitialData(): AnalysisRecord[] {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved history', e);
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockHistory));
    return mockHistory;
  }

  public getAll(): AnalysisRecord[] {
    return this.getInitialData();
  }

  public getById(id: string): AnalysisRecord | undefined {
    const list = this.getAll();
    return list.find((item) => item.id === id);
  }

  public addRecord(record: AnalysisRecord): void {
    const list = this.getAll();
    const updated = [record, ...list];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  public deleteRecord(id: string): void {
    const list = this.getAll();
    const updated = list.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  public clearAll(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }

  public resetToDefault(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockHistory));
  }

  public getStats() {
    const list = this.getAll();
    const total = list.length;
    const uniquePlants = new Set(list.map((item) => item.plant)).size;
    const diseased = list.filter((item) => item.condition === 'diseased').length;
    const healthy = list.filter((item) => item.condition === 'healthy').length;
    const unrecognized = list.filter((item) => item.condition === 'unrecognized').length;

    const plantCounts: { [key: string]: number } = {};
    list.forEach((item) => {
      plantCounts[item.plant] = (plantCounts[item.plant] || 0) + 1;
    });

    const plantDistribution = Object.entries(plantCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return {
      total,
      uniquePlants,
      diseased,
      healthy,
      unrecognized,
      plantDistribution,
    };
  }
}

export const historyService = new HistoryService();

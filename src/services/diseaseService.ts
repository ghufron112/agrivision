import type { Disease } from '../types';
import { mockDiseases } from '../data/mockData';

class DiseaseService {
  public getAll(): Disease[] {
    return mockDiseases;
  }

  public getById(id: string): Disease | undefined {
    return mockDiseases.find(
      (d) => d.id.toLowerCase() === id.toLowerCase() || d.name.toLowerCase() === id.toLowerCase()
    );
  }

  public search(query: string): Disease[] {
    return mockDiseases.filter(
      (d) =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        (d.scientificName && d.scientificName.toLowerCase().includes(query.toLowerCase())) ||
        d.vulnerablePlants.some((p) => p.toLowerCase().includes(query.toLowerCase()))
    );
  }
}

export const diseaseService = new DiseaseService();

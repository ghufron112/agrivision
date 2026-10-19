import type { Plant } from '../types';
import { mockPlants } from '../data/mockData';

class PlantService {
  public getAll(): Plant[] {
    return mockPlants;
  }

  public getById(id: string): Plant | undefined {
    return mockPlants.find(
      (p) => p.id.toLowerCase() === id.toLowerCase() || p.name.toLowerCase() === id.toLowerCase()
    );
  }

  public search(query: string, category?: string): Plant[] {
    return mockPlants.filter((plant) => {
      const matchQuery =
        plant.name.toLowerCase().includes(query.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(query.toLowerCase());
      const matchCat = category && category !== 'Semua' ? plant.category === category : true;
      return matchQuery && matchCat;
    });
  }
}

export const plantService = new PlantService();

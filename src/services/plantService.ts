import { demoPlants } from '../data/demoPlants';
import type { Plant } from '../types/plant';

export const plantService = {
  getAllPlants: (): Plant[] => {
    return demoPlants;
  },

  getPlantBySlug: (slug: string): Plant | undefined => {
    return demoPlants.find((p) => p.slug === slug || p.id === slug);
  },

  getPlantById: (id: string): Plant | undefined => {
    return demoPlants.find((p) => p.id === id || p.slug === id);
  },

  searchPlants: (query: string): Plant[] => {
    const q = query.toLowerCase().trim();
    if (!q) return demoPlants;
    return demoPlants.filter(
      (p) =>
        p.scientificName.toLowerCase().includes(q) ||
        p.localName.toLowerCase().includes(q) ||
        p.family.toLowerCase().includes(q) ||
        p.genus.toLowerCase().includes(q)
    );
  }
};

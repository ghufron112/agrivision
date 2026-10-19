export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  createdAt: string;
}

export type PlantCondition = 'healthy' | 'diseased' | 'unrecognized';

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  description: string;
  image: string;
  waterRequirement: string;
  lightRequirement: string;
  temperature: string;
  commonDiseases: string[];
  tips: string[];
  interestingFact: string;
}

export interface Disease {
  id: string;
  name: string;
  scientificName?: string;
  riskLevel: 'Rendah' | 'Sedang' | 'Tinggi';
  description: string;
  symptoms: string[];
  causes: string[];
  vulnerablePlants: string[];
  prevention: string[];
  treatment: string[];
  image: string;
}

export interface AnalysisRecord {
  id: string;
  userId: string;
  image: string;
  plant: string;
  scientificName: string;
  category: string;
  confidence: number;
  condition: PlantCondition;
  disease?: string | null;
  symptoms?: string[];
  recommendations: string[];
  lightRequirement?: string;
  waterRequirement?: string;
  temperature?: string;
  createdAt: string;
  note?: string;
}

export type ObservationStatus = 'Tercatat' | 'Kemungkinan' | 'Tidak Tercatat';

export interface PlantDistributionRegion {
  region: string;
  status: ObservationStatus;
  lat: number;
  lng: number;
  observationCount?: number;
  notes?: string;
}

export interface PlantTaxonomy {
  kingdom: string;
  division: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  species: string;
}

export interface PlantReferenceData {
  scientific_name: string;
  common_name?: string | null;
  description: string;
  taxonomy: {
    kingdom?: string;
    division?: string;
    class?: string;
    order?: string;
    family?: string;
    genus?: string;
    species?: string;
    [key: string]: string | undefined;
  };
  image_url?: string | null;
  image_attribution?: string | null;
  wikipedia_url?: string | null;
  wikidata_url?: string | null;
  wikidata_id?: string | null;
  gbif_url?: string | null;
  powo_url?: string | null;
  sources: string[];
  fetch_date: string;
  license_note: string;
  data_status: string;
}

export interface Plant {
  id: string;
  slug: string;
  scientificName: string;
  localName: string;
  family: string;
  genus: string;
  images: string[];
  description: string;
  type: string;
  height: string;
  leaves: string;
  flowers: string;
  habitat: string;
  altitude: string;
  lifecycle: string;
  partsUsed: string;
  origin: string;
  benefits: string[];
  recordedInEastJava: boolean;
  distributionText: string;
  distributionRegions: PlantDistributionRegion[];
  taxonomy: PlantTaxonomy;
  referenceData?: PlantReferenceData;
}

export interface CandidatePrediction {
  scientificName: string;
  confidence: number;
}

export interface IdentificationRecord {
  id: string;
  date: string;
  dateFormatted: string;
  photoUrl: string;
  scientificName: string;
  localName: string;
  family: string;
  genus: string;
  location: string;
  confidence: number;
  visualScore: number;
  geographicScore: number;
  finalScore: number;
  otherCandidates: CandidatePrediction[];
  plantSlug?: string;
  isSimulation?: boolean;
  modeUsed?: 'plantnet_api' | 'local_model' | 'fallback_calibrated';
  confidenceWarning?: string | null;
  llamaExplanation?: string | null;
  referenceData?: PlantReferenceData | null;
  sourceReference?: string;
}

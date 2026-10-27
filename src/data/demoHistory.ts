import type { IdentificationRecord } from '../types/plant';

export const initialDemoHistory: IdentificationRecord[] = [
  {
    id: 'hist-1',
    date: '2025-05-12T10:14:00Z',
    dateFormatted: '12 Mei 2025',
    photoUrl: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=400&q=80',
    scientificName: 'Moringa oleifera',
    localName: 'Kelor',
    family: 'Moringaceae',
    genus: 'Moringa',
    location: 'Jawa Timur',
    confidence: 92,
    visualScore: 72,
    geographicScore: 16,
    finalScore: 88,
    plantSlug: 'moringa-oleifera',
    isSimulation: true,
    otherCandidates: [
      { scientificName: 'Moringa oleifera', confidence: 92 },
      { scientificName: 'Moringa peregrina', confidence: 5 },
      { scientificName: 'Leucaena leucocephala', confidence: 3 },
      { scientificName: 'Sesbania grandiflora', confidence: 1 }
    ]
  },
  {
    id: 'hist-2',
    date: '2025-05-10T14:30:00Z',
    dateFormatted: '10 Mei 2025',
    photoUrl: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=400&q=80',
    scientificName: 'Hibiscus rosa-sinensis',
    localName: 'Kembang Sepatu',
    family: 'Malvaceae',
    genus: 'Hibiscus',
    location: 'Jawa Timur',
    confidence: 89,
    visualScore: 74,
    geographicScore: 15,
    finalScore: 89,
    plantSlug: 'hibiscus-rosa-sinensis',
    isSimulation: true,
    otherCandidates: [
      { scientificName: 'Hibiscus rosa-sinensis', confidence: 89 },
      { scientificName: 'Hibiscus syriacus', confidence: 6 },
      { scientificName: 'Abelmoschus esculentus', confidence: 3 },
      { scientificName: 'Malva sylvestris', confidence: 2 }
    ]
  },
  {
    id: 'hist-3',
    date: '2025-05-08T09:20:00Z',
    dateFormatted: '8 Mei 2025',
    photoUrl: 'https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?auto=format&fit=crop&w=400&q=80',
    scientificName: 'Psidium guajava',
    localName: 'Jambu Biji',
    family: 'Myrtaceae',
    genus: 'Psidium',
    location: 'Jawa Timur',
    confidence: 94,
    visualScore: 75,
    geographicScore: 18,
    finalScore: 93,
    plantSlug: 'psidium-guajava',
    isSimulation: true,
    otherCandidates: [
      { scientificName: 'Psidium guajava', confidence: 94 },
      { scientificName: 'Psidium cattleyanum', confidence: 4 },
      { scientificName: 'Syzygium aqueum', confidence: 2 }
    ]
  },
  {
    id: 'hist-4',
    date: '2025-05-05T16:45:00Z',
    dateFormatted: '5 Mei 2025',
    photoUrl: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=400&q=80',
    scientificName: 'Annona muricata',
    localName: 'Sirsak',
    family: 'Annonaceae',
    genus: 'Annona',
    location: 'Jawa Timur',
    confidence: 88,
    visualScore: 71,
    geographicScore: 15,
    finalScore: 86,
    plantSlug: 'annona-muricata',
    isSimulation: true,
    otherCandidates: [
      { scientificName: 'Annona muricata', confidence: 88 },
      { scientificName: 'Annona squamosa', confidence: 8 },
      { scientificName: 'Annona reticulata', confidence: 4 }
    ]
  },
  {
    id: 'hist-5',
    date: '2025-05-02T11:05:00Z',
    dateFormatted: '2 Mei 2025',
    photoUrl: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=400&q=80',
    scientificName: 'Carica papaya',
    localName: 'Pepaya',
    family: 'Caricaceae',
    genus: 'Carica',
    location: 'Jawa Timur',
    confidence: 95,
    visualScore: 78,
    geographicScore: 16,
    finalScore: 94,
    plantSlug: 'carica-papaya',
    isSimulation: true,
    otherCandidates: [
      { scientificName: 'Carica papaya', confidence: 95 },
      { scientificName: 'Vasconcellea pubescens', confidence: 3 },
      { scientificName: 'Jacaratia spinosa', confidence: 2 }
    ]
  }
];

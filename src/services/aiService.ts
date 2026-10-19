import type { AnalysisRecord } from '../types';
import { historyService } from './historyService';

export interface AIPredictionResponse {
  plant: string;
  scientificName: string;
  category: string;
  confidence: number;
  condition: 'healthy' | 'diseased' | 'unrecognized';
  disease?: string | null;
  symptoms?: string[];
  recommendations: string[];
  lightRequirement?: string;
  waterRequirement?: string;
  temperature?: string;
}

export interface ProcessingStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  description: string;
}

class AIService {
  private apiBaseUrl: string = import.meta.env.VITE_AI_API_URL || '';

  public validateImage(file: File): { valid: boolean; error?: string } {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Format gambar tidak didukung. Gunakan JPG, JPEG, PNG, atau WEBP.',
      };
    }

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      return {
        valid: false,
        error: 'Ukuran file terlalu besar. Maksimum 5MB.',
      };
    }

    return { valid: true };
  }

  public async analyzePlantImage(
    imageDataUrl: string,
    mode: 'auto' | 'healthy' | 'diseased' = 'auto'
  ): Promise<AnalysisRecord> {
    if (this.apiBaseUrl) {
      try {
        const response = await fetch(`${this.apiBaseUrl}/api/v1/predict`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imageDataUrl }),
        });
        if (response.ok) {
          const remoteResult = await response.json();
          const newRecord: AnalysisRecord = {
            id: `anl-${Date.now()}`,
            userId: 'usr-01',
            image: imageDataUrl,
            ...remoteResult,
            createdAt: new Date().toISOString(),
          };
          historyService.addRecord(newRecord);
          return newRecord;
        }
      } catch (err) {
        console.warn('FastAPI backend not reachable, falling back to local AI engine mock', err);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 600));

    const isDiseased = mode === 'diseased' || (mode === 'auto' && Math.random() < 0.45);

    let prediction: AIPredictionResponse;

    if (isDiseased) {
      prediction = {
        plant: 'Tomat',
        scientificName: 'Solanum lycopersicum',
        category: 'Tanaman Hortikultura',
        confidence: 91.3,
        condition: 'diseased',
        disease: 'Early Blight',
        symptoms: [
          'Bercak coklat pada daun',
          'Perubahan warna daun',
          'Kerusakan jaringan daun',
        ],
        recommendations: [
          'Segera pisahkan bagian tanaman yang terinfeksi.',
          'Gunakan fungisida sesuai dosis.',
          'Perbaiki sirkulasi udara di sekitar tanaman.',
          'Hindari penyiraman langsung pada daun.',
        ],
        lightRequirement: 'Tinggi',
        waterRequirement: 'Sedang (hindari kelembaban berlebih)',
        temperature: '20–27°C',
      };
    } else {
      prediction = {
        plant: 'Cabai',
        scientificName: 'Capsicum annuum',
        category: 'Tanaman Hortikultura',
        confidence: 94.7,
        condition: 'healthy',
        disease: null,
        symptoms: [],
        recommendations: [
          'Pertahankan penyiraman secara teratur.',
          'Pastikan tanaman mendapatkan cukup sinar matahari.',
          'Lakukan pemupukan berkala.',
        ],
        lightRequirement: 'Tinggi',
        waterRequirement: 'Sedang',
        temperature: '20–30°C',
      };
    }

    const newRecord: AnalysisRecord = {
      id: `anl-${Date.now()}`,
      userId: 'usr-01',
      image: imageDataUrl,
      ...prediction,
      createdAt: new Date().toISOString(),
    };

    historyService.addRecord(newRecord);
    return newRecord;
  }
}

export const aiService = new AIService();

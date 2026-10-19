import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import { aiService } from '../services/aiService';
import { useToast } from '../components/common/Toast';

export const AnalysisProcessPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [progress, setProgress] = useState(15);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    { id: 'upload', name: 'Upload', desc: 'Selesai' },
    { id: 'preprocess', name: 'Preprocessing', desc: 'Normalisasi Citra' },
    { id: 'ai', name: 'AI Analysis', desc: 'Ekstraksi Fitur' },
    { id: 'prediction', name: 'Prediction', desc: 'Klasifikasi Model' },
    { id: 'result', name: 'Hasil', desc: 'Generasi Rekomendasi' },
  ];

  useEffect(() => {
    const rawImage =
      sessionStorage.getItem('agri_current_image') ||
      'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80';
    const rawMode = (sessionStorage.getItem('agri_current_mode') as 'auto' | 'healthy' | 'diseased') || 'auto';

    // Simulated multi-stage AI inference timeline
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 5;
        if (next >= 85) setCurrentStepIndex(4);
        else if (next >= 65) setCurrentStepIndex(3);
        else if (next >= 40) setCurrentStepIndex(2);
        else if (next >= 20) setCurrentStepIndex(1);
        return next;
      });
    }, 140);

    // Call aiService
    const timer = setTimeout(async () => {
      try {
        const result = await aiService.analyzePlantImage(rawImage, rawMode);
        showToast('Analisis selesai! Membuka hasil...');
        navigate(`/analisis/${result.id}`, { replace: true });
      } catch (err) {
        showToast('Terjadi kesalahan saat memproses gambar.', 'error');
        navigate('/analisis');
      }
    }, 3400);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate, showToast]);

  // Circular progress calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/analisis')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B7C76] hover:text-[#008F63] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>
      </div>

      {/* Main Process Card */}
      <div className="app-card-static bg-white rounded-3xl p-8 sm:p-14 border border-[#E4ECE8] text-center space-y-12">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17352E] tracking-tight">
            Menganalisis Tanaman
          </h1>
          <p className="text-sm text-[#6B7C76] mt-2">
            Mohon tunggu, AI sedang memproses gambar Anda.
          </p>
        </div>

        {/* Circular Progress Gauge */}
        <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            {/* Background track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#E8F7F1"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Animated Progress track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#008F63"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-200 ease-out"
            />
          </svg>

          {/* Center Percentage Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-[#17352E]">
              {progress}%
            </span>
            <span className="text-[11px] font-semibold text-[#008F63] mt-0.5">
              Proses AI
            </span>
          </div>
        </div>

        {/* Horizontal Timeline Stepper */}
        <div className="pt-6 border-t border-[#E4ECE8]">
          <div className="flex items-center justify-between relative max-w-2xl mx-auto">
            {/* Connecting line */}
            <div className="absolute top-5 left-6 right-6 h-0.5 bg-[#E4ECE8] -z-0"></div>
            <div
              className="absolute top-5 left-6 h-0.5 bg-[#008F63] -z-0 transition-all duration-300"
              style={{ width: `${(currentStepIndex / (steps.length - 1)) * 90}%` }}
            ></div>

            {steps.map((step, idx) => {
              const isDone = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isDone
                        ? 'bg-[#008F63] text-white shadow-xs'
                        : isCurrent
                        ? 'bg-[#E8F7F1] text-[#008F63] ring-4 ring-[#008F63]/20 border-2 border-[#008F63]'
                        : 'bg-[#F8FAF9] text-[#9CA3AF] border border-[#E4ECE8]'
                    }`}
                  >
                    {isDone ? (
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    ) : isCurrent ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#9CA3AF]" />
                    )}
                  </div>

                  <span
                    className={`text-xs font-bold mt-2.5 ${
                      isDone || isCurrent ? 'text-[#17352E]' : 'text-[#9CA3AF]'
                    }`}
                  >
                    {step.name}
                  </span>

                  <span className="text-[10px] text-[#6B7C76] font-medium hidden sm:block">
                    {isDone ? 'Selesai' : isCurrent ? 'Proses...' : 'Menunggu'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

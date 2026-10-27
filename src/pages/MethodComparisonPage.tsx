import React, { useState } from 'react';
import { CheckCircle2, BarChart2, Table } from 'lucide-react';
import { comparisonMetrics, experimentSummary } from '../data/comparisonData';
import { MethodComparisonChart } from '../components/charts/MethodComparisonChart';

export const MethodComparisonPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  // Metrik terstruktur
  const modelAData = {
    accuracy: '88.7%',
    precision: '86.3%',
    recall: '84.5%',
    f1: '85.4%'
  };

  const modelBData = {
    accuracy: '92.3%',
    precision: '90.8%',
    recall: '89.7%',
    f1: '90.2%'
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-[#172B36]">
            Hasil Perbandingan Metode
          </h1>
          <p className="text-xs text-[#647985]">
            Evaluasi empiris perbandingan model Computer Vision murni vs integrasi Spasial-Geografis
          </p>
        </div>

        {/* Disclaimer Tag */}
        <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full self-start sm:self-auto">
          Data Simulasi Penelitian
        </span>
      </div>

      {/* Two Side-by-Side Model Comparison Cards (Screen 8 exact layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Model A: Citra Saja */}
        <div className="bg-white border border-[#DCE8ED] rounded-lg p-5 shadow-xs space-y-4">
          <div>
            <h2 className="text-sm md:text-base font-bold text-[#172B36]">
              Model A: Citra Saja
            </h2>
            <p className="text-xs text-[#647985] mt-0.5">
              Menggunakan hanya gambar tanaman
            </p>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-[#DCE8ED] text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#647985]">Accuracy</span>
              <span className="font-bold text-[#172B36] text-sm">{modelAData.accuracy}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#647985]">Precision</span>
              <span className="font-bold text-[#172B36] text-sm">{modelAData.precision}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#647985]">Recall</span>
              <span className="font-bold text-[#172B36] text-sm">{modelAData.recall}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#647985]">F1-Score</span>
              <span className="font-bold text-[#172B36] text-sm">{modelAData.f1}</span>
            </div>
          </div>
        </div>

        {/* Model B: Citra + Geografis */}
        <div className="bg-white border-2 border-[#07865B]/30 rounded-lg p-5 shadow-xs space-y-4 relative">
          <div className="absolute top-3 right-3 text-[10px] font-bold text-[#07865B] bg-[#E5F5EE] px-2 py-0.5 rounded">
            Metode Diusulkan
          </div>

          <div>
            <h2 className="text-sm md:text-base font-bold text-[#07865B]">
              Model B: Citra + Geografis
            </h2>
            <p className="text-xs text-[#647985] mt-0.5">
              Menggunakan gambar + informasi lokasi
            </p>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-[#DCE8ED] text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#647985]">Accuracy</span>
              <span className="font-bold text-[#07865B] text-sm">{modelBData.accuracy}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#647985]">Precision</span>
              <span className="font-bold text-[#07865B] text-sm">{modelBData.precision}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#647985]">Recall</span>
              <span className="font-bold text-[#07865B] text-sm">{modelBData.recall}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#647985]">F1-Score</span>
              <span className="font-bold text-[#07865B] text-sm">{modelBData.f1}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Kesimpulan Card (Exact light green banner matching Screen 8) */}
      <div className="bg-[#E5F5EE] border border-[#B8E2D1] rounded-lg p-4 flex items-start gap-3 shadow-2xs">
        <div className="w-8 h-8 rounded-full bg-[#07865B] text-white flex items-center justify-center shrink-0 mt-0.5">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <div className="text-xs font-bold text-[#066B49] uppercase tracking-wider">
            Kesimpulan
          </div>
          <p className="text-xs md:text-sm font-medium text-[#172B36] leading-relaxed">
            {experimentSummary.conclusion}
          </p>
        </div>
      </div>

      {/* Interactive Visualization Section */}
      <div className="bg-white border border-[#DCE8ED] rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs md:text-sm font-bold text-[#172B36]">
            Visualisasi Metrik Evaluasi
          </div>
          <div className="flex items-center gap-1 bg-[#F7FAFC] border border-[#DCE8ED] p-0.5 rounded-md text-xs">
            <button
              onClick={() => setViewMode('chart')}
              className={`px-2.5 py-1 rounded flex items-center gap-1 font-medium transition-colors ${
                viewMode === 'chart'
                  ? 'bg-white text-[#07865B] shadow-2xs font-semibold'
                  : 'text-[#647985] hover:text-[#172B36]'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Grafik Bar</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded flex items-center gap-1 font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-[#07865B] shadow-2xs font-semibold'
                  : 'text-[#647985] hover:text-[#172B36]'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Tabel Data</span>
            </button>
          </div>
        </div>

        {viewMode === 'chart' ? (
          <MethodComparisonChart />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#FAFCFB] border-b border-[#DCE8ED] text-[11px] font-semibold text-[#647985]">
                  <th className="py-2.5 px-3">Metrik Evaluasi</th>
                  <th className="py-2.5 px-3">Model A (Citra Saja)</th>
                  <th className="py-2.5 px-3">Model B (Citra + Geo)</th>
                  <th className="py-2.5 px-3 font-bold text-[#07865B]">Delta Kenaikan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE8ED]">
                {comparisonMetrics.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#F7FAFC]">
                    <td className="py-2.5 px-3 font-semibold text-[#172B36]">{item.metric}</td>
                    <td className="py-2.5 px-3 font-medium text-[#647985]">{item.modelA}%</td>
                    <td className="py-2.5 px-3 font-bold text-[#07865B]">{item.modelB}%</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-600">+{item.diff}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Methodology Notes & Research Protocol */}
        <div className="pt-3 border-t border-[#DCE8ED] space-y-1.5 text-[11px] text-[#647985]">
          <div className="font-semibold text-[#172B36]">Protokol Eksperimen & Dataset:</div>
          <div>• Dataset: {experimentSummary.datasetInfo.datasetName}</div>
          <div>• Evaluasi: {experimentSummary.datasetInfo.evaluationProtocol}</div>
          <div>• Arsitektur Dasar: {experimentSummary.datasetInfo.baselineVisionModel}</div>
          <div>• Prior Spasial: {experimentSummary.datasetInfo.geoModel}</div>
        </div>
      </div>
    </div>
  );
};

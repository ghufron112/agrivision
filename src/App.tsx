import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';

// 9 Dashboard Pages
import { HomePage } from './pages/HomePage';
import { IdentificationPage } from './pages/IdentificationPage';
import { ResultsPage } from './pages/ResultsPage';
import { PlantDetailPage } from './pages/PlantDetailPage';
import { DistributionPage } from './pages/DistributionPage';
import { TaxonomyPage } from './pages/TaxonomyPage';
import { HistoryPage } from './pages/HistoryPage';
import { MethodComparisonPage } from './pages/MethodComparisonPage';
import { AboutPage } from './pages/AboutPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Halaman 1 — Beranda */}
          <Route path="/" element={<HomePage />} />

          {/* Halaman 2 — Identifikasi Tanaman (Upload Foto) */}
          <Route path="/identifikasi" element={<IdentificationPage />} />

          {/* Halaman 3 — Hasil Identifikasi */}
          <Route path="/hasil" element={<ResultsPage />} />

          {/* Halaman 4 — Detail Tanaman */}
          <Route path="/tanaman" element={<PlantDetailPage />} />
          <Route path="/tanaman/:slug" element={<PlantDetailPage />} />

          {/* Halaman 5 — Persebaran Geografis */}
          <Route path="/persebaran" element={<DistributionPage />} />
          <Route path="/persebaran/:slug" element={<DistributionPage />} />

          {/* Halaman 6 — Taksonomi */}
          <Route path="/taksonomi" element={<TaxonomyPage />} />
          <Route path="/taksonomi/:slug" element={<TaxonomyPage />} />

          {/* Halaman 7 — Riwayat Identifikasi */}
          <Route path="/riwayat" element={<HistoryPage />} />

          {/* Halaman 8 — Perbandingan Metode */}
          <Route path="/perbandingan" element={<MethodComparisonPage />} />

          {/* Halaman 9 — Tentang dan Panduan */}
          <Route path="/tentang" element={<AboutPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

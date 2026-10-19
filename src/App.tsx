import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/common/Toast';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { AnalysisUploadPage } from './pages/AnalysisUploadPage';
import { AnalysisProcessPage } from './pages/AnalysisProcessPage';
import { AnalysisResultPage } from './pages/AnalysisResultPage';
import { HistoryPage } from './pages/HistoryPage';
import { PlantCatalogPage } from './pages/PlantCatalogPage';
import { PlantDetailPage } from './pages/PlantDetailPage';
import { DiseaseCatalogPage } from './pages/DiseaseCatalogPage';
import { DiseaseDetailPage } from './pages/DiseaseDetailPage';
import { ProfilePage } from './pages/ProfilePage';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Public / Landing & Auth */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Authenticated Dashboard & Application Layout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analisis" element={<AnalysisUploadPage />} />
            <Route path="/analisis/proses" element={<AnalysisProcessPage />} />
            <Route path="/analisis/:id" element={<AnalysisResultPage />} />
            <Route path="/riwayat" element={<HistoryPage />} />
            <Route path="/tanaman" element={<PlantCatalogPage />} />
            <Route path="/tanaman/:id" element={<PlantDetailPage />} />
            <Route path="/penyakit" element={<DiseaseCatalogPage />} />
            <Route path="/penyakit/:id" element={<DiseaseDetailPage />} />
            <Route path="/profil" element={<ProfilePage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;

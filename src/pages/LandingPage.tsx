import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Scan, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import { Logo } from '../components/common/Logo';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col selection:bg-[#E8F7F1] selection:text-[#005A45]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E4ECE8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link to="/">
            <Logo theme="light" size="md" />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#beranda"
              className="text-sm font-semibold text-[#008F63] hover:text-[#005A45] transition-colors"
            >
              Beranda
            </a>
            <a
              href="#fitur"
              className="text-sm font-medium text-[#6B7C76] hover:text-[#17352E] transition-colors"
            >
              Fitur
            </a>
            <a
              href="#tentang"
              className="text-sm font-medium text-[#6B7C76] hover:text-[#17352E] transition-colors"
            >
              Tentang
            </a>
            <a
              href="#kontak"
              className="text-sm font-medium text-[#6B7C76] hover:text-[#17352E] transition-colors"
            >
              Kontak
            </a>
          </nav>

          {/* Auth Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2.5 text-sm font-semibold text-[#17352E] hover:text-[#008F63] transition-colors rounded-xl"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#008F63] hover:bg-[#007652] rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              Daftar
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="beranda" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        {/* Soft Organic Background Blob */}
        <div className="absolute right-0 top-10 w-[600px] h-[600px] bg-[#E8F7F1]/70 rounded-full blur-3xl pointer-events-none -z-10 translate-x-1/3"></div>
        <div className="absolute left-1/4 bottom-0 w-[400px] h-[400px] bg-[#F3FBF7] rounded-full blur-2xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F7F1] border border-[#008F63]/20 text-[#008F63] text-xs font-semibold tracking-wide shadow-2xs">
              <span className="text-sm">🌿</span>
              <span>Sistem Cerdas untuk Pertanian Modern</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#17352E] tracking-tight leading-[1.15]">
              Kenali Tanaman dengan Kecerdasan Buatan
            </h1>

            <p className="text-lg text-[#6B7C76] leading-relaxed max-w-xl font-normal">
              Unggah foto tanaman, dan biarkan AI menganalisis jenis tanaman,
              kondisi kesehatan, serta memberikan rekomendasi penanganan secara akurat.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => navigate('/analisis')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#008F63] hover:bg-[#007652] text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <span>Mulai Analisis</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F3FBF7] text-[#17352E] font-semibold text-base border border-[#E4ECE8] transition-all hover:border-[#008F63]/30 cursor-pointer"
              >
                <span>Buka Dashboard</span>
                <ChevronRight className="w-4 h-4 text-[#6B7C76]" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual with Scanner Frame & Badges */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl p-4 bg-white/60 backdrop-blur-sm border border-[#E4ECE8] shadow-xl">
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#008F63]/15 to-[#16A66A]/20 rounded-3xl -z-10 blur-xl"></div>

              <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80"
                  alt="Daun Cabai Sehat"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* Viewfinder Target Brackets */}
                <div className="absolute inset-8 border-2 border-white/80 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
                  <div className="flex justify-between">
                    <span className="w-4 h-4 border-t-2 border-l-2 border-white"></span>
                    <span className="w-4 h-4 border-t-2 border-r-2 border-white"></span>
                  </div>
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#16A66A] to-transparent animate-scan shadow-sm"></div>
                  <div className="flex justify-between">
                    <span className="w-4 h-4 border-b-2 border-l-2 border-white"></span>
                    <span className="w-4 h-4 border-b-2 border-r-2 border-white"></span>
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-[#E4ECE8] flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#E8F7F1] flex items-center justify-center text-[#008F63]">
                    <Scan className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#17352E] leading-tight">AI Analysis</div>
                    <div className="text-[10px] font-medium text-[#16A66A] leading-tight">Teridentifikasi</div>
                  </div>
                </div>

                <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-[#E4ECE8] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#16A66A] animate-ping"></span>
                  <span className="text-xs font-bold text-[#17352E]">94.7% Confidence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="fitur" className="py-16 bg-white border-t border-[#E4ECE8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17352E] tracking-tight">
              Fitur Unggulan AgriVision
            </h2>
            <p className="mt-3 text-base text-[#6B7C76]">
              Dibangun dengan teknologi Computer Vision mutakhir untuk membantu petani,
              akademisi, dan pehobi tanaman.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="app-card p-8 bg-white rounded-2xl border border-[#E4ECE8] hover:border-[#008F63]/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F7F1] flex items-center justify-center text-[#008F63] mb-6 shadow-2xs">
                <Scan className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#17352E] mb-3">
                Identifikasi Tanaman
              </h3>
              <p className="text-sm text-[#6B7C76] leading-relaxed">
                Mengenali jenis tanaman dengan teknologi deep learning berdasarkan karakteristik
                morfologi daun.
              </p>
            </div>

            <div className="app-card p-8 bg-white rounded-2xl border border-[#E4ECE8] hover:border-[#008F63]/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F7F1] flex items-center justify-center text-[#008F63] mb-6 shadow-2xs">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#17352E] mb-3">
                Deteksi Penyakit
              </h3>
              <p className="text-sm text-[#6B7C76] leading-relaxed">
                Mendeteksi penyakit daun dengan akurasi tinggi serta mengidentifikasi gejala
                secara dini sebelum menyebar.
              </p>
            </div>

            <div className="app-card p-8 bg-white rounded-2xl border border-[#E4ECE8] hover:border-[#008F63]/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F7F1] flex items-center justify-center text-[#008F63] mb-6 shadow-2xs">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#17352E] mb-3">
                Rekomendasi Cerdas
              </h3>
              <p className="text-sm text-[#6B7C76] leading-relaxed">
                Memberikan saran penanganan berdasarkan hasil analisis AI, mulai dari kebutuhan air,
                cahaya, hingga fungisida yang tepat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="bg-[#003F32] text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Logo theme="dark" size="md" showTagline={true} />
            <p className="text-xs text-white/60 mt-2">
              Sistem Cerdas berbasis Computer Vision & Deep Learning.
            </p>
          </div>

          <div className="text-xs text-white/60 text-center md:text-right">
            &copy; 2026 AgriVision. Seluruh hak cipta dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
};

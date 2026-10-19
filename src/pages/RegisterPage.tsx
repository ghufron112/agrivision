import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { authService } from '../services/authService';
import { useToast } from '../components/common/Toast';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('Silakan isi seluruh formulir.', 'error');
      return;
    }
    if (password !== confirmPassword) {
      showToast('Konfirmasi password tidak cocok.', 'error');
      return;
    }

    authService.login(email);
    authService.updateUser({ name });
    showToast('Registrasi akun berhasil! Selamat datang di AgriVision.');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* Left Column: Visual Plant & Brand Overlay */}
      <div className="hidden lg:flex lg:col-span-5 relative bg-[#003F32] overflow-hidden flex-col justify-between p-12 text-white">
        <img
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80"
          alt="Lush Foliage Background"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 scale-105 filter saturate-120"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#003F32] via-[#003F32]/80 to-[#005A45]/70 pointer-events-none"></div>

        <div className="relative z-10">
          <Link to="/">
            <Logo theme="dark" size="lg" />
          </Link>
        </div>

        <div className="relative z-10 space-y-4 my-auto max-w-sm">
          <div className="w-12 h-1 bg-[#16A66A] rounded-full mb-6"></div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight leading-snug">
            Mulai Perjalanan Pertanian Cerdas Anda
          </h2>
          <p className="text-white/80 text-base leading-relaxed italic">
            &ldquo;Teknologi untuk tanaman, masa depan untuk pertanian.&rdquo;
          </p>
        </div>

        <div className="relative z-10 text-xs text-white/50">
          Sistem Cerdas Computer Vision & Deep Learning &copy; 2026 AgriVision
        </div>
      </div>

      {/* Right Column: Register Form */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-[#F8FAF9]">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-[#E4ECE8] shadow-sm">
          <div className="lg:hidden mb-6 flex justify-center">
            <Link to="/">
              <Logo theme="light" size="md" />
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17352E] tracking-tight">
              Daftar Akun Baru
            </h1>
            <p className="mt-2 text-sm text-[#6B7C76]">
              Buat akun Anda untuk mulai memantau dan menganalisis kesehatan tanaman.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#17352E] uppercase tracking-wider mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Andi Pratama"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E4ECE8] bg-white text-[#17352E] placeholder-[#6B7C76]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#008F63] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17352E] uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="andi@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E4ECE8] bg-white text-[#17352E] placeholder-[#6B7C76]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#008F63] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17352E] uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E4ECE8] bg-white text-[#17352E] placeholder-[#6B7C76]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#008F63] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#17352E] uppercase tracking-wider mb-2">
                Konfirmasi Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi password"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E4ECE8] bg-white text-[#17352E] placeholder-[#6B7C76]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#008F63] focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#008F63] hover:bg-[#007652] text-white font-semibold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer mt-2"
            >
              Daftar Sekarang
            </button>
          </form>

          <div className="mt-8 text-center text-xs sm:text-sm text-[#6B7C76]">
            Sudah punya akun?{' '}
            <Link
              to="/login"
              className="font-semibold text-[#008F63] hover:text-[#005A45] hover:underline"
            >
              Masuk di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { authService } from '../services/authService';
import { useToast } from '../components/common/Toast';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState('andi@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Silakan masukkan email atau username.', 'error');
      return;
    }
    authService.login(email);
    showToast('Berhasil masuk. Selamat datang kembali, Andi!');
    navigate('/dashboard');
  };

  const handleGoogleLogin = () => {
    authService.login('andi@example.com');
    showToast('Berhasil masuk dengan akun Google.');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* Left Column: Visual Plant & Brand Overlay */}
      <div className="hidden lg:flex lg:col-span-5 relative bg-[#003F32] overflow-hidden flex-col justify-between p-12 text-white">
        {/* Background Plant Photography */}
        <img
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80"
          alt="Lush Foliage Background"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 scale-105 filter saturate-120"
        />

        {/* Ambient Dark Green Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#003F32] via-[#003F32]/80 to-[#005A45]/70 pointer-events-none"></div>

        {/* Top Logo */}
        <div className="relative z-10">
          <Link to="/">
            <Logo theme="dark" size="lg" />
          </Link>
        </div>

        {/* Center Quote & Vision */}
        <div className="relative z-10 space-y-4 my-auto max-w-sm">
          <div className="w-12 h-1 bg-[#16A66A] rounded-full mb-6"></div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight leading-snug">
            See. Identify. Understand.
          </h2>
          <p className="text-white/80 text-base leading-relaxed italic">
            &ldquo;Teknologi untuk tanaman, masa depan untuk pertanian.&rdquo;
          </p>
        </div>

        {/* Bottom Tagline */}
        <div className="relative z-10 text-xs text-white/50">
          Sistem Cerdas Computer Vision & Deep Learning &copy; 2026 AgriVision
        </div>
      </div>

      {/* Right Column: Clean White Form */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-[#F8FAF9]">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-[#E4ECE8] shadow-sm">
          {/* Mobile Logo Only */}
          <div className="lg:hidden mb-6 flex justify-center">
            <Link to="/">
              <Logo theme="light" size="md" />
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17352E] tracking-tight">
              Masuk ke Akun Anda
            </h1>
            <p className="mt-2 text-sm text-[#6B7C76]">
              Selamat datang kembali, silakan login untuk melanjutkan.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-[#17352E] uppercase tracking-wider mb-2">
                Email atau Username
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contoh@email.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E4ECE8] bg-white text-[#17352E] placeholder-[#6B7C76]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#008F63] focus:border-transparent transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-[#17352E] uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-[#E4ECE8] bg-white text-[#17352E] placeholder-[#6B7C76]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#008F63] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7C76] hover:text-[#17352E] p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#E4ECE8] text-[#008F63] focus:ring-[#008F63]"
                />
                <span className="text-[#6B7C76] font-medium">Ingat saya</span>
              </label>

              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Tautan reset kata sandi telah dikirim ke email Anda.');
                }}
                className="font-medium text-[#008F63] hover:text-[#005A45] hover:underline"
              >
                Lupa password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#008F63] hover:bg-[#007652] text-white font-semibold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              Masuk
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-[#E4ECE8] w-full"></div>
              <span className="bg-white px-3 text-xs text-[#6B7C76] font-medium uppercase tracking-wider absolute">
                atau
              </span>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 rounded-xl border border-[#E4ECE8] bg-white hover:bg-[#F3FBF7] text-[#17352E] font-semibold text-sm flex items-center justify-center gap-3 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Masuk dengan Google</span>
            </button>
          </form>

          {/* Footer Link to Register */}
          <div className="mt-8 text-center text-xs sm:text-sm text-[#6B7C76]">
            Belum punya akun?{' '}
            <Link
              to="/register"
              className="font-semibold text-[#008F63] hover:text-[#005A45] hover:underline"
            >
              Daftar di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

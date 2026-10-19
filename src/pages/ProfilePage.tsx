import React, { useState } from 'react';
import { User, Mail, Lock, Shield, Check, Camera } from 'lucide-react';
import { authService } from '../services/authService';
import { useToast } from '../components/common/Toast';

export const ProfilePage: React.FC = () => {
  const { showToast } = useToast();
  const currentUser = authService.getUser();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const handleAvatarChange = () => {
    // Switch to another clean avatar
    const avatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    ];
    const next = avatars[(avatars.indexOf(avatar) + 1) % avatars.length];
    setAvatar(next);
    authService.updateUser({ avatar: next });
    showToast('Foto profil diperbarui!');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      showToast('Konfirmasi password tidak cocok!', 'error');
      return;
    }

    authService.updateUser({
      name,
      email,
      avatar,
    });
    showToast('Perubahan profil berhasil disimpan!');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17352E] tracking-tight">
          Profil Saya
        </h1>
        <p className="text-sm text-[#6B7C76] mt-1">
          Kelola informasi akun pengguna dan preferensi aplikasi AgriVision.
        </p>
      </div>

      <div className="app-card-static bg-white rounded-3xl p-6 sm:p-10 border border-[#E4ECE8] space-y-8">
        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#E4ECE8]">
          <div className="relative group">
            <img
              src={avatar}
              alt={name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-[#E8F7F1]"
            />
            <button
              onClick={handleAvatarChange}
              type="button"
              className="absolute bottom-0 right-0 p-2 rounded-full bg-[#008F63] hover:bg-[#007652] text-white shadow-md transition-transform hover:scale-110 cursor-pointer"
              title="Ganti Foto Profil"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-[#17352E]">{name}</h3>
            <p className="text-xs text-[#6B7C76] font-medium mt-0.5">{email}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#E8F7F1] text-[#008F63]">
              <Shield className="w-3 h-3" />
              <span>{currentUser.role}</span>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#17352E] mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#6B7C76] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4ECE8] bg-white text-sm text-[#17352E] focus:outline-none focus:ring-2 focus:ring-[#008F63] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#17352E] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6B7C76] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4ECE8] bg-white text-sm text-[#17352E] focus:outline-none focus:ring-2 focus:ring-[#008F63] transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#17352E] mb-2">
                Password Baru (Opsional)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6B7C76] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kosongkan jika tidak ingin mengubah password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4ECE8] bg-white text-sm text-[#17352E] placeholder-[#6B7C76]/60 focus:outline-none focus:ring-2 focus:ring-[#008F63] transition-all"
                />
              </div>
            </div>

            {password && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#17352E] mb-2">
                  Konfirmasi Password Baru
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#6B7C76] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi password baru"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4ECE8] bg-white text-sm text-[#17352E] placeholder-[#6B7C76]/60 focus:outline-none focus:ring-2 focus:ring-[#008F63] transition-all"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#008F63] hover:bg-[#007652] text-white text-sm font-semibold transition-all shadow-sm cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

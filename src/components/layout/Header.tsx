import React, { useState } from 'react';
import { Menu, User, Sparkles, MapPin } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, title }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <header className="h-14 bg-[#FFFFFF] border-b border-[#DCE8ED] px-4 lg:px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          aria-label="Buka Menu"
          className="lg:hidden p-1.5 rounded-md text-[#647985] hover:text-[#172B36] hover:bg-[#F7FAFC] transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {title && (
          <h1 className="text-sm font-semibold text-[#172B36] hidden sm:block">
            {title}
          </h1>
        )}
      </div>

      {/* Right controls: AI simulation status & Profile Avatar */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E5F5EE] border border-[#B8E2D1] text-[11px] font-medium text-[#07865B]">
          <Sparkles className="w-3 h-3 text-[#07865B]" />
          <span>AI Vision Engine v2.4</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowProfileModal(!showProfileModal)}
            title="Profil Pengguna"
            aria-label="Profil Pengguna"
            className="w-8 h-8 rounded-full bg-[#E5F5EE] border border-[#B8E2D1] flex items-center justify-center text-[#07865B] hover:bg-[#D5EFE4] transition-colors focus:outline-none focus:ring-2 focus:ring-[#07865B]/30"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Quick Profile Dropdown Modal */}
          {showProfileModal && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-[#DCE8ED] p-4 text-xs z-30 animate-in fade-in duration-150">
              <div className="flex items-center gap-3 pb-3 border-b border-[#DCE8ED]">
                <div className="w-9 h-9 rounded-full bg-[#E5F5EE] text-[#07865B] flex items-center justify-center font-bold text-sm">
                  PS
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#172B36]">Peneliti Botani</div>
                  <div className="text-[#647985]">botani@plantscan.id</div>
                </div>
              </div>
              <div className="pt-3 space-y-1.5 text-[#647985]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#07865B]" />
                  <span>Regional: Indonesia (Jawa Timur)</span>
                </div>
                <div className="text-[11px] text-[#647985] pt-1">
                  PlantScan Prototype v1.0 — Powered by Computer Vision & Geo Prior
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-[#DCE8ED]">
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="w-full py-1 text-center font-medium text-[#07865B] hover:underline"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

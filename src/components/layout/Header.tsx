import React, { useState } from 'react';
import { Menu, Bell, ChevronDown, User as UserIcon, LogOut } from 'lucide-react';
import { authService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuToggle: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, title }) => {
  const navigate = useNavigate();
  const user = authService.getUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 h-20 bg-[#F8FAF9]/80 backdrop-blur-md px-6 lg:px-8 flex items-center justify-between border-b border-[#E4ECE8]/60">
      {/* Left side: Hamburger on mobile + page title breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl text-[#17352E] hover:bg-[#E8F7F1] transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        {title && (
          <h1 className="text-xl font-bold text-[#17352E] tracking-tight hidden sm:block">
            {title}
          </h1>
        )}
      </div>

      {/* Right side: Notifications + User profile */}
      <div className="flex items-center gap-4">
        <button
          className="relative p-2.5 rounded-full text-[#6B7C76] hover:text-[#17352E] hover:bg-white transition-colors border border-transparent hover:border-[#E4ECE8]"
          title="Notifikasi"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#008F63] ring-2 ring-white"></span>
        </button>

        {/* User Card */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 p-1.5 pl-2.5 rounded-2xl hover:bg-white border border-transparent hover:border-[#E4ECE8] transition-all cursor-pointer"
          >
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-[#17352E] leading-tight">
                {user.name}
              </div>
              <div className="text-xs font-medium text-[#6B7C76] leading-tight mt-0.5">
                {user.role}
              </div>
            </div>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#008F63]/20"
            />
            <ChevronDown className="w-4 h-4 text-[#6B7C76]" />
          </button>

          {/* User menu dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#E4ECE8] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-[#E4ECE8] sm:hidden">
                <p className="text-sm font-bold text-[#17352E]">{user.name}</p>
                <p className="text-xs text-[#6B7C76]">{user.role}</p>
              </div>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate('/profil');
                }}
                className="w-full text-left px-4 py-2 text-sm text-[#17352E] hover:bg-[#F3FBF7] hover:text-[#008F63] flex items-center gap-2.5 font-medium"
              >
                <UserIcon className="w-4 h-4" />
                Profil Saya
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2 text-sm text-[#EF4444] hover:bg-red-50 flex items-center gap-2.5 font-medium"
              >
                <LogOut className="w-4 h-4" />
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

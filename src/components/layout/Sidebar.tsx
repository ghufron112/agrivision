import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanLine,
  History,
  Trees,
  ShieldAlert,
  User,
  LogOut,
  X,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { authService } from '../../services/authService';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const navGroups = [
    {
      label: 'Utama',
      items: [
        {
          name: 'Dashboard',
          to: '/dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: 'Analisis',
      items: [
        {
          name: 'Analisis Tanaman',
          to: '/analisis',
          icon: ScanLine,
        },
        {
          name: 'Riwayat Analisis',
          to: '/riwayat',
          icon: History,
        },
      ],
    },
    {
      label: 'Data',
      items: [
        {
          name: 'Data Tanaman',
          to: '/tanaman',
          icon: Trees,
        },
        {
          name: 'Penyakit Tanaman',
          to: '/penyakit',
          icon: ShieldAlert,
        },
      ],
    },
    {
      label: 'Akun',
      items: [
        {
          name: 'Profil',
          to: '/profil',
          icon: User,
        },
      ],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#003F32] text-white select-none">
      {/* Brand Header */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
        <NavLink to="/dashboard" onClick={onClose}>
          <Logo theme="dark" size="md" />
        </NavLink>
        <button
          onClick={onClose}
          className="lg:hidden text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-1.5">
            <div className="px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
              {group.label}
            </div>
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                      isActive
                        ? 'bg-[#008F63] text-white shadow-sm font-semibold'
                        : 'text-white/75 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-white/75 hover:text-white hover:bg-white/10 transition-colors"
        >
          <LogOut className="w-4 h-4 text-white/70" />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-72 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
};

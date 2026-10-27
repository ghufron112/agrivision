import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  ScanLine,
  Clock,
  BookOpen,
  BarChart3,
  Info,
  X,
  MapPin,
  GitFork,
  FileText
} from 'lucide-react';
import { Logo } from '../common/Logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Helper to determine if we are inside "Informasi Tanaman" sub-pages (4, 5, 6)
  const isPlantInfoActive =
    location.pathname.startsWith('/tanaman') ||
    location.pathname.startsWith('/persebaran') ||
    location.pathname.startsWith('/taksonomi');

  const mainNavItems = [
    {
      name: 'Beranda',
      to: '/',
      icon: Home,
      exact: true
    },
    {
      name: 'Identifikasi',
      to: '/identifikasi',
      icon: ScanLine,
      // Also highlight if on /hasil
      isActive: (pathname: string) => pathname === '/identifikasi' || pathname.startsWith('/hasil')
    },
    {
      name: 'Riwayat',
      to: '/riwayat',
      icon: Clock
    },
    {
      name: 'Informasi Tanaman',
      to: '/tanaman',
      icon: BookOpen,
      isActive: () => isPlantInfoActive
    },
    {
      name: 'Perbandingan',
      to: '/perbandingan',
      icon: BarChart3
    },
    {
      name: 'Tentang',
      to: '/tentang',
      icon: Info
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#FFFFFF] border-r border-[#DCE8ED] text-[#172B36] select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#DCE8ED]">
        <NavLink to="/" onClick={onClose}>
          <Logo size="md" />
        </NavLink>
        <button
          onClick={onClose}
          aria-label="Tutup Menu"
          className="lg:hidden text-[#647985] hover:text-[#172B36] p-1 rounded-md hover:bg-[#F7FAFC]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive
            ? item.isActive(location.pathname)
            : item.exact
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);

          return (
            <div key={item.name} className="space-y-0.5">
              <NavLink
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#E5F5EE] text-[#066B49] font-semibold'
                    : 'text-[#647985] hover:text-[#172B36] hover:bg-[#F7FAFC]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#066B49]' : 'text-[#647985]'}`} />
                <span>{item.name}</span>
              </NavLink>

              {/* Sub-navigation for Plant Information if active */}
              {item.name === 'Informasi Tanaman' && isPlantInfoActive && (
                <div className="pl-6 pr-1 py-1 space-y-1">
                  <NavLink
                    to="/tanaman"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        isActive && !location.pathname.includes('/persebaran') && !location.pathname.includes('/taksonomi')
                          ? 'bg-[#E5F5EE] text-[#07865B] font-semibold'
                          : 'text-[#647985] hover:text-[#172B36] hover:bg-[#F7FAFC]'
                      }`
                    }
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Detail Botani</span>
                  </NavLink>
                  <NavLink
                    to="/persebaran"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-[#E5F5EE] text-[#07865B] font-semibold'
                          : 'text-[#647985] hover:text-[#172B36] hover:bg-[#F7FAFC]'
                      }`
                    }
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Peta Persebaran</span>
                  </NavLink>
                  <NavLink
                    to="/taksonomi"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-[#E5F5EE] text-[#07865B] font-semibold'
                          : 'text-[#647985] hover:text-[#172B36] hover:bg-[#F7FAFC]'
                      }`
                    }
                  >
                    <GitFork className="w-3.5 h-3.5" />
                    <span>Klasifikasi Taksonomi</span>
                  </NavLink>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Footer Information */}
      <div className="p-3 border-t border-[#DCE8ED] bg-[#FAFCFB]">
        <div className="px-2 py-1.5 text-[11px] text-[#647985]">
          <div className="font-medium text-[#172B36]">PlantScan v1.0</div>
          <div>AI Vision + GeoContext</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-44 xl:w-48 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-56 z-50 transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
};

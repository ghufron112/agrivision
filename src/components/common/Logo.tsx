import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showSubtitle = false }) => {
  const iconSize = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-7 h-7' : 'w-6 h-6';
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg';

  return (
    <div className="flex items-center gap-2 select-none group">
      <div className="w-8 h-8 rounded-lg bg-[#E5F5EE] flex items-center justify-center text-[#07865B] border border-[#B8E2D1] shrink-0 transition-transform group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={iconSize}
        >
          {/* Stylized botanical leaf icon matching reference */}
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10A10 10 0 0 0 12 2zm1.2 14.5c-2.4 0-4.2-1.8-4.2-4.2 0-2.8 2.5-4.5 4.7-6.3.3.4.7.9 1 1.4-1.8 1.5-3.2 2.8-3.2 4.9 0 1.2.9 2.1 2.1 2.1 1.7 0 3-1.4 3-3.1 0-.3-.1-.6-.2-.9.8.2 1.4.9 1.4 1.7 0 2.4-2.1 4.4-4.6 4.4z" />
        </svg>
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className={`font-bold tracking-tight text-[#172B36] font-sans ${textSize}`}>
            PlantScan
          </span>
          <span className="text-[10px] font-semibold text-[#07865B] bg-[#E5F5EE] px-1.5 py-0.2 rounded">
            AI
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] text-[#647985] tracking-tight">
            Kenali Tanaman, Pahami Alam
          </span>
        )}
      </div>
    </div>
  );
};

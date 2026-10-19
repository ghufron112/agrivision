import React from 'react';

interface LogoProps {
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  theme = 'light',
  size = 'md',
  showTagline = false,
}) => {
  const isDark = theme === 'dark';

  const iconSizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  }[size];

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  return (
    <div className="flex items-center gap-2.5 select-none">
      <div
        className={`${iconSizeClasses} rounded-xl flex items-center justify-center transition-transform hover:scale-105 ${
          isDark
            ? 'bg-[#008F63] text-white shadow-sm'
            : 'bg-[#E8F7F1] text-[#008F63] border border-[#008F63]/20 shadow-xs'
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span
          className={`font-bold tracking-tight font-sans ${textSizeClasses} ${
            isDark ? 'text-white' : 'text-[#17352E]'
          }`}
        >
          AgriVision
        </span>
        {showTagline && (
          <span
            className={`text-xs font-medium tracking-wide ${
              isDark ? 'text-white/70' : 'text-[#6B7C76]'
            }`}
          >
            See. Identify. Understand.
          </span>
        )}
      </div>
    </div>
  );
};

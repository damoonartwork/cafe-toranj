import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] transition-all duration-200 cursor-pointer shadow-xs hover:border-[var(--accent)]/40 ${
        showLabel ? 'px-3 py-2' : 'p-2 sm:px-3 sm:py-2'
      } ${className}`}
      title={isDark ? 'تغییر به حالت روز (روشن)' : 'تغییر به حالت شب (تاریک)'}
      aria-label={isDark ? 'تغییر به حالت روشن' : 'تغییر به حالت تاریک'}
    >
      <div className="relative w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shrink-0">
        {isDark ? (
          <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[var(--accent)] transition-transform duration-300 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[var(--accent)] transition-transform duration-300 hover:-rotate-12" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-bold text-[var(--text-secondary)] whitespace-nowrap">
          {isDark ? 'حالت شب' : 'حالت روز'}
        </span>
      )}
    </button>
  );
};

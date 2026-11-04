import React from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ToastNotification: React.FC = () => {
  const { toastMessage, setIsCartOpen } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[var(--bg-card)] text-[var(--text-primary)] px-5 py-3 rounded-2xl shadow-2xl border border-[var(--border-color)] text-xs sm:text-sm font-bold animate-in fade-in slide-in-from-bottom-4 duration-300">
      <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0" />
      <span>{toastMessage}</span>
      <button
        onClick={() => setIsCartOpen(true)}
        className="mr-2 text-xs text-[var(--accent)] hover:text-[var(--accent-hover)] underline cursor-pointer flex items-center gap-1"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        <span>مشاهده سبد</span>
      </button>
    </div>
  );
};

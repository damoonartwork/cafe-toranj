import React, { useState } from 'react';
import { ShoppingBag, Coffee, Menu, X, Clock, MapPin, Phone, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CAFE_SETTINGS } from '../data/settings';
import { toPersianDigits } from '../utils/formatters';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  const { getItemCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = getItemCount();

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top micro bar for announcements */}
      <div className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 border-b border-[var(--border-color)]/60 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Clock className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
            <span className="truncate">ساعت کاری: {CAFE_SETTINGS.workingHours}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[var(--text-secondary)]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
              <span>ولیعصر، بالاتر از پارک‌وی</span>
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
              <span className="dir-ltr">{CAFE_SETTINGS.phoneNumber}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main sticky header */}
      <header className="sticky top-0 z-40 bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-color)] transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo & Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Hamburger button visible on mobile and tablet (<1024px) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] rounded-xl hover:bg-[var(--bg-elevated)] border border-[var(--border-color)]/60 transition-colors cursor-pointer shrink-0"
              aria-label="منوی سایت"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Brand Logo & Name */}
            <a href="#" className="flex items-center gap-2 sm:gap-3 group shrink-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[var(--accent)] flex items-center justify-center text-[var(--accent-text)] shadow-md shadow-[var(--accent)]/15 group-hover:scale-105 transition-transform shrink-0">
                <Coffee className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-black text-lg sm:text-2xl text-[var(--text-primary)] tracking-tight whitespace-nowrap">
                    کافه ترنج
                  </span>
                  <span className="hidden sm:inline-flex text-[10px] sm:text-[11px] font-bold text-[var(--accent)] bg-[var(--accent-dim)] border border-[var(--accent)]/30 px-1.5 sm:px-2 py-0.5 rounded-full shrink-0">
                    TORANJ
                  </span>
                </div>
                <span className="hidden md:inline-block text-[11px] sm:text-xs text-[var(--text-secondary)] font-medium whitespace-nowrap">
                  قهوه تخصصی، صبحانه و دسر
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links (Only shown on large screens >=1024px to prevent tablet crowding) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-sm font-semibold text-[var(--text-secondary)] shrink-0">
            <button
              onClick={() => handleNavClick('#hero')}
              className="hover:text-[var(--accent)] transition-colors cursor-pointer py-1 whitespace-nowrap"
            >
              خانه
            </button>
            <button
              onClick={() => handleNavClick('#popular')}
              className="hover:text-[var(--accent)] transition-colors cursor-pointer py-1 whitespace-nowrap"
            >
              محبوب‌ترین‌ها
            </button>
            <button
              onClick={() => handleNavClick('#menu')}
              className="hover:text-[var(--accent)] transition-colors cursor-pointer py-1 whitespace-nowrap"
            >
              منوی کامل
            </button>
            <button
              onClick={() => handleNavClick('#story')}
              className="hover:text-[var(--accent)] transition-colors cursor-pointer py-1 whitespace-nowrap"
            >
              داستان ترنج
            </button>
            <button
              onClick={() => handleNavClick('#contact')}
              className="hover:text-[var(--accent)] transition-colors cursor-pointer py-1 whitespace-nowrap"
            >
              تماس و آدرس
            </button>
          </nav>

          {/* Left Action: Theme Toggle & Shopping Cart Button */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Theme Toggle Button */}
            <ThemeToggle className="h-9 sm:h-11 px-2.5 sm:px-3 rounded-xl sm:rounded-2xl shrink-0" />

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center gap-1.5 sm:gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] active:scale-95 text-[var(--accent-text)] font-black text-xs sm:text-sm h-9 sm:h-11 px-3 sm:px-4 rounded-xl sm:rounded-2xl shadow-md shadow-[var(--accent)]/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
              aria-label="مشاهده سبد سفارش"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
              <span className="hidden sm:inline">سبد سفارش</span>
              {itemCount > 0 && (
                <span className="bg-[var(--bg-main)] text-[var(--text-primary)] text-[11px] sm:text-xs font-black min-w-4.5 sm:min-w-5 h-4.5 sm:h-5 px-1 rounded-full flex items-center justify-center shrink-0">
                  {toPersianDigits(itemCount)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative z-10 bg-[var(--bg-secondary)] w-full max-w-xs sm:max-w-sm h-full flex flex-col p-5 shadow-2xl border-l border-[var(--border-color)] overflow-y-auto animate-in slide-in-from-right duration-250">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center text-[var(--accent-text)] shrink-0">
                  <Coffee className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[var(--text-primary)]">کافه ترنج</h3>
                  <p className="text-[11px] text-[var(--text-secondary)]">منوی دیجیتال و سفارش سریع</p>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] rounded-xl hover:bg-[var(--bg-elevated)] border border-[var(--border-color)]/60 cursor-pointer"
                aria-label="بستن منو"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Cart Action Button inside drawer */}
            {itemCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full mb-4 flex items-center justify-between bg-[var(--accent)] text-[var(--accent-text)] font-black text-xs py-3 px-4 rounded-xl shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 stroke-[2.4]" />
                  <span>مشاهده سبد سفارش جاری</span>
                </div>
                <span className="bg-[var(--bg-main)] text-[var(--text-primary)] text-xs font-bold px-2 py-0.5 rounded-full">
                  {toPersianDigits(itemCount)} آیتم
                </span>
              </button>
            )}

            {/* Navigation Links */}
            <div className="space-y-1 font-bold text-sm text-[var(--text-primary)] flex-grow">
              <button
                onClick={() => handleNavClick('#hero')}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[var(--bg-elevated)] hover:text-[var(--accent)] transition-colors cursor-pointer text-right"
              >
                <span>صفحه اصلی</span>
                <ChevronLeft className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
              <button
                onClick={() => handleNavClick('#popular')}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[var(--bg-elevated)] hover:text-[var(--accent)] transition-colors cursor-pointer text-right"
              >
                <span>محبوب‌ترین‌های ترنج</span>
                <ChevronLeft className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
              <button
                onClick={() => handleNavClick('#menu')}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[var(--bg-elevated)] hover:text-[var(--accent)] transition-colors cursor-pointer text-right"
              >
                <span>منوی کامل دسته‌بندی‌ها</span>
                <ChevronLeft className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
              <button
                onClick={() => handleNavClick('#story')}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[var(--bg-elevated)] hover:text-[var(--accent)] transition-colors cursor-pointer text-right"
              >
                <span>درباره و داستان کافه ترنج</span>
                <ChevronLeft className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
              <button
                onClick={() => handleNavClick('#contact')}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[var(--bg-elevated)] hover:text-[var(--accent)] transition-colors cursor-pointer text-right"
              >
                <span>آدرس، لوکیشن و تماس</span>
                <ChevronLeft className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            </div>

            {/* Theme Toggle option in drawer */}
            <div className="pt-4 border-t border-[var(--border-color)] mb-4">
              <div className="flex items-center justify-between p-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)]">
                <span className="text-xs font-bold text-[var(--text-secondary)]">تغییر تم رنگی</span>
                <ThemeToggle showLabel />
              </div>
            </div>

            {/* Contact & Hours Info in drawer */}
            <div className="pt-3 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)] space-y-2">
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>{CAFE_SETTINGS.workingHours}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span className="dir-ltr">{CAFE_SETTINGS.phoneNumber}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span className="truncate">{CAFE_SETTINGS.address}</span>
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

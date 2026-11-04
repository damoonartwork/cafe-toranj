import React from 'react';
import { Coffee, MapPin, Phone, Clock, Instagram, Send, Heart } from 'lucide-react';
import { CAFE_SETTINGS } from '../data/settings';
import { createWhatsAppUrl } from '../utils/formatters';

interface FooterProps {
  onSelectCategory: (catId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const whatsAppGeneralUrl = createWhatsAppUrl(
    CAFE_SETTINGS.whatsAppNumber,
    'سلام! مایل به دریافت اطلاعات بیشتر درباره منو و رزرو میز در کافه ترنج هستم.'
  );

  return (
    <footer id="contact" className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] pt-14 pb-8 border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[var(--border-color)] text-right">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[var(--accent)] flex items-center justify-center text-[var(--accent-text)] shadow-md shadow-[var(--accent)]/15">
                <Coffee className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-[var(--text-primary)]">کافه ترنج</h3>
                <span className="text-xs text-[var(--accent)] font-bold">TORANJ CAFE & BISTRO</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
              منوی دیجیتال و سفارش سریع آنلاین کافه ترنج.
              ارائه‌دهنده انواع صبحانه‌های ارگانیک، اسپرسو بار با دانه‌های تخصصی، نوشیدنی‌های دست‌ساز و کیک‌های تازه پخت روز.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={whatsAppGeneralUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>ارتباط در واتس‌اپ</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-[var(--bg-elevated)] hover:bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-color)] text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
              >
                <Instagram className="w-4 h-4 text-[var(--accent)]" />
                <span>{CAFE_SETTINGS.instagram}</span>
              </a>
            </div>
          </div>

          {/* Quick Category Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-extrabold text-sm text-[var(--text-primary)] border-r-2 border-[var(--accent)] pr-2">
              بخش‌های منو
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-[var(--text-secondary)]">
              <button
                onClick={() => onSelectCategory('breakfast')}
                className="text-right hover:text-[var(--accent)] transition-colors py-1 cursor-pointer"
              >
                صبحانه اختصاصی
              </button>
              <button
                onClick={() => onSelectCategory('hot-coffee')}
                className="text-right hover:text-[var(--accent)] transition-colors py-1 cursor-pointer"
              >
                اسپرسو و قهوه گرم
              </button>
              <button
                onClick={() => onSelectCategory('cold-coffee')}
                className="text-right hover:text-[var(--accent)] transition-colors py-1 cursor-pointer"
              >
                قهوه سرد و آیس
              </button>
              <button
                onClick={() => onSelectCategory('desserts')}
                className="text-right hover:text-[var(--accent)] transition-colors py-1 cursor-pointer"
              >
                کیک و دسر روز
              </button>
              <button
                onClick={() => onSelectCategory('sandwiches')}
                className="text-right hover:text-[var(--accent)] transition-colors py-1 cursor-pointer"
              >
                ساندویچ و پنینی
              </button>
              <button
                onClick={() => onSelectCategory('beverages')}
                className="text-right hover:text-[var(--accent)] transition-colors py-1 cursor-pointer"
              >
                نوشیدنی‌های طبیعی
              </button>
            </div>
          </div>

          {/* Contact & Location Info */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-extrabold text-sm text-[var(--text-primary)] border-r-2 border-[var(--accent)] pr-2">
              آدرس و ساعات کاری
            </h4>
            <div className="space-y-2.5 text-xs text-[var(--text-secondary)]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <span>{CAFE_SETTINGS.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>شماره تماس و رزرو: {CAFE_SETTINGS.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>ساعات فعالیت: {CAFE_SETTINGS.workingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Info */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <p>© تمامی حقوق برای کافه ترنج (TORANJ CAFE) محفوظ است · ۱۴۰۳</p>
          <div className="flex items-center gap-1">
            <span>طراحی شده با</span>
            <Heart className="w-3.5 h-3.5 text-[var(--accent)] fill-[var(--accent)]" />
            <span>برای تجربه سفارش آسان و سریع</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

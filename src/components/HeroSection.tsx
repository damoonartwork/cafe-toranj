import React from 'react';
import { ArrowDown, Sparkles, Coffee, Croissant, Award, Flame } from 'lucide-react';

interface HeroSectionProps {
  onExploreMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreMenu }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-12 md:py-16">
      {/* Subtle warm ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--accent)] text-xs font-bold mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>کافه و بیستروی ترنج · منوی صبحانه و قهوه روز</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] leading-[1.25] tracking-tight mb-5">
              «طعم خوب، <br className="hidden sm:inline" />
              <span className="text-[var(--accent)] relative inline-block">
                شروع یک روز خوب
                <svg className="absolute -bottom-2 right-0 w-full h-3 text-[var(--accent)]/30 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 0, 100 12" stroke="currentColor" strokeWidth="6" fill="transparent" strokeLinecap="round" />
                </svg>
              </span>»
            </h1>

            {/* Subtitle */}
            <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-medium">
              «از صبحانه‌های دلچسب تا نوشیدنی‌های خاص، تجربه‌ای خوشمزه در کافه ترنج»
              با فضایی آرام، قهوه‌های تخصصی دمی و اسپرسو، و نان‌ها و دسرهای تازه پخت روز.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] active:scale-95 text-[var(--accent-text)] font-black text-base px-8 py-4 rounded-2xl shadow-lg shadow-[var(--accent)]/15 transition-all cursor-pointer group"
              >
                <span>مشاهده منو و سفارش</span>
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>

              <a
                href="#popular"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent)]/40 font-bold text-base px-6 py-4 rounded-2xl transition-all shadow-xs"
              >
                <Flame className="w-4 h-4 text-[var(--accent)]" />
                <span>محبوب‌ترین‌های کافه</span>
              </a>
            </div>

            {/* Quick Feature Pillars */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-[var(--border-color)] w-full max-w-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)] shrink-0">
                  <Coffee className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-xs sm:text-sm text-[var(--text-primary)]">۱۰۰٪ عربیکا</p>
                  <p className="text-[10px] sm:text-xs text-[var(--text-muted)]">قهوه تخصصی تازه برشت</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)] shrink-0">
                  <Croissant className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-xs sm:text-sm text-[var(--text-primary)]">پخت روزانه</p>
                  <p className="text-[10px] sm:text-xs text-[var(--text-muted)]">کروسان و نان ارگانیک</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)] shrink-0">
                  <Award className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-xs sm:text-sm text-[var(--text-primary)]">کیفیت ممتاز</p>
                  <p className="text-[10px] sm:text-xs text-[var(--text-muted)]">مواد اولیه درجه یک</p>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Imagery Column */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer delicate ambient lighting */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[var(--accent)]/15 via-transparent to-transparent rounded-[2.5rem] blur-xl opacity-70" />

              {/* Main hero card */}
              <div className="relative rounded-3xl overflow-hidden bg-[var(--bg-card)] shadow-2xl border border-[var(--border-color)]">
                <img
                  src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1000&auto=format&fit=crop&q=85"
                  alt="میز صبحانه و قهوه کافه ترنج"
                  className="w-full h-80 sm:h-96 object-cover object-center transform hover:scale-105 transition-transform duration-700 brightness-95"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1000&auto=format&fit=crop&q=85';
                  }}
                />

                {/* Subtle scrim on bottom of photo */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--bg-main)]/95 via-[var(--bg-main)]/60 to-transparent p-5 text-[var(--text-primary)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[var(--accent)]">سرو روزانه ۸ تا ۱۲</p>
                      <h4 className="font-bold text-base sm:text-lg text-[var(--text-primary)]">سینی صبحانه مخصوص سرآشپز ترنج</h4>
                    </div>
                    <span className="bg-[var(--accent)] text-[var(--accent-text)] text-xs font-black px-3 py-1.5 rounded-xl shadow-md">
                      تخفیف ۱۰٪
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating review/rating badge */}
              <div className="absolute -bottom-4 right-2 sm:-bottom-5 sm:-right-6 bg-[var(--bg-card)]/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl shadow-xl border border-[var(--border-color)] flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)] font-black text-xs sm:text-sm shrink-0">
                  ۴.۹★
                </div>
                <div className="text-right">
                  <p className="font-bold text-[11px] sm:text-xs text-[var(--text-primary)] whitespace-nowrap">رضایت بیش از ۲,۵۰۰ مشتری</p>
                  <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] whitespace-nowrap">کافه برگزیده منطقه ولیعصر</p>
                </div>
              </div>

              {/* Floating coffee badge */}
              <div className="absolute -top-3 left-2 sm:-top-4 sm:-left-6 bg-[var(--bg-card)]/95 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-lg border border-[var(--border-color)] flex items-center gap-1.5 sm:gap-2">
                <span className="text-sm sm:text-base">☕</span>
                <span className="text-[11px] sm:text-xs font-bold text-[var(--text-primary)] whitespace-nowrap">اسپرسو بار تخصصی</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

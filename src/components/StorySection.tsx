import React from 'react';
import { Wifi, BookOpen, Music, HeartHandshake, Sparkles } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-16 sm:py-20 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Visual Showcase (2 layered images) */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Back ambient photo */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-color)] aspect-4/3">
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80"
                  alt="محیط داخلی گرم و صمیمی کافه ترنج"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Front floating barista photo */}
              <div className="absolute -bottom-8 -left-4 sm:-left-8 w-3/5 rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-color)] aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80"
                  alt="آماده‌سازی قهوه تخصصی در کافه ترنج"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Experience badge */}
              <div className="absolute top-4 -right-4 sm:-right-6 bg-[var(--bg-card)]/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-[var(--border-color)] text-right">
                <p className="text-[10px] text-[var(--text-muted)] font-semibold">تاسیس ۱۳۹۸</p>
                <p className="text-xs font-black text-[var(--accent)]">بیش از ۵ سال همراهی شما</p>
              </div>

            </div>
          </div>

          {/* Story Narrative */}
          <div className="lg:col-span-7 text-right order-1 lg:order-2">
            
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] mb-2">
              <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              <span>درباره کافه ترنج</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight mb-4 leading-snug">
              مکانی برای آرامش، گپ‌وگفت و لذت چشیدن طعم‌های اصیل
            </h2>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6 font-medium">
              کافه ترنج با هدف خلق فضایی آرام، دعوت‌کننده و معاصر متولد شد.
              ما معتقدیم یک فنجان قهوه عالی و یک بشقاب صبحانه سرشار از تازگی، می‌تواند مسیر یک روز کامل را دگرگون کند.
              تمامی نان‌ها، کروسان‌ها و شیرینی‌های ترنج به شکل روزانه در کارگاه پخت اختصاصی ما تهیه می‌شوند تا تازگی بدون سازش را تجربه کنید.
            </p>

            {/* Atmosphere Perks Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2 mb-8">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">وای‌فای پرسرعت</h4>
                  <p className="text-[10px] sm:text-xs text-[var(--text-muted)]">مناسب دورکاری و قرارهای کاری</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Music className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">موسیقی آرامش‌بخش</h4>
                  <p className="text-[10px] sm:text-xs text-[var(--text-muted)]">پلی‌لیست‌های اختصاصی جاز و لو-فای</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">فضای دنج مطالعه</h4>
                  <p className="text-[10px] sm:text-xs text-[var(--text-muted)]">نورپردازی گرم و بدون آلودگی صوتی</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">پرسنل صمیمی</h4>
                  <p className="text-[10px] sm:text-xs text-[var(--text-muted)]">میزبانی با لبخند و احترام</p>
                </div>
              </div>
            </div>

            <a
              href="#menu"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[var(--accent)] hover:text-[var(--accent-hover)] group cursor-pointer"
            >
              <span>مشاهده دسته‌بندی‌های کامل منو</span>
              <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            </a>

          </div>

        </div>
      </div>
    </section>
  );
};

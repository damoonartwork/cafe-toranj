import React from 'react';
import { Flame } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface PopularSectionProps {
  onOpenDetails: (product: Product) => void;
}

export const PopularSection: React.FC<PopularSectionProps> = ({ onOpenDetails }) => {
  // Filter items marked as popular
  const popularProducts = PRODUCTS.filter((p) => p.isPopular).slice(0, 6);

  return (
    <section id="popular" className="py-12 sm:py-16 bg-[var(--bg-secondary)] border-y border-[var(--border-color)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 text-right">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] mb-1">
              <Flame className="w-4 h-4 text-[var(--accent)]" />
              <span>انتخاب مشتریان همیشگی</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              «محبوب‌ترین‌های ترنج»
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md">
            پرطرفدارترین گزینه‌های صبحانه، قهوه‌های بار گرم و سرد و دسرهای تازه که هر روز بیشترین سفارش را دارند.
          </p>
        </div>

        {/* 3-column desktop / 2-column mobile responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {popularProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

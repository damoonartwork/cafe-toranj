import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { toPersianDigits } from '../utils/formatters';

interface ProductGridProps {
  selectedCategory: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenDetails: (product: Product) => void;
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating';

export const ProductGrid: React.FC<ProductGridProps> = ({
  selectedCategory,
  searchQuery,
  setSearchQuery,
  onOpenDetails,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const currentCategory = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'all' || product.categoryId === selectedCategory;

      // Search match
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        product.persianName.toLowerCase().includes(query) ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (product.ingredients && product.ingredients.some((ing) => ing.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // default order
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="menu" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Menu Section Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[var(--border-color)] text-right">
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[var(--accent)]">منوی دیجیتال کافه ترنج</span>
              <span className="text-xs text-[var(--text-muted)]">·</span>
              <span className="text-xs text-[var(--text-secondary)]">
                {toPersianDigits(filteredProducts.length)} آیتم آماده سفارش
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
              {selectedCategory === 'all' ? 'تمامی منوی ترنج' : currentCategory.name}
            </h2>
            {currentCategory.description && (
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                {currentCategory.description}
              </p>
            )}
          </div>

          {/* Search & Sort Controls Bar */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Quick Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl px-3 py-2 text-xs font-semibold text-[var(--text-primary)] shadow-xs transition-colors">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--accent)]" />
              <label htmlFor="sortSelect" className="text-[var(--text-secondary)]">مرتب‌سازی:</label>
              <select
                id="sortSelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent outline-none cursor-pointer text-[var(--text-primary)] font-bold [&>option]:bg-[var(--bg-card)] [&>option]:text-[var(--text-primary)]"
              >
                <option value="default">پیش‌فرض</option>
                <option value="rating">بالاترین امتیاز</option>
                <option value="price-asc">ارزان‌ترین</option>
                <option value="price-desc">گران‌ترین</option>
              </select>
            </div>

            {/* In-Section Live Search Input */}
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در میان آیتم‌ها..."
                className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] focus:border-[var(--accent)] rounded-2xl pr-9 pl-4 py-2 text-xs text-[var(--text-primary)] outline-none shadow-xs transition-colors placeholder-[var(--text-muted)]"
              />
              <Search className="w-4 h-4 text-[var(--accent)] absolute right-3 top-2.5 pointer-events-none" />
            </div>

          </div>

        </div>

        {/* Product Grid View */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-[var(--bg-secondary)] rounded-3xl border border-dashed border-[var(--border-color)] max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--accent)] flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-extrabold text-lg text-[var(--text-primary)] mb-2">
              موردی با مشخصات مورد نظر شما یافت نشد
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6">
              لطفاً عبارت دیگری را جستجو کنید یا دسته‌بندی دیگری را انتخاب نمایید.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] text-xs font-black px-5 py-2.5 rounded-2xl transition-colors cursor-pointer"
            >
              پاک کردن جستجو
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

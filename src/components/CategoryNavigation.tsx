import React, { useRef } from 'react';
import {
  UtensilsCrossed,
  Egg,
  Coffee,
  CupSoda,
  Wine,
  Flower2,
  CakeSlice,
  Sandwich,
  Pizza,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { toPersianDigits } from '../utils/formatters';

interface CategoryNavigationProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'all':
      return <UtensilsCrossed className="w-4 h-4" />;
    case 'breakfast':
      return <Egg className="w-4 h-4" />;
    case 'hot-coffee':
      return <Coffee className="w-4 h-4" />;
    case 'cold-coffee':
      return <CupSoda className="w-4 h-4" />;
    case 'beverages':
      return <Wine className="w-4 h-4" />;
    case 'tea':
      return <Flower2 className="w-4 h-4" />;
    case 'desserts':
      return <CakeSlice className="w-4 h-4" />;
    case 'sandwiches':
      return <Sandwich className="w-4 h-4" />;
    case 'snacks':
      return <Pizza className="w-4 h-4" />;
    default:
      return <Coffee className="w-4 h-4" />;
  }
};

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getProductCount = (categoryId: string) => {
    if (categoryId === 'all') return PRODUCTS.length;
    return PRODUCTS.filter((p) => p.categoryId === categoryId).length;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative sticky top-16 sm:top-20 z-30 bg-[var(--header-bg)] backdrop-blur-md py-2.5 sm:py-3.5 border-b border-[var(--border-color)] transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Navigation scroll wrapper with subtle arrows */}
        <div className="relative flex items-center">
          
          {/* Scroll right button for RTL */}
          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex p-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--bg-elevated)] shadow-xs absolute right-0 z-10 cursor-pointer transition-colors"
            aria-label="اسکرول به راست"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Horizontally scrollable category pills */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1 w-full px-1 scroll-smooth"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = getProductCount(cat.id);

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[var(--accent)] text-[var(--accent-text)] font-black shadow-md shadow-[var(--accent)]/15 scale-[1.02]'
                      : 'bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--accent)]/35'
                  }`}
                >
                  <span className={`${isSelected ? 'text-[var(--accent-text)]' : 'text-[var(--accent)]'}`}>
                    {getCategoryIcon(cat.id)}
                  </span>
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-[var(--bg-main)]/20 text-[var(--accent-text)]'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
                    }`}
                  >
                    {toPersianDigits(count)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scroll left button for RTL */}
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex p-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--bg-elevated)] shadow-xs absolute left-0 z-10 cursor-pointer transition-colors"
            aria-label="اسکرول به چپ"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

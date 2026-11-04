import React, { useState } from 'react';
import { Plus, Check, Star, Clock, Flame, Leaf } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, toPersianDigits } from '../utils/formatters';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 900);
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group relative bg-[var(--bg-card)] rounded-3xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--accent)]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
      style={{
        boxShadow: 'var(--card-shadow)',
      }}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[var(--bg-secondary)]">
        <img
          src={imageError ? product.fallbackImage : product.image}
          alt={product.persianName}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
        />

        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Badges container */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end z-10">
          {product.isPopular && (
            <span className="flex items-center gap-1 bg-[var(--bg-secondary)]/90 backdrop-blur-xs text-[var(--accent)] border border-[var(--accent)]/30 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              <Flame className="w-3 h-3 text-[var(--accent)]" />
              محبوب
            </span>
          )}
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="bg-[var(--accent)] text-[var(--accent-text)] text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm">
              {toPersianDigits(product.discountPercent)}٪ تخفیف
            </span>
          )}
        </div>

        {/* Dietary / Quick Meta Badges on Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isVegetarian && (
            <span className="bg-[var(--bg-secondary)]/90 border border-emerald-500/30 text-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1 shadow-xs">
              <Leaf className="w-2.5 h-2.5" />
              گیاهی
            </span>
          )}
        </div>

        {/* Quick Time & Rating Overlay on Hover */}
        <div className="absolute bottom-2 right-3 left-3 flex items-center justify-between text-white text-xs opacity-90">
          {product.preparationTime && (
            <span className="flex items-center gap-1 text-[11px] bg-[var(--bg-main)]/80 backdrop-blur-xs px-2 py-0.5 rounded-md border border-[var(--border-color)]/60 text-[var(--text-primary)]">
              <Clock className="w-3 h-3 text-[var(--accent)]" />
              {toPersianDigits(product.preparationTime)} دقیقه
            </span>
          )}
          {product.rating && (
            <span className="flex items-center gap-1 text-[11px] bg-[var(--bg-main)]/80 backdrop-blur-xs px-2 py-0.5 rounded-md border border-[var(--border-color)]/60 text-[var(--text-primary)]">
              <Star className="w-3 h-3 text-[var(--accent)] fill-[var(--accent)]" />
              {toPersianDigits(product.rating)}
            </span>
          )}
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between text-right">
        <div>
          {/* Title in Persian */}
          <h3 className="font-bold text-base sm:text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-1 mb-1.5">
            {product.persianName}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Bottom Price & Add to Cart button */}
        <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between gap-2 mt-auto">
          {/* Price Block */}
          <div className="flex flex-col">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[11px] text-[var(--text-muted)] line-through decoration-[var(--accent)]/60">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-sm sm:text-base font-extrabold text-[var(--accent)]">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-xs ${
              isAddedRecently
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-[var(--bg-elevated)] hover:bg-[var(--accent)] text-[var(--accent)] hover:text-[var(--accent-text)] border border-[var(--border-color)] hover:border-[var(--accent)]'
            }`}
            title="افزودن به سبد سفارش"
            aria-label={`افزودن ${product.persianName} به سبد`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-4 h-4" />
                <span>اضافه شد</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>سفارش</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

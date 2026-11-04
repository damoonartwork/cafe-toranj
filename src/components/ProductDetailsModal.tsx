import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Clock, Flame, Star, ShoppingBag, Leaf, Check } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, toPersianDigits } from '../utils/formatters';
import { useCart } from '../context/CartContext';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [customerNote, setCustomerNote] = useState('');
  const [imageError, setImageError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setCustomerNote('');
    setImageError(false);
    setIsSuccess(false);
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity, customerNote.trim() || undefined);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 700);
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 bg-[var(--bg-card)] rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[var(--border-color)] my-8 text-right animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-[var(--bg-elevated)]/90 hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] flex items-center justify-center shadow-md backdrop-blur-md transition-all cursor-pointer"
          aria-label="بستن"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Header */}
        <div className="relative aspect-16/9 w-full bg-[var(--bg-secondary)] overflow-hidden">
          <img
            src={imageError ? product.fallbackImage : product.image}
            alt={product.persianName}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/30 to-transparent" />

          {/* Badges on Image */}
          <div className="absolute bottom-3 right-4 flex items-center gap-2">
            {product.isPopular && (
              <span className="flex items-center gap-1 bg-[var(--bg-secondary)]/90 border border-[var(--accent)]/40 text-[var(--accent)] text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-xs">
                <Flame className="w-3.5 h-3.5 text-[var(--accent)]" />
                محبوب‌ترین
              </span>
            )}
            {product.isVegetarian && (
              <span className="flex items-center gap-1 bg-[var(--bg-secondary)]/90 border border-emerald-500/40 text-emerald-500 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-xs">
                <Leaf className="w-3.5 h-3.5" />
                گیاهی
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* Header & Persian Name */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                {product.persianName}
              </h2>
              <p className="text-xs text-[var(--text-muted)] font-medium tracking-wide">
                {product.name}
              </p>
            </div>
            <div className="text-left shrink-0">
              {product.originalPrice && (
                <p className="text-xs text-[var(--text-muted)] line-through decoration-[var(--accent)]/60">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
              <p className="text-lg font-black text-[var(--accent)]">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>

          {/* Meta Specifications */}
          <div className="flex items-center gap-4 py-2 border-y border-[var(--border-color)] text-xs text-[var(--text-secondary)] mb-4">
            {product.preparationTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                زمان آماده‌سازی: {toPersianDigits(product.preparationTime)} دقیقه
              </span>
            )}
            {product.calories && (
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[var(--accent)]" />
                کالری: {toPersianDigits(product.calories)} کیلوکالری
              </span>
            )}
            {product.rating && (
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-[var(--accent)] fill-[var(--accent)]" />
                امتیاز: {toPersianDigits(product.rating)} از ۵
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Ingredients */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mb-5">
              <h4 className="text-xs font-bold text-[var(--text-primary)] mb-2">ترکیبات و مواد اولیه:</h4>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-color)] text-[11px] font-medium px-2.5 py-1 rounded-xl"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Special Customer Instructions Note */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-[var(--text-primary)] mb-1.5">
              توضیحات سفارشی یا ترجیحات شما: (اختیاری)
            </label>
            <input
              type="text"
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              placeholder="مثال: کم‌شیرین، شیر کم‌چرب، بدون نمک اضافه..."
              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[var(--accent)]/60 rounded-2xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] outline-none transition-colors placeholder-[var(--text-muted)]"
            />
          </div>

          {/* Footer Quantity Selector & Add Button */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-[var(--border-color)]">
            {/* Quantity Stepper */}
            <div className="flex items-center bg-[var(--bg-elevated)] rounded-2xl p-1 border border-[var(--border-color)]">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-xl bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent)] flex items-center justify-center font-bold text-sm shadow-xs transition-colors cursor-pointer"
                aria-label="کاهش تعداد"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-black text-sm text-[var(--text-primary)]">
                {toPersianDigits(quantity)}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-xl bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent)] flex items-center justify-center font-bold text-sm shadow-xs transition-colors cursor-pointer"
                aria-label="افزایش تعداد"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Total Price & Add to Cart button */}
            <button
              onClick={handleAddToCart}
              className={`flex-grow flex items-center justify-center gap-2 py-3 px-5 rounded-2xl font-black text-sm transition-all duration-200 cursor-pointer shadow-md ${
                isSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] active:scale-95 text-[var(--accent-text)] shadow-[var(--accent)]/20'
              }`}
            >
              {isSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>به سبد اضافه شد</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 stroke-[2.4]" />
                  <span>افزودن به سبد · {formatPrice(totalPrice)}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

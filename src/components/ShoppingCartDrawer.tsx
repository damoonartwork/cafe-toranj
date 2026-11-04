import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Coffee, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, toPersianDigits } from '../utils/formatters';

export const ShoppingCartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    getSubtotal,
    getDiscountTotal,
    getFinalTotal,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const discountTotal = getDiscountTotal();
  const finalTotal = getFinalTotal();

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Container (Side drawer on desktop, bottom sheet on small screens) */}
      <div className="relative z-10 bg-[var(--bg-secondary)] w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[var(--border-color)] text-right animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 bg-[var(--bg-card)] border-b border-[var(--border-color)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center text-[var(--accent-text)]">
              <ShoppingBag className="w-5 h-5 stroke-[2.4]" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-[var(--text-primary)]">سبد سفارش شما</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                {cart.length > 0
                  ? `${toPersianDigits(cart.length)} نوع آیتم در سبد`
                  : 'سبد سفارش خالی است'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 font-semibold px-2 py-1 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
                title="خالی کردن تمام سبد"
              >
                حذف همه
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--bg-elevated)] rounded-xl transition-colors cursor-pointer"
              aria-label="بستن سبد"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Drawer Items List */}
        <div className="flex-grow overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[var(--text-secondary)]">
              <div className="w-20 h-20 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)] mb-4">
                <Coffee className="w-10 h-10 stroke-[2.2]" />
              </div>
              <h4 className="font-bold text-base text-[var(--text-primary)] mb-1">
                سبد سفارش شما در حال حاضر خالی است
              </h4>
              <p className="text-xs text-[var(--text-muted)] max-w-xs mb-6">
                از میان منوی متنوع صبحانه، قهوه‌ها، نوشیدنی‌ها و دسرهای خوشمزه آیتم دلخواهتان را انتخاب کنید.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] text-xs font-black px-6 py-3 rounded-2xl shadow-md shadow-[var(--accent)]/15 transition-all cursor-pointer"
              >
                مشاهده منوی کافه
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemTotal = item.product.price * item.quantity;
              return (
                <div
                  key={item.product.id}
                  className="bg-[var(--bg-card)] rounded-2xl p-3.5 border border-[var(--border-color)] hover:border-[var(--accent)]/40 shadow-xs flex items-center gap-3 transition-all"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.persianName}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-[var(--bg-secondary)]"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = item.product.fallbackImage;
                    }}
                  />

                  {/* Details */}
                  <div className="flex-grow min-w-0">
                    <h4 className="font-bold text-sm text-[var(--text-primary)] truncate">
                      {item.product.persianName}
                    </h4>

                    {item.customerNote && (
                      <p className="text-[11px] text-[var(--accent)] truncate mt-0.5">
                        یادداشت: {item.customerNote}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[var(--text-secondary)]">
                        {formatPrice(item.product.price)}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)]">×</span>
                      <span className="text-xs font-extrabold text-[var(--accent)]">
                        {toPersianDigits(item.quantity)}
                      </span>
                    </div>

                    <div className="text-xs font-black text-[var(--text-primary)] mt-1">
                      مجموع: {formatPrice(itemTotal)}
                    </div>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[var(--text-muted)] hover:text-rose-500 transition-colors p-1 cursor-pointer"
                      title="حذف آیتم"
                      aria-label={`حذف ${item.product.persianName}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center bg-[var(--bg-elevated)] rounded-xl p-0.5 border border-[var(--border-color)]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent)] flex items-center justify-center font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                        aria-label="کاهش تعداد"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[var(--text-primary)]">
                        {toPersianDigits(item.quantity)}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent)] flex items-center justify-center font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                        aria-label="افزایش تعداد"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer & Invoice Calculation */}
        {cart.length > 0 && (
          <div className="p-5 bg-[var(--bg-card)] border-t border-[var(--border-color)] shadow-lg space-y-3">
            {/* Invoice Breakdown */}
            <div className="space-y-1.5 text-xs text-[var(--text-secondary)] pb-3 border-b border-[var(--border-color)]">
              <div className="flex justify-between">
                <span>جمع کل اقلام:</span>
                <span className="font-bold text-[var(--text-primary)]">{formatPrice(subtotal)}</span>
              </div>
              {discountTotal > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    تخفیف ویژه اقلام منو:
                  </span>
                  <span>{formatPrice(discountTotal)}-</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-[var(--text-primary)] pt-1">
                <span>مبلغ نهایی قابل پرداخت:</span>
                <span className="text-[var(--accent)] text-base font-black">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] active:scale-98 text-[var(--accent-text)] font-black text-sm py-3.5 px-4 rounded-2xl shadow-md shadow-[var(--accent)]/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>ادامه سفارش و ثبت نهایی</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

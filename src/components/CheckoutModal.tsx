import React, { useState } from 'react';
import { X, Send, FileText, User, Phone, Utensils, ShoppingBag, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CAFE_SETTINGS } from '../data/settings';
import { OrderDetails, OrderType } from '../types';
import { formatPrice, toPersianDigits, formatWhatsAppOrderMessage, createWhatsAppUrl } from '../utils/formatters';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    getSubtotal,
    getDiscountTotal,
    getFinalTotal,
    clearCart,
    setLastConfirmedOrder,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const [tableNumber, setTableNumber] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscountTotal();
  const finalTotal = getFinalTotal();

  const handleValidateAndSubmit = (action: 'whatsapp' | 'invoice') => {
    if (!customerName.trim()) {
      setErrorMessage('لطفاً نام و نام خانوادگی خود را وارد کنید.');
      return;
    }

    if (!phoneNumber.trim()) {
      setErrorMessage('لطفاً شماره تماس معتبر خود را وارد کنید.');
      return;
    }

    if (orderType === 'dine-in' && !tableNumber.trim()) {
      setErrorMessage('برای سفارش حضوری، لطفاً شماره میز خود را وارد کنید.');
      return;
    }

    setErrorMessage(null);

    // Generate unique order ID
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const orderId = `TRJ-${randomDigits}`;

    const orderDetails: OrderDetails = {
      customerName,
      phoneNumber,
      orderType,
      tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
      customerNotes,
    };

    const confirmedRecord = {
      orderId,
      items: [...cart],
      details: orderDetails,
      subtotal,
      discount,
      finalTotal,
      timestamp: new Date().toISOString(),
    };

    setLastConfirmedOrder(confirmedRecord);

    if (action === 'whatsapp') {
      const message = formatWhatsAppOrderMessage(
        cart,
        orderDetails,
        subtotal,
        discount,
        finalTotal,
        orderId
      );
      const url = createWhatsAppUrl(CAFE_SETTINGS.whatsAppNumber, message);
      window.open(url, '_blank');
    }

    // Close checkout and clear cart
    clearCart();
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCheckoutOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative z-10 bg-[var(--bg-card)] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[var(--border-color)] my-6 text-right animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-[var(--bg-elevated)] border-b border-[var(--border-color)] flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg text-[var(--text-primary)]">تکمیل اطلاعات و ثبت نهایی سفارش</h3>
            <p className="text-xs text-[var(--text-secondary)]">کافه ترنج · ارسال مستقیم از طریق واتس‌اپ یا فاکتور دیجیتال</p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] rounded-xl hover:bg-[var(--bg-card)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 dark:text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Order Type Toggle (حضوری / بیرون‌بر) */}
          <div>
            <label className="block text-xs font-bold text-[var(--text-primary)] mb-2">نوع سفارش شما:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('dine-in')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
                  orderType === 'dine-in'
                    ? 'bg-[var(--accent)] text-[var(--accent-text)] border-[var(--accent)] shadow-md shadow-[var(--accent)]/20'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>میل در کافه (حضوری)</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
                  orderType === 'takeaway'
                    ? 'bg-[var(--accent)] text-[var(--accent-text)] border-[var(--accent)] shadow-md shadow-[var(--accent)]/20'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>بیرون‌بر (بسته‌بندی)</span>
              </button>
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-bold text-[var(--text-primary)] mb-1.5">
              نام و نام خانوادگی <span className="text-[var(--accent)]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="مثال: علی رضایی"
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[var(--accent)]/60 rounded-2xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] outline-none transition-colors placeholder-[var(--text-muted)]"
                required
              />
              <User className="w-4 h-4 text-[var(--accent)] absolute right-3.5 top-3" />
            </div>
          </div>

          {/* Customer Phone */}
          <div>
            <label className="block text-xs font-bold text-[var(--text-primary)] mb-1.5">
              شماره تلفن همراه <span className="text-[var(--accent)]">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[var(--accent)]/60 rounded-2xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] outline-none transition-colors dir-ltr text-right placeholder-[var(--text-muted)]"
                required
              />
              <Phone className="w-4 h-4 text-[var(--accent)] absolute right-3.5 top-3" />
            </div>
          </div>

          {/* Table Number (If Dine-In) */}
          {orderType === 'dine-in' && (
            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] mb-1.5">
                شماره میز در کافه <span className="text-[var(--accent)]">*</span>
              </label>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="مثال: میز ۵ یا بخش تراس"
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[var(--accent)]/60 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] outline-none transition-colors placeholder-[var(--text-muted)]"
                required
              />
            </div>
          )}

          {/* Customer Notes */}
          <div>
            <label className="block text-xs font-bold text-[var(--text-primary)] mb-1.5">
              یادداشت یا توضیحات کلی درباره سفارش: (اختیاری)
            </label>
            <textarea
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              placeholder="نکته خاصی برای آماده‌سازی یا تحویل در نظر دارید؟"
              rows={2}
              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[var(--accent)]/60 rounded-2xl p-3 text-xs text-[var(--text-primary)] outline-none transition-colors resize-none placeholder-[var(--text-muted)]"
            />
          </div>

          {/* Order Brief Summary */}
          <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-[var(--text-secondary)]">
              <span>تعداد کل اقلام انتخابی:</span>
              <span className="text-[var(--text-primary)]">{toPersianDigits(cart.reduce((a, b) => a + b.quantity, 0))} قلم</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span>تخفیف ویژه:</span>
                <span>{formatPrice(discount)}-</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm font-extrabold text-[var(--text-primary)] pt-2 border-t border-[var(--border-color)]">
              <span>مبلغ کل فاکتور:</span>
              <span className="text-[var(--accent)] text-base font-black">{formatPrice(finalTotal)}</span>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-5 bg-[var(--bg-elevated)] border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center gap-3">
          {/* WhatsApp Submit Button */}
          <button
            onClick={() => handleValidateAndSubmit('whatsapp')}
            className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-black text-xs sm:text-sm py-3 px-4 rounded-2xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>ارسال سفارش در واتس‌اپ</span>
          </button>

          {/* View Digital Invoice Only Button */}
          <button
            onClick={() => handleValidateAndSubmit('invoice')}
            className="w-full sm:flex-1 bg-[var(--accent)] hover:bg-[var(--accent-hover)] active:scale-98 text-[var(--accent-text)] font-black text-xs sm:text-sm py-3 px-4 rounded-2xl shadow-md shadow-[var(--accent)]/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>صدور و چاپ فاکتور</span>
          </button>
        </div>

      </div>
    </div>
  );
};

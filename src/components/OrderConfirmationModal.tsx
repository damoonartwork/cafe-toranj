import React from 'react';
import { X, Printer, CheckCircle, Coffee, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CAFE_SETTINGS } from '../data/settings';
import { formatPrice, toPersianDigits, formatWhatsAppOrderMessage, createWhatsAppUrl } from '../utils/formatters';

export const OrderConfirmationModal: React.FC = () => {
  const { lastConfirmedOrder, setLastConfirmedOrder } = useCart();

  if (!lastConfirmedOrder) return null;

  const { orderId, items, details, subtotal, discount, finalTotal, timestamp } =
    lastConfirmedOrder;

  const dateFormatted = new Intl.DateTimeFormat('fa-IR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp));

  const handlePrint = () => {
    window.print();
  };

  const handleSendToWhatsApp = () => {
    const message = formatWhatsAppOrderMessage(
      items,
      details,
      subtotal,
      discount,
      finalTotal,
      orderId
    );
    const url = createWhatsAppUrl(CAFE_SETTINGS.whatsAppNumber, message);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto print:p-0 print:m-0">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity print:hidden"
        onClick={() => setLastConfirmedOrder(null)}
      />

      {/* Invoice Card */}
      <div className="relative z-10 bg-[var(--bg-card)] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[var(--border-color)] my-6 text-right animate-in fade-in zoom-in-95 duration-200 print:shadow-none print:border-none print:w-full print:max-w-none print:bg-white print:text-black">
        
        {/* Top Decorative Success Banner */}
        <div className="bg-emerald-600/15 border-b border-emerald-500/30 text-emerald-700 dark:text-emerald-200 p-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-bold text-sm">سفارش شما با موفقیت ثبت شد!</span>
          </div>
          <button
            onClick={() => setLastConfirmedOrder(null)}
            className="p-1 hover:bg-emerald-500/20 rounded-lg transition-colors cursor-pointer text-emerald-700 dark:text-emerald-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Invoice Header */}
        <div className="p-6 pb-4 border-b border-[var(--border-color)] text-center print:border-gray-200">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent)] text-[var(--accent-text)] flex items-center justify-center mx-auto mb-2 shadow-md">
            <Coffee className="w-7 h-7 stroke-[2.2]" />
          </div>
          <h2 className="text-xl font-black text-[var(--text-primary)] print:text-black">پیش‌فاکتور کافه ترنج</h2>
          <p className="text-xs text-[var(--text-secondary)] print:text-gray-600 font-medium mt-0.5">{CAFE_SETTINGS.slogan}</p>
          <div className="mt-3 inline-block bg-[var(--bg-elevated)] border border-[var(--border-color)] px-3 py-1 rounded-xl text-xs font-bold text-[var(--accent)] print:bg-gray-100 print:text-black">
            کد رهگیری سفارش: #{orderId}
          </div>
        </div>

        {/* Invoice Metadata Grid */}
        <div className="px-6 py-3 bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)] grid grid-cols-2 gap-2 border-b border-[var(--border-color)] print:bg-gray-50 print:text-gray-800 print:border-gray-200">
          <div>
            <span className="text-[var(--text-muted)] print:text-gray-500">مشتری گرامی: </span>
            <span className="font-bold text-[var(--text-primary)] print:text-black">{details.customerName}</span>
          </div>
          <div>
            <span className="text-[var(--text-muted)] print:text-gray-500">شماره تماس: </span>
            <span className="font-bold text-[var(--text-primary)] print:text-black dir-ltr inline-block">{toPersianDigits(details.phoneNumber)}</span>
          </div>
          <div>
            <span className="text-[var(--text-muted)] print:text-gray-500">نوع سفارش: </span>
            <span className="font-bold text-[var(--text-primary)] print:text-black">
              {details.orderType === 'dine-in' ? 'حضوری در کافه' : 'بیرون‌بر (بسته‌بندی)'}
            </span>
          </div>
          {details.tableNumber && (
            <div>
              <span className="text-[var(--text-muted)] print:text-gray-500">شماره میز: </span>
              <span className="font-bold text-[var(--text-primary)] print:text-black">{toPersianDigits(details.tableNumber)}</span>
            </div>
          )}
          <div className="col-span-2 text-[11px] text-[var(--text-muted)] print:text-gray-500 mt-1">
            زمان صدور: {dateFormatted}
          </div>
        </div>

        {/* Itemized Table */}
        <div className="p-6">
          <table className="w-full text-xs text-right">
            <thead>
              <tr className="border-b border-[var(--border-color)] text-[var(--text-secondary)] print:border-gray-200 print:text-gray-600 pb-2">
                <th className="py-2 font-bold">شرح کالا</th>
                <th className="py-2 font-bold text-center">تعداد</th>
                <th className="py-2 font-bold text-left">قیمت واحد</th>
                <th className="py-2 font-bold text-left">مجموع</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] print:divide-gray-200">
              {items.map((item, idx) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <tr key={idx} className="py-2">
                    <td className="py-2.5 font-bold text-[var(--text-primary)] print:text-black">
                      <div>{item.product.persianName}</div>
                      {item.customerNote && (
                        <div className="text-[10px] text-[var(--accent)] print:text-gray-600 font-normal">
                          یادداشت: {item.customerNote}
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 text-center font-bold text-[var(--text-primary)] print:text-black">
                      {toPersianDigits(item.quantity)}
                    </td>
                    <td className="py-2.5 text-left text-[var(--text-secondary)] print:text-gray-700">
                      {formatPrice(item.product.price)}
                    </td>
                    <td className="py-2.5 text-left font-extrabold text-[var(--text-primary)] print:text-black">
                      {formatPrice(itemTotal)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Totals Summary */}
          <div className="mt-4 pt-3 border-t-2 border-[var(--border-color)] print:border-gray-300 space-y-1.5 text-xs">
            <div className="flex justify-between text-[var(--text-secondary)] print:text-gray-700">
              <span>جمع اولیه:</span>
              <span className="font-bold text-[var(--text-primary)] print:text-black">{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                <span>تخفیف ویژه:</span>
                <span>{formatPrice(discount)}-</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-black text-[var(--text-primary)] print:text-black pt-2 border-t border-[var(--border-color)] print:border-gray-200">
              <span>مبلغ نهایی پرداختی:</span>
              <span className="text-base text-[var(--accent)] print:text-black font-black">{formatPrice(finalTotal)}</span>
            </div>
          </div>

          {/* Barcode Mock Visual */}
          <div className="mt-6 pt-4 border-t border-dashed border-[var(--border-color)] print:border-gray-300 text-center">
            <div className="flex justify-center items-center gap-1 h-8 opacity-70">
              {Array.from({ length: 34 }).map((_, i) => (
                <div
                  key={i}
                  className={`bg-[var(--text-secondary)] print:bg-black h-full ${
                    i % 3 === 0 ? 'w-1' : i % 2 === 0 ? 'w-0.5' : 'w-1.5'
                  }`}
                />
              ))}
            </div>
            <p className="text-[10px] text-[var(--text-muted)] print:text-gray-500 mt-1 font-mono">
              *{orderId}* - TORANJ CAFE
            </p>
          </div>
        </div>

        {/* Action Buttons (Hidden when printing) */}
        <div className="p-4 bg-[var(--bg-elevated)] border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] text-xs font-bold py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[var(--accent)]" />
              <span>چاپ فاکتور</span>
            </button>
            <button
              onClick={handleSendToWhatsApp}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>ارسال در واتس‌اپ</span>
            </button>
          </div>

          <button
            onClick={() => setLastConfirmedOrder(null)}
            className="text-xs font-bold text-[var(--accent)] hover:text-[var(--accent-hover)] py-2 px-3 cursor-pointer"
          >
            بستن و ادامه خرید
          </button>
        </div>

      </div>
    </div>
  );
};

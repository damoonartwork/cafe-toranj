import { CartItem, OrderDetails } from '../types';

/**
 * Converts English digits to Persian digits
 */
export function toPersianDigits(input: number | string): string {
  if (input === undefined || input === null) return '';
  const str = input.toString();
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, (w) => persianDigits[parseInt(w, 10)]);
}

/**
 * Formats a number with comma thousand separators
 */
export function formatNumberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '،');
}

/**
 * Formats a price in Tomans with Persian digits
 * e.g. 120000 -> "۱۲۰،۰۰۰ تومان"
 */
export function formatPrice(price: number): string {
  const withCommas = formatNumberWithCommas(price);
  return `${toPersianDigits(withCommas)} تومان`;
}

/**
 * Generates an elegant, structured WhatsApp message in Persian
 */
export function formatWhatsAppOrderMessage(
  items: CartItem[],
  details: OrderDetails,
  subtotal: number,
  discount: number,
  finalTotal: number,
  orderId: string
): string {
  const dateStr = new Intl.DateTimeFormat('fa-IR', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date());

  let message = `☕ *سفارش جدید کافه ترنج (TORANJ CAFE)*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🔖 *شماره پیگیری:* #${orderId}\n`;
  message += `📅 *زمان ثبت:* ${dateStr}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  message += `👤 *اطلاعات مشتری:*\n`;
  message += `▫️ نام: ${details.customerName.trim()}\n`;
  message += `▫️ شماره تماس: ${details.phoneNumber.trim()}\n`;
  message += `▫️ نوع سفارش: ${details.orderType === 'dine-in' ? 'حضوری (در کافه)' : 'بیرون‌بر (تحویل / بسته‌بندی)'}\n`;
  
  if (details.orderType === 'dine-in' && details.tableNumber) {
    message += `▫️ شماره میز: ${details.tableNumber}\n`;
  }

  if (details.customerNotes && details.customerNotes.trim()) {
    message += `▫️ توضیحات مشتری: ${details.customerNotes.trim()}\n`;
  }

  message += `\n🛒 *اقلام سفارش:*\n`;
  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    message += `${toPersianDigits(index + 1)}. *${item.product.persianName}*\n`;
    message += `   تعداد: ${toPersianDigits(item.quantity)} × ${formatPrice(item.product.price)} = ${formatPrice(itemTotal)}\n`;
    if (item.customerNote && item.customerNote.trim()) {
      message += `   ✍️ یادداشت: ${item.customerNote.trim()}\n`;
    }
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💵 *جمع اقلام:* ${formatPrice(subtotal)}\n`;
  if (discount > 0) {
    message += `🎁 *تخفیف ویژه:* ${formatPrice(discount)}\n`;
  }
  message += `💳 *مبلغ نهایی قابل پرداخت:* *${formatPrice(finalTotal)}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `با تشکر از انتخاب کافه ترنج 🌿`;

  return message;
}

/**
 * Creates a clean WhatsApp URL
 */
export function createWhatsAppUrl(phoneNumber: string, message: string): string {
  // Clean phone number: remove spaces, dashes, plus
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

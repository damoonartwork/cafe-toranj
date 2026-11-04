# TORANJ CAFE (کافه ترنج) ☕🌿
### منوی دیجیتال لوکس و سیستم سفارش آنلاین کافه ترنج
**Premium Digital Menu & Online Ordering Experience**

یک وب‌سایت مدرن، سریع، واکنش‌گرا و کاملاً راست‌چین (RTL) برای منوی دیجیتال و ثبت سفارش آنلاین **کافه ترنج**، ساخته شده با React، TypeScript، Vite، Tailwind CSS و آماده انتشار مستقیم روی **GitHub Pages**.

---

## ✨ ویژگی‌های کلیدی پروژه (Key Features)

1. **طراحی بصری لوکس دارک‌مود (Premium Dark Mode Aesthetic):**
   - پالت رنگی تیره گرم و خنثی با الهام از محصولات اپل و رابط‌های SaaS پریمیوم:
     - پس‌زمینه اصلی: `#121212` (Deep Charcoal)
     - پس‌زمینه ثانویه: `#191919` (Elevated Charcoal)
     - کارت‌ها و پنل‌ها: `#202020` (Surface Dark)
     - سطوح مرتفع: `#262626` (Higher Elevation)
     - حاشیه‌ها و جداکننده‌ها: `#303030` (Subtle Low-Contrast Border)
     - متن اصلی: `#F5F3EF` (Bright Off-White)
     - متن ثانویه: `#A6A39D` (Soft Gray)
     - متن فرعی و متادیتا: `#77746F` (Muted Warm Gray)
     - رنگ اکسنت شاخص: `#C5A77A` (Warm Champagne / Muted Gold)
   - فونت زیبای فارسی **وزیرمتن (Vazirmatn)** و بهینه‌سازی کامل راست‌چین (RTL).
   - اعداد تماماً فارسی‌سازی شده (`۱۲۳،۴۵۶ تومان`).

2. **تصاویر واقعی باکیفیت و بدون شکستگی (Real Food Photography & Zero Broken Images):**
   - استفاده از عکس‌های باکیفیت و واقعی از بهترین منابع عکاسی تخصصی غذا (Unsplash Food CDN).
   - سیستم خودکار Fallback تصویر در صورت بروز اختلال در اینترنت.

3. **دسته‌بندی و ناوبری روان (Category Navigation & Filtering):**
   - نوار دسته‌بندی افقی با آیکون‌های اختصاصی و شمارنده زنده تعداد آیتم‌ها.
   - ۹ دسته‌بندی منو:
     1. همه محصولات
     2. صبحانه
     3. قهوه گرم (اسپرسو بار)
     4. قهوه سرد (آیس)
     5. نوشیدنی‌ها (اسموتی و ماکتیل)
     6. چای و دمنوش
     7. کیک و دسر
     8. ساندویچ و پنینی
     9. غذا و میان‌وعده

4. **بخش محبوب‌ترین‌های ترنج (Popular Items Showcase):**
   - معرفی پرطرفدارترین گزینه‌ها در یک گرید ویژه با پلاک‌های تخفیف و محبوبیت.

5. **سبد سفارش پیشرفته و پایدار (Persistent Shopping Cart & Invoice):**
   - افزودن، کم کردن، زیاد کردن و حذف محصولات با انیمیشن روان.
   - ذخیره‌سازی خودکار در حافظه مرورگر (`LocalStorage`) تا با رفرش صفحه اطلاعات پاک نشود.
   - نشانگر زنده تعداد اقلام روی آیکون سبد سفارش در هدر.
   - کشوی بازشونده (Side Drawer در دسکتاپ و Bottom Sheet در موبایل).
   - محاسبه خودکار جمع اقلام، تخفیف‌ها و مبلغ نهایی قابل پرداخت به تومان.

6. **مدال جزئیات محصول (Product Details Modal):**
   - تصویر بزرگ، ارزش غذایی، زمان آماده‌سازی، ترکیبات و مواد اولیه.
   - فیلد اختصاصی یادداشت مشتری (مثلاً: بدون شکر، شیر کم‌چرب، کم‌نمک).

7. **تسویه‌حساب و ارسال سفارش به واتس‌اپ (WhatsApp Order Dispatch & Receipt):**
   - فرم دریافت نام، شماره تماس، نوع سفارش (حضوری در کافه / بیرون‌بر) و شماره میز.
   - ساخت خودکار متن ساختاریافته و زیبای فارسی برای ارسال مستقیم به واتس‌اپ کافه.
   - صدور پیش‌فاکتور دیجیتال رسمی با قابلیت چاپ مستقیم (`window.print()`) و بارکد اختصاصی.

8. **سازگاری کامل با گیت‌هاب پیجز (GitHub Pages Ready):**
   - پیکربندی مقدار `base: './'` در `vite.config.ts` جهت عدم وابستگی به مسیر سرور.
   - ساخت نسخه استاتیک با `npm run build` بدون نیاز به بک‌اند یا دیتابیس پولی.

---

## 🛠️ ساختار فایل‌ها (Project Structure)

```
/
├── index.html                  # فایل اصلی HTML با فونت وزیرمتن و تنظیمات RTL
├── package.json                # وابستگی‌ها و اسکریپت‌های پروژه
├── vite.config.ts              # تنظیمات Vite با base: './' برای GitHub Pages
├── tsconfig.json               # تنظیمات TypeScript
├── src/
│   ├── main.tsx                # نقطه ورود React 19
│   ├── App.tsx                 # کامپوننت اصلی و ترکیب‌کننده لایه‌ها
│   ├── index.css               # استایل‌های سراسری Tailwind CSS v4 و متغیرهای رنگی
│   ├── types/
│   │   └── index.ts            # تایپ‌های TypeScript برای محصول، سفارش، سبد و تنظیمات
│   ├── data/
│   │   ├── categories.ts       # اطلاعات ۹ دسته‌بندی منو
│   │   ├── products.ts         # کاتالوگ جامع محصولات همراه با عکس و مشخصات
│   │   └── settings.ts         # تنظیمات تماس، واتس‌اپ، آدرس و ساعات کاری
│   ├── context/
│   │   └── CartContext.tsx     # کانتکست سبد سفارش با مدیریت LocalStorage
│   ├── utils/
│   │   └── formatters.ts       # تبدیل اعداد به فارسی، فرمت تومان، و تولید پیام واتس‌اپ
│   └── components/
│       ├── Header.tsx                 # هدر چسبنده با لوگو، جستجو و سبد خرید
│       ├── HeroSection.tsx            # بنر اصلی با شعار «طعم خوب، شروع یک روز خوب»
│       ├── CategoryNavigation.tsx     # نوار اسکرولی دسته‌بندی‌ها با آیکون
│       ├── PopularSection.tsx         # سکشن محبوب‌ترین‌ها
│       ├── ProductCard.tsx            # کارت محصول با عکس، بج‌ها و دکمه افزودن
│       ├── ProductGrid.tsx            # منوی کامل با قابلیت جستجو و مرتب‌سازی
│       ├── ProductDetailsModal.tsx    # پنجره جزئیات کامل و انتخاب تعداد
│       ├── ShoppingCartDrawer.tsx     # کشوی سبد سفارش و فاکتور
│       ├── CheckoutModal.tsx          # فرم مشخصات و ارسال سفارش
│       ├── OrderConfirmationModal.tsx # پیش‌فاکتور چاپی دیجیتال
│       ├── StorySection.tsx           # داستان و محیط کافه ترنج
│       ├── ToastNotification.tsx      # اعلان‌های افزودن به سبد
│       └── Footer.tsx                 # فوتر با اطلاعات تماس و ساعات کاری
```

---

## 🚀 راهنمای نصب و اجرا به صورت محلی (Local Development)

برای اجرای پروژه روی سیستم خود مراحل زیر را انجام دهید:

### ۱. پیش‌نیازها
- نصب بودن **Node.js** نسخه 18 یا بالاتر.

### ۲. نصب وابستگی‌ها
```bash
npm install
```

### ۳. اجرای سرور توسعه (Dev Server)
```bash
npm run dev
```
پروژه روی آدرس `http://localhost:3000` در دسترس خواهد بود.

### ۴. بیلد نهایی برای انتشار (Build for Production)
```bash
npm run build
```
فایل‌های کامپایل‌شده و بهینه‌سازی شده در پوشه `dist/` قرار می‌گیرند.

---

## 🌐 راهنمای استقرار در گیت‌هاب پیجز (Deploy to GitHub Pages)

این پروژه از قبل به گونه‌ای پیکربندی شده که مستقیماً روی گیت‌هاب پیجز کار کند:

### روش ۱: استفاده از GitHub Actions (توصیه شده)
۱. وارد ریپازیتوری خود در GitHub شوید.
۲. به بخش **Settings** > **Pages** بروید.
۳. در قسمت **Build and deployment**، گزینه **Source** را روی **GitHub Actions** بگذارید.
۴. یک فایل در مسیر `.github/workflows/deploy.yml` با محتوای زیر بسازید:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### روش ۲: استفاده از شاخه `gh-pages`
۱. دستور `npm run build` را اجرا کنید.
۲. محتویات پوشه `dist` را به شاخه `gh-pages` در گیت‌پوش کنید.
۳. در تنظیمات GitHub Pages، شاخه `gh-pages` را به عنوان منبع انتخاب کنید.

---

## ⚙️ شخصی‌سازی اطلاعات کافه (Customization)

برای ویرایش شماره واتس‌اپ، شماره تماس، آدرس و نام کافه، کافیست فایل `src/data/settings.ts` را باز کنید:

```typescript
export const CAFE_SETTINGS = {
  name: 'TORANJ CAFE',
  persianName: 'کافه ترنج',
  slogan: 'طعم خوب، شروع یک روز خوب',
  whatsAppNumber: '+989123456789', // شماره واتس‌اپ سفارشات کافه
  phoneNumber: '۰۲۱-۲۲۰۸۹۴۳۰',
  address: 'تهران، خیابان ولیعصر، نرسیده به پارک وی، نبش کوچه ترنج، پلاک ۱۲',
  instagram: '@toranj.cafe',
  workingHours: 'همه روزه از ساعت ۸:۰۰ الی ۲۳:۳۰',
};
```

همچنین برای تغییر یا افزودن محصولات جدید می‌توانید فایل `src/data/products.ts` را ویرایش فرمایید.

---

☕ **کافه ترنج** — تجربه‌ای دلنشین و مدرن از سفارش آنلاین قهوه و صبحانه

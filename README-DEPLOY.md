# راهنمای دیپلوی GitHub Pages

## وضعیت فعلی
- ✅ پکیج gh-pages نصب شده
- ✅ homepage در package.json تنظیم شده: `https://code-basina.github.io/BaSina`
- ✅ HashRouter برای routing استفاده می‌شود (مشکل اصلی حل شد)
- ✅ فایل‌های build در روت پروژه قرار دارند

## مشکل اصلی که حل شد
**مشکل**: استفاده از `BrowserRouter` در React که با GitHub Pages سازگار نیست
**راه حل**: تغییر به `HashRouter` در `client/src/index.js`

## مراحل دیپلوی

### روش 1: استفاده از gh-pages (توصیه شده)
```bash
cd client
npm run deploy
```

### روش 2: دیپلوی دستی
```bash
cd client
npm run build
xcopy build\* ..\ /E /Y
git add .
git commit -m "Update build files"
git push
```

## تنظیمات GitHub Pages
1. به مخزن GitHub بروید
2. به Settings > Pages بروید
3. Source را روی "Deploy from a branch" تنظیم کنید
4. Branch را "gh-pages" انتخاب کنید
5. Save کنید

## نکات مهم
- **HashRouter** برای GitHub Pages ضروری است (BrowserRouter کار نمی‌کند)
- مسیرهای فایل‌ها باید با `/BaSina/` شروع شوند
- کش مرورگر را پاک کنید تا تغییرات جدید را ببینید

## آدرس سایت
https://code-basina.github.io/BaSina

## عیب‌یابی
- اگر صفحه سفید است: کش مرورگر را پاک کنید
- اگر فایل‌های استاتیک لود نمی‌شوند: مسیر homepage را بررسی کنید
- اگر routing کار نمی‌کند: مطمئن شوید از HashRouter استفاده می‌شود
- اگر 404 می‌گیرید: مطمئن شوید شاخه gh-pages در تنظیمات انتخاب شده

## تغییرات اخیر
- ✅ تغییر از BrowserRouter به HashRouter
- ✅ حذف فایل‌های SPA غیرضروری
- ✅ بهینه‌سازی routing برای GitHub Pages 
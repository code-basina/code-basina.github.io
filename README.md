# کد با سینا - وب سایت آموزش برنامه نویسی

پروژه React برای آموزش برنامه نویسی با رابط کاربری فارسی و RTL.

## ساختار پروژه

```
BaSina/
├── client/          # React Frontend
│   ├── src/         # کدهای React
│   ├── public/      # فایل‌های استاتیک
│   └── build/       # خروجی build (توسط gh-pages مدیریت می‌شود)
├── server/          # Backend Node.js
└── README-DEPLOY.md # راهنمای دیپلوی
```

## نصب و راه‌اندازی

### نصب تمام وابستگی‌ها
```bash
npm run install-all
```

### اجرای توسعه
```bash
npm run dev
```

### Build پروژه
```bash
npm run build
```

## دیپلوی

برای دیپلوی روی GitHub Pages:

```bash
cd client
npm run deploy
```

جزئیات بیشتر در فایل `README-DEPLOY.md`

## تکنولوژی‌ها

- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Deployment**: GitHub Pages

## آدرس سایت

https://code-basina.github.io/BaSina

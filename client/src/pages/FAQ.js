import React from 'react';

const FAQ = () => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-right">
      <h1 className="text-3xl font-bold mb-6 text-primary-700">سوالات متداول</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">چگونه ثبت‌نام کنم؟</h2>
          <p>برای ثبت‌نام کافیست روی دکمه ثبت‌نام کلیک کرده و فرم مربوطه را پر کنید.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">چگونه دوره خریداری کنم؟</h2>
          <p>پس از ورود به حساب کاربری، دوره مورد نظر را به سبد خرید اضافه و پرداخت را انجام دهید.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">چگونه به دوره‌های خریداری شده دسترسی پیدا کنم؟</h2>
          <p>در داشبورد کاربری، بخش "دوره‌های من" را مشاهده کنید.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">در صورت فراموشی رمز عبور چه کنم؟</h2>
          <p>روی گزینه "فراموشی رمز عبور" کلیک کنید و دستورالعمل‌ها را دنبال نمایید.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 
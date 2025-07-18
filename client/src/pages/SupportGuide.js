import React from 'react';

const SupportGuide = () => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-right">
      <h1 className="text-3xl font-bold mb-6 text-primary-700">راهنمای استفاده</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">چگونه از سایت استفاده کنم؟</h2>
        <ol className="list-decimal pr-5 space-y-2 text-secondary-800">
          <li>ثبت‌نام و ورود به حساب کاربری</li>
          <li>جستجو و مشاهده دوره‌ها</li>
          <li>افزودن دوره به سبد خرید و پرداخت</li>
          <li>دسترسی به دوره‌های خریداری شده در داشبورد</li>
          <li>تماس با پشتیبانی در صورت نیاز</li>
        </ol>
      </div>
    </div>
  );
};

export default SupportGuide; 
import React from 'react';

const SupportContact = () => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-right">
      <h1 className="text-3xl font-bold mb-6 text-primary-700">تماس با پشتیبانی</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">راه‌های ارتباط با پشتیبانی</h2>
        <ul className="space-y-2 text-secondary-800">
          <li><b>ایمیل پشتیبانی:</b> <a href="mailto:support@basina.com" className="text-primary-600">support@basina.com</a></li>
          <li><b>تلفن پشتیبانی:</b> <a href="tel:09390000000" className="text-primary-600">09390000000</a></li>
          <li><b>ساعات پاسخگویی:</b> همه روزه ۹ تا ۱۸</li>
        </ul>
      </div>
    </div>
  );
};

export default SupportContact; 
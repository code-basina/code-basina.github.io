import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            صفحه مورد نظر یافت نشد
          </h1>
          <p className="text-gray-600 mb-8">
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری منتقل شده است.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="w-full flex items-center justify-center space-x-2 space-x-reverse px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>بازگشت به صفحه اصلی</span>
          </Link>
          
          <Link
            to="/courses"
            className="w-full flex items-center justify-center space-x-2 space-x-reverse px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Search className="w-5 h-5" />
            <span>مشاهده دوره‌ها</span>
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>اگر فکر می‌کنید این یک خطا است، لطفاً با پشتیبانی تماس بگیرید.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 
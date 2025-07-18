import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { BookOpen, User, Calendar, ShoppingCart, Settings } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const dashboardItems = [
    {
      title: 'دوره‌های من',
      description: 'مشاهده و مدیریت دوره‌های خریداری شده',
      icon: <BookOpen className="w-8 h-8" />,
      link: '/my-courses',
      color: 'bg-blue-500'
    },
    {
      title: 'پروفایل',
      description: 'ویرایش اطلاعات شخصی',
      icon: <User className="w-8 h-8" />,
      link: '/profile',
      color: 'bg-green-500'
    },
    {
      title: 'برنامه کلاسی',
      description: 'مشاهده برنامه کلاس‌های آینده',
      icon: <Calendar className="w-8 h-8" />,
      link: '/schedule',
      color: 'bg-purple-500'
    },
    {
      title: 'سبد خرید',
      description: 'مشاهده و مدیریت سبد خرید',
      icon: <ShoppingCart className="w-8 h-8" />,
      link: '/cart',
      color: 'bg-orange-500'
    },
    {
      title: 'تنظیمات',
      description: 'تنظیمات حساب کاربری',
      icon: <Settings className="w-8 h-8" />,
      link: '/settings',
      color: 'bg-gray-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            داشبورد کاربری
          </h1>
          <p className="text-gray-600">
            خوش آمدید {user?.name || 'کاربر گرامی'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {dashboardItems.map((item, idx) => (
            <div key={item.title} className={`rounded-2xl shadow-lg p-6 flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-purple-100 hover:scale-105 transition-transform duration-200 border-t-4 ${item.color} group`}>
              <div className="mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-blue-700 mb-2 group-hover:text-purple-600 transition-colors duration-200">{item.title}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{item.description}</p>
              <a href={item.link} className="mt-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-200">ورود</a>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            آمار کلی
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">0</div>
              <div className="text-gray-600">دوره‌های خریداری شده</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">0</div>
              <div className="text-gray-600">ساعت یادگیری</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">0</div>
              <div className="text-gray-600">گواهینامه‌ها</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
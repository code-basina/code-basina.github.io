import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, ShoppingCart, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching admin data
    setTimeout(() => {
      setStats({
        totalUsers: 1250,
        totalCourses: 45,
        totalOrders: 890,
        totalRevenue: 125000000
      });
      
      setRecentOrders([
        {
          id: 1,
          user: 'علی احمدی',
          course: 'React.js از مبتدی تا پیشرفته',
          amount: 850000,
          status: 'completed',
          date: '2024-01-15'
        },
        {
          id: 2,
          user: 'مریم کریمی',
          course: 'JavaScript پیشرفته',
          amount: 650000,
          status: 'pending',
          date: '2024-01-14'
        },
        {
          id: 3,
          user: 'سینا محمدی',
          course: 'Node.js و Express',
          amount: 750000,
          status: 'completed',
          date: '2024-01-13'
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'تکمیل شده';
      case 'pending':
        return 'در انتظار';
      case 'cancelled':
        return 'لغو شده';
      default:
        return 'نامشخص';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          داشبورد مدیریت
        </h1>
        <p className="text-gray-600">
          مدیریت و نظارت بر سیستم آموزش آنلاین
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm text-gray-600">کل کاربران</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm text-gray-600">کل دوره‌ها</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm text-gray-600">کل سفارشات</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm text-gray-600">درآمد کل</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()} تومان</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                آخرین سفارشات
              </h2>
              <Link
                to="/admin/orders"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                مشاهده همه
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {order.user}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {order.course}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(order.date).toLocaleDateString('fa-IR')}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {order.amount.toLocaleString()} تومان
                    </p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            اقدامات سریع
          </h2>
          <div className="space-y-3">
            <Link
              to="/admin/courses"
              className="flex items-center space-x-3 space-x-reverse p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="text-blue-900">مدیریت دوره‌ها</span>
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center space-x-3 space-x-reverse p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-green-900">مدیریت کاربران</span>
            </Link>
            <Link
              to="/admin/orders"
              className="flex items-center space-x-3 space-x-reverse p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-900">مدیریت سفارشات</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 
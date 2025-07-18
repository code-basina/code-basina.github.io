import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Simulate fetching courses data
    setTimeout(() => {
      setCourses([
        {
          id: 1,
          title: 'آموزش React.js از مبتدی تا پیشرفته',
          instructor: 'سینا محمدی',
          price: 850000,
          students: 125,
          rating: 4.8,
          status: 'active',
          createdAt: '2024-01-10',
          thumbnail: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=React'
        },
        {
          id: 2,
          title: 'برنامه نویسی JavaScript پیشرفته',
          instructor: 'علی احمدی',
          price: 650000,
          students: 89,
          rating: 4.6,
          status: 'active',
          createdAt: '2024-01-08',
          thumbnail: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=JavaScript'
        },
        {
          id: 3,
          title: 'Node.js و Express.js',
          instructor: 'مریم کریمی',
          price: 750000,
          students: 67,
          rating: 4.7,
          status: 'draft',
          createdAt: '2024-01-05',
          thumbnail: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Node.js'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'فعال';
      case 'draft':
        return 'پیش‌نویس';
      case 'inactive':
        return 'غیرفعال';
      default:
        return 'نامشخص';
    }
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('آیا از حذف این دوره اطمینان دارید؟')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                مدیریت دوره‌ها
              </h1>
              <p className="text-gray-600">
                {courses.length} دوره در سیستم ثبت شده است
              </p>
            </div>
            <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>افزودن دوره جدید</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="جستجو در دوره‌ها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">همه دوره‌ها</option>
                <option value="active">فعال</option>
                <option value="draft">پیش‌نویس</option>
                <option value="inactive">غیرفعال</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courses List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              لیست دوره‌ها
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredCourses.map((course) => (
              <div key={course.id} className="p-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-12 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 space-x-reverse mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {course.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
                        {getStatusText(course.status)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2">
                      مدرس: {course.instructor}
                    </p>
                    
                    <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500">
                      <span>{course.price.toLocaleString()} تومان</span>
                      <span>{course.students} دانشجو</span>
                      <span>⭐ {course.rating}</span>
                      <span>{new Date(course.createdAt).toLocaleDateString('fa-IR')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button className="p-2 text-blue-600 hover:text-blue-800 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:text-green-800 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="p-2 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredCourses.length === 0 && (
              <div className="p-6 text-center">
                <p className="text-gray-500">دوره‌ای یافت نشد</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourses; 
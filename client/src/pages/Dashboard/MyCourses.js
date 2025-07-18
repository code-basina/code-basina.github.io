import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, BookOpen, Star, ExternalLink } from 'lucide-react';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user's courses
    setTimeout(() => {
      setCourses([
        {
          id: 1,
          title: 'آموزش React.js از مبتدی تا پیشرفته',
          instructor: 'سینا محمدی',
          thumbnail: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=React',
          progress: 65,
          totalLessons: 24,
          completedLessons: 16,
          duration: '12 ساعت',
          rating: 4.8,
          lastAccessed: '2024-01-15'
        },
        {
          id: 2,
          title: 'برنامه نویسی JavaScript پیشرفته',
          instructor: 'علی احمدی',
          thumbnail: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=JavaScript',
          progress: 30,
          totalLessons: 18,
          completedLessons: 5,
          duration: '8 ساعت',
          rating: 4.6,
          lastAccessed: '2024-01-10'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            دوره‌های من
          </h1>
          <p className="text-gray-600">
            {courses.length} دوره در حال یادگیری
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              هنوز دوره‌ای خریداری نکرده‌اید
            </h3>
            <p className="text-gray-600 mb-6">
              برای شروع یادگیری، دوره‌های مورد علاقه خود را انتخاب کنید
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              مشاهده دوره‌ها
              <ExternalLink className="mr-2 w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                    {course.progress}% تکمیل شده
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    مدرس: {course.instructor}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{course.rating}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>پیشرفت</span>
                      <span>{course.completedLessons}/{course.totalLessons} درس</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 space-x-reverse">
                    <Link
                      to={`/courses/${course.id}`}
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      ادامه یادگیری
                    </Link>
                    <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500">
                    آخرین بازدید: {new Date(course.lastAccessed).toLocaleDateString('fa-IR')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses; 
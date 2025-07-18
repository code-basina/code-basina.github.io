import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Users, Play } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const CourseCard = ({ course }) => {
  const { addToCart, isInCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelText = (level) => {
    switch (level) {
      case 'beginner':
        return 'مبتدی';
      case 'intermediate':
        return 'متوسط';
      case 'advanced':
        return 'پیشرفته';
      default:
        return level;
    }
  };

  const getCategoryText = (category) => {
    const categories = {
      javascript: 'JavaScript',
      python: 'Python',
      react: 'React',
      nodejs: 'Node.js',
      database: 'پایگاه داده',
      mobile: 'موبایل',
      'block-programming': 'برنامه‌نویسی بلوکی',
      'web-design': 'طراحی وب',
      other: 'سایر',
    };
    return categories[category] || category;
  };

  return (
    <div className="card overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Course Image */}
      <div className="relative">
        <img
          src={course.thumbnail || '/placeholder-course.jpg'}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {course.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {course.discount}% تخفیف
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Category and Level */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-primary-600 font-medium">
            {getCategoryText(course.category)}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(course.level)}`}>
            {getLevelText(course.level)}
          </span>
        </div>

        {/* Title */}
        <Link to={`/courses/${course._id}`}>
          <h3 className="text-lg font-semibold text-secondary-900 mb-2 hover:text-primary-600 transition-colors duration-200 line-clamp-2">
            {course.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
          {course.shortDescription || course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-semibold text-sm">
              {course.instructor?.name?.charAt(0) || 'س'}
            </span>
          </div>
          <span className="text-sm text-secondary-600 mr-2">
            {course.instructor?.name || 'سینا'}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-secondary-500">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{course.duration} ساعت</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{course.enrolledStudents || 0} دانشجو</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
            <span>{course.rating?.average?.toFixed(1) || '0.0'}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            {course.discount > 0 ? (
              <>
                <span className="text-lg font-bold text-primary-600">
                  {formatPrice(course.price - (course.price * course.discount / 100))} تومان
                </span>
                <span className="text-sm text-secondary-500 line-through">
                  {formatPrice(course.price)} تومان
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary-600">
                {formatPrice(course.price)} تومان
              </span>
            )}
          </div>
          
          {isInCart(course._id) ? (
            <span className="text-sm text-green-600 font-medium">در سبد خرید</span>
          ) : (
            <button
              onClick={() => addToCart(course)}
              className="btn-primary text-sm"
            >
              افزودن به سبد
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard; 
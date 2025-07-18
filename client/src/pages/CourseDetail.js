import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Star, Clock, Users, Play, Check, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import toast from 'react-hot-toast';

const CourseDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { addToCart, isInCart } = useCart();
  const queryClient = useQueryClient();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedLessons, setExpandedLessons] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

  // Fetch course details
  const { data: course, isLoading, error } = useQuery(
    ['course', id],
    async () => {
      const response = await axios.get(`/api/courses/${id}`);
      return response.data;
    }
  );

  // Enroll mutation
  const enrollMutation = useMutation(
    async () => {
      const response = await axios.post(`/api/courses/${id}/enroll`);
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success('ثبت‌نام در دوره با موفقیت انجام شد');
        queryClient.invalidateQueries(['course', id]);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'خطا در ثبت‌نام');
      },
    }
  );

  // Add review mutation
  const reviewMutation = useMutation(
    async (reviewData) => {
      const response = await axios.post(`/api/courses/${id}/review`, reviewData);
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success('نظر شما با موفقیت ثبت شد');
        setReviewForm({ rating: 5, comment: '' });
        queryClient.invalidateQueries(['course', id]);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'خطا در ثبت نظر');
      },
    }
  );

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
      other: 'سایر',
    };
    return categories[category] || category;
  };

  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast.error('برای ثبت‌نام ابتدا وارد شوید');
      return;
    }
    enrollMutation.mutate();
  };

  const handleAddToCart = () => {
    addToCart(course);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('برای نظر دادن ابتدا وارد شوید');
      return;
    }
    reviewMutation.mutate(reviewForm);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">خطا در بارگذاری دوره</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-secondary-600 text-lg">دوره یافت نشد</p>
        </div>
      </div>
    );
  }

  const isEnrolled = user?.enrolledCourses?.includes(course._id);
  const isInUserCart = isInCart(course._id);

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="card overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Image */}
            <div className="lg:col-span-2">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-64 lg:h-96 object-cover"
              />
            </div>

            {/* Course Info */}
            <div className="p-6 lg:p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-primary-600 font-medium">
                  {getCategoryText(course.category)}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(course.level)}`}>
                  {getLevelText(course.level)}
                </span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-secondary-900 mb-4">
                {course.title}
              </h1>

              <p className="text-secondary-600 mb-6">
                {course.shortDescription || course.description}
              </p>

              {/* Instructor */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-lg">
                    {course.instructor?.name?.charAt(0) || 'س'}
                  </span>
                </div>
                <div className="mr-3">
                  <p className="font-medium text-secondary-900">
                    {course.instructor?.name || 'سینا'}
                  </p>
                  <p className="text-sm text-secondary-600">مدرس دوره</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-4 h-4 text-secondary-400" />
                  </div>
                  <p className="text-sm text-secondary-600">{course.duration} ساعت</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-4 h-4 text-secondary-400" />
                  </div>
                  <p className="text-sm text-secondary-600">{course.enrolledStudents || 0} دانشجو</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <p className="text-sm text-secondary-600">{course.rating?.average?.toFixed(1) || '0.0'}</p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                {course.discount > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-2xl font-bold text-primary-600">
                        {formatPrice(course.price - (course.price * course.discount / 100))} تومان
                      </span>
                      <span className="text-lg text-secondary-500 line-through">
                        {formatPrice(course.price)} تومان
                      </span>
                    </div>
                    <span className="inline-block bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                      {course.discount}% تخفیف
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-primary-600">
                    {formatPrice(course.price)} تومان
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {isEnrolled ? (
                  <button
                    disabled
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium"
                  >
                    <Check className="w-5 h-5 inline ml-2" />
                    در حال یادگیری
                  </button>
                ) : isInUserCart ? (
                  <span className="block w-full text-center py-3 px-4 bg-green-100 text-green-800 rounded-lg font-medium">
                    در سبد خرید
                  </span>
                ) : (
                  <>
                    <button
                      onClick={handleAddToCart}
                      className="w-full btn-primary py-3"
                    >
                      افزودن به سبد خرید
                    </button>
                    <button
                      onClick={handleEnroll}
                      disabled={enrollMutation.isLoading}
                      className="w-full btn-outline py-3"
                    >
                      {enrollMutation.isLoading ? 'در حال ثبت‌نام...' : 'ثبت‌نام مستقیم'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Course Content Tabs */}
        <div className="card mb-8">
          <div className="border-b border-secondary-200">
            <nav className="flex space-x-8 space-x-reverse">
              {[
                { id: 'overview', label: 'نمای کلی' },
                { id: 'curriculum', label: 'سرفصل‌ها' },
                { id: 'reviews', label: 'نظرات' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-3">درباره این دوره</h3>
                  <p className="text-secondary-600 leading-relaxed">{course.description}</p>
                </div>

                {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-3">آنچه یاد خواهید گرفت</h3>
                    <ul className="space-y-2">
                      {course.whatYouWillLearn.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                          <span className="text-secondary-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {course.requirements && course.requirements.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-3">پیش‌نیازها</h3>
                    <ul className="space-y-2">
                      {course.requirements.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                          <span className="text-secondary-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Curriculum Tab */}
            {activeTab === 'curriculum' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-secondary-900">سرفصل‌های دوره</h3>
                  <button
                    onClick={() => setExpandedLessons(!expandedLessons)}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {expandedLessons ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="space-y-2">
                  {course.lessons?.slice(0, expandedLessons ? undefined : 5).map((lesson, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <Play className="w-4 h-4 text-secondary-400 ml-2" />
                        <span className="text-secondary-900">{lesson.title}</span>
                        {lesson.isFree && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
                            رایگان
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-secondary-500">{lesson.duration} دقیقه</span>
                    </div>
                  ))}
                </div>

                {course.lessons?.length > 5 && !expandedLessons && (
                  <button
                    onClick={() => setExpandedLessons(true)}
                    className="text-primary-600 hover:text-primary-700 mt-4"
                  >
                    مشاهده همه {course.lessons.length} درس
                  </button>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Review Summary */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900">نظرات دانشجویان</h3>
                    <p className="text-secondary-600">
                      {course.rating?.count || 0} نظر • امتیاز {course.rating?.average?.toFixed(1) || '0.0'} از ۵
                    </p>
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= (course.rating?.average || 0)
                            ? 'text-yellow-400 fill-current'
                            : 'text-secondary-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Add Review Form */}
                {isEnrolled && (
                  <div className="border-t border-secondary-200 pt-6">
                    <h4 className="text-lg font-semibold text-secondary-900 mb-4">نظر خود را ثبت کنید</h4>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          امتیاز
                        </label>
                        <div className="flex space-x-2 space-x-reverse">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                              className="text-2xl"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  star <= reviewForm.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-secondary-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          نظر شما
                        </label>
                        <textarea
                          value={reviewForm.comment}
                          onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                          rows={4}
                          className="input-field"
                          placeholder="نظر خود را بنویسید..."
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={reviewMutation.isLoading}
                        className="btn-primary"
                      >
                        {reviewMutation.isLoading ? 'در حال ثبت...' : 'ثبت نظر'}
                      </button>
                    </form>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {course.reviews?.map((review) => (
                    <div key={review._id} className="border-t border-secondary-200 pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-semibold text-sm">
                              {review.user?.name?.charAt(0) || 'ن'}
                            </span>
                          </div>
                          <span className="font-medium text-secondary-900 mr-2">
                            {review.user?.name || 'کاربر'}
                          </span>
                        </div>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-secondary-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {review.comment && (
                        <p className="text-secondary-600">{review.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail; 
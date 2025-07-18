import React, { useState } from 'react';
import { Search, Filter, Grid, List, ChevronLeft, ChevronRight, Code, Users, Lightbulb, Award } from 'lucide-react';
import CourseCard from '../components/Course/CourseCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';

// آرایه استاتیک دوره‌ها
const staticCourses = [
  {
    title: 'برنامه نویسی جاوا اسکریپت',
    shortDescription: 'یادگیری برنامه‌نویسی جاوا اسکریپت از پایه تا پیشرفته با پروژه‌های عملی',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
    enrolledStudents: 45,
    rating: { average: 4.8 },
    level: 'beginner',
    category: 'javascript',
    price: 1200000,
    discount: 20,
    instructor: { name: 'سینا محمدی' },
    duration: 24,
  },
  {
    title: 'برنامه نویسی بلوکی',
    shortDescription: 'یادگیری برنامه‌نویسی با بلوک‌های بصری و ساخت بازی‌ها و انیمیشن‌ها',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop',
    enrolledStudents: 78,
    rating: { average: 4.9 },
    level: 'beginner',
    category: 'block-programming',
    price: 800000,
    discount: 20,
    instructor: { name: 'سینا محمدی' },
    duration: 16,
  },
  {
    title: 'طراحی وب مقدماتی',
    shortDescription: 'یادگیری HTML، CSS و طراحی وب از پایه تا ساخت صفحات زیبا',
    thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop',
    enrolledStudents: 62,
    rating: { average: 4.7 },
    level: 'beginner',
    category: 'web-design',
    price: 1000000,
    discount: 17,
    instructor: { name: 'سینا محمدی' },
    duration: 20,
  },
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  // فیلتر و جستجو روی آرایه استاتیک
  let filteredCourses = staticCourses.filter(course => {
    const matchesSearch = course.title.includes(searchTerm) || (course.shortDescription && course.shortDescription.includes(searchTerm));
    const matchesCategory = selectedCategory ? course.category === selectedCategory : true;
    const matchesLevel = selectedLevel ? course.level === selectedLevel : true;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // مرتب‌سازی
  if (sortBy === 'price') filteredCourses.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') filteredCourses.sort((a, b) => b.price - a.price);
  else if (sortBy === 'rating') filteredCourses.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
  else filteredCourses.sort((a, b) => 0); // پیش‌فرض بدون مرتب‌سازی خاص

  // صفحه‌بندی (در صورت نیاز)
  const limit = 12;
  const totalPages = 1;
  const pagedCourses = filteredCourses.slice(0, limit);

  // شبیه‌سازی coursesData
  const coursesData = { courses: pagedCourses, pagination: { total: filteredCourses.length, current: 1, pages: totalPages } };
  const isLoading = false;
  const error = false;

  const categories = [
    { value: '', label: 'همه دسته‌ها' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'database', label: 'پایگاه داده' },
    { value: 'mobile', label: 'موبایل' },
    { value: 'block-programming', label: 'برنامه‌نویسی بلوکی' },
    { value: 'web-design', label: 'طراحی وب' },
    { value: 'other', label: 'سایر' },
  ];

  const levels = [
    { value: '', label: 'همه سطوح' },
    { value: 'beginner', label: 'مبتدی' },
    { value: 'intermediate', label: 'متوسط' },
    { value: 'advanced', label: 'پیشرفته' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'جدیدترین' },
    { value: 'rating', label: 'بیشترین امتیاز' },
    { value: 'price', label: 'کمترین قیمت' },
    { value: 'price-desc', label: 'بیشترین قیمت' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            دوره‌های برنامه نویسی
          </h1>
          <p className="text-lg text-secondary-600 mb-4">
            بهترین دوره‌های برنامه‌نویسی برای کودکان و نوجوانان؛ با پروژه‌های واقعی، فضای دوستانه و پشتیبانی ویژه والدین.
          </p>
          {/* Challenge Box */}
          <div className="max-w-xl mx-auto mt-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl shadow-lg p-4 flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-yellow-200 flex-shrink-0" />
            <div>
              <h4 className="text-white text-base font-bold mb-0.5">نکته طلایی</h4>
              <p className="text-white text-sm">هر هفته یک مهارت جدید یاد بگیر و در چالش‌های برنامه‌نویسی شرکت کن!</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card p-6 mb-8">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-secondary-400" />
                </div>
                <input
                  type="text"
                  placeholder="جستجو در دوره‌ها..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pr-10"
                />
              </div>
              <button
                type="submit"
                className="btn-primary px-6"
              >
                جستجو
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                دسته‌بندی
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  handleFilterChange();
                }}
                className="input-field"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                سطح
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => {
                  setSelectedLevel(e.target.value);
                  handleFilterChange();
                }}
                className="input-field"
              >
                {levels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                مرتب‌سازی
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  handleFilterChange();
                }}
                className="input-field"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                نمایش
              </label>
              <div className="flex border border-secondary-300 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  <Grid className="w-4 h-4 mx-auto" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'list'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-secondary-700 hover:bg-secondary-50'
                  }`}
                >
                  <List className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-secondary-600">
              {coursesData?.pagination?.total || 0} دوره یافت شد
            </p>
            {coursesData?.pagination && (
              <p className="text-secondary-600">
                صفحه {coursesData.pagination.current} از {coursesData.pagination.pages}
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">خطا در بارگذاری دوره‌ها</p>
            </div>
          ) : coursesData?.courses?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-secondary-600">دوره‌ای یافت نشد</p>
            </div>
          ) : (
            <>
              {/* Courses Grid/List */}
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'space-y-4'
                }
              >
                {coursesData?.courses?.map((course, idx) => (
                  <CourseCard key={idx} course={course} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-2 text-secondary-400 hover:text-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                          page === currentPage
                            ? 'bg-primary-600 text-white'
                            : 'text-secondary-600 hover:bg-secondary-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 text-secondary-400 hover:text-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses; 
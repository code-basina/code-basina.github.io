import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, LogOut, Settings, BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const supportLinks = [
    { name: 'راهنمای استفاده', href: '/support-guide' },
    { name: 'سوالات متداول', href: '/faq' },
    { name: 'تماس با پشتیبانی', href: '/support-contact' },
    { name: 'گزارش مشکل', href: '/report-issue' },
  ];

  const navigation = [
    { name: 'خانه', href: '/' },
    { name: 'دوره‌ها', href: '/courses' },
    { name: 'برنامه کلاس‌ها', href: '/schedule' },
    { name: 'درباره مدرس', href: '/about' },
    { name: 'تماس با من', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-secondary-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 space-x-reverse">
              <img src="/profile.jpg" alt="Logo" style={{ width: 48, height: 48, borderRadius: "50%" }} />
              <span className="text-xl font-bold text-gradient">با سینا</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            {navigation.map((item) =>
              // حذف dropdown پشتیبانی
              !item.dropdown ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-secondary-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ) : null
            )}
          </nav>

          {/* Right side - Cart and User */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              <ShoppingCart className="w-6 h-6" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 space-x-reverse text-secondary-600 hover:text-primary-600 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium">
                    {user?.name}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-secondary-200">
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <BookOpen className="w-4 h-4 ml-2" />
                      داشبورد
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 ml-2" />
                      پروفایل
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                    >
                      <LogOut className="w-4 h-4 ml-2" />
                      خروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 space-x-reverse">
                <Link
                  to="/login"
                  className="text-secondary-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  ورود
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  ثبت‌نام
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-secondary-200">
              {navigation.map((item) =>
                // حذف dropdown پشتیبانی
                !item.dropdown ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-secondary-600 hover:text-primary-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : null
              )}
              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    className="text-secondary-600 hover:text-primary-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ورود
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ثبت‌نام
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 
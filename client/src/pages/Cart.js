import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, ArrowLeft, CreditCard } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    // 10% discount for orders over 500,000 tomans
    return subtotal > 500000 ? subtotal * 0.1 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const handleQuantityChange = (courseId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(courseId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      setLoading(false);
      // Redirect to checkout page
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              سبد خرید شما خالی است
            </h3>
            <p className="text-gray-600 mb-6">
              برای شروع خرید، دوره‌های مورد علاقه خود را به سبد خرید اضافه کنید
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              مشاهده دوره‌ها
            </Link>
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
            سبد خرید
          </h1>
          <p className="text-gray-600">
            {cart.length} دوره در سبد خرید شما
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  دوره‌های انتخاب شده
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-start space-x-4 space-x-reverse">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-24 h-16 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          مدرس: {item.instructor}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <label className="text-sm text-gray-600">تعداد:</label>
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                >
                                  -
                                </button>
                                <span className="px-3 py-1 border-x border-gray-300">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            
                            <div className="text-lg font-semibold text-gray-900">
                              {item.price.toLocaleString()} تومان
                            </div>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                خلاصه سفارش
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>جمع کل:</span>
                  <span>{calculateSubtotal().toLocaleString()} تومان</span>
                </div>
                
                {calculateDiscount() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>تخفیف:</span>
                    <span>-{calculateDiscount().toLocaleString()} تومان</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>مبلغ نهایی:</span>
                    <span>{calculateTotal().toLocaleString()} تومان</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 space-x-reverse px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard className="w-5 h-5" />
                <span>{loading ? 'در حال پردازش...' : 'ادامه خرید'}</span>
              </button>
              
              <div className="mt-4 text-xs text-gray-500 text-center">
                با کلیک روی دکمه بالا، شما قوانین و شرایط استفاده را می‌پذیرید
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 
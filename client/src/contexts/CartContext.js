import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
  total: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        toast.error('این دوره قبلاً در سبد خرید موجود است');
        return state;
      }
      const newItems = [...state.items, action.payload];
      const newTotal = newItems.reduce((sum, item) => sum + item.price, 0);
      return {
        ...state,
        items: newItems,
        total: newTotal,
      };
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      const updatedTotal = filteredItems.reduce((sum, item) => sum + item.price, 0);
      return {
        ...state,
        items: filteredItems,
        total: updatedTotal,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
      };
    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const recalculatedTotal = updatedItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
      return {
        ...state,
        items: updatedItems,
        total: recalculatedTotal,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Add item to cart
  const addToCart = (course) => {
    const cartItem = {
      id: course._id,
      title: course.title,
      price: course.discount > 0 
        ? course.price - (course.price * course.discount / 100)
        : course.price,
      originalPrice: course.price,
      discount: course.discount,
      thumbnail: course.thumbnail,
      instructor: course.instructor?.name || 'سینا',
      duration: course.duration,
    };
    
    dispatch({ type: 'ADD_ITEM', payload: cartItem });
    toast.success('دوره به سبد خرید اضافه شد');
  };

  // Remove item from cart
  const removeFromCart = (courseId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: courseId });
    toast.success('دوره از سبد خرید حذف شد');
  };

  // Clear cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('سبد خرید پاک شد');
  };

  // Update item quantity
  const updateQuantity = (courseId, quantity) => {
    if (quantity < 1) {
      removeFromCart(courseId);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: courseId, quantity } });
  };

  // Get cart item count
  const getCartItemCount = () => {
    return state.items.length;
  };

  // Check if course is in cart
  const isInCart = (courseId) => {
    return state.items.some(item => item.id === courseId);
  };

  // Calculate total with discounts
  const getTotalWithDiscounts = () => {
    return state.items.reduce((sum, item) => {
      const finalPrice = item.discount > 0 
        ? item.price - (item.price * item.discount / 100)
        : item.price;
      return sum + finalPrice;
    }, 0);
  };

  // Get total savings
  const getTotalSavings = () => {
    return state.items.reduce((sum, item) => {
      return sum + (item.originalPrice - item.price);
    }, 0);
  };

  const value = {
    items: state.items,
    total: state.total,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    getCartItemCount,
    isInCart,
    getTotalWithDiscounts,
    getTotalSavings,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 
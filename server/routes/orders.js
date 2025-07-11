const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Course = require('../models/Course');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', auth, [
  body('courses').isArray({ min: 1 }).withMessage('حداقل یک دوره باید انتخاب شود'),
  body('courses.*.courseId').notEmpty().withMessage('شناسه دوره الزامی است'),
  body('paymentMethod').isIn(['online', 'bank_transfer', 'cash']).withMessage('روش پرداخت نامعتبر است')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { courses, paymentMethod, couponCode, billingAddress, notes } = req.body;

    // Get course details and calculate totals
    const courseDetails = [];
    let totalAmount = 0;

    for (const item of courses) {
      const course = await Course.findById(item.courseId);
      if (!course) {
        return res.status(404).json({ message: `دوره با شناسه ${item.courseId} یافت نشد` });
      }

      if (!course.isPublished) {
        return res.status(400).json({ message: `دوره ${course.title} در دسترس نیست` });
      }

      const finalPrice = course.discount > 0 
        ? course.price - (course.price * course.discount / 100)
        : course.price;

      courseDetails.push({
        course: course._id,
        price: finalPrice
      });

      totalAmount += finalPrice;
    }

    // Apply coupon discount if provided
    let couponDiscount = 0;
    if (couponCode) {
      // Here you would implement coupon validation logic
      // For now, we'll use a simple example
      if (couponCode === 'WELCOME10') {
        couponDiscount = totalAmount * 0.1; // 10% discount
      }
    }

    const finalAmount = totalAmount - couponDiscount;

    const order = new Order({
      user: req.user.id,
      courses: courseDetails,
      totalAmount,
      discountAmount: 0, // This would be calculated based on course discounts
      finalAmount,
      paymentMethod,
      couponCode,
      couponDiscount,
      billingAddress,
      notes
    });

    await order.save();

    res.status(201).json({
      message: 'سفارش با موفقیت ایجاد شد',
      order: {
        id: order._id,
        totalAmount: order.totalAmount,
        finalAmount: order.finalAmount,
        status: order.status,
        paymentStatus: order.paymentStatus
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'خطا در ایجاد سفارش' });
  }
});

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const filter = { user: req.user.id };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;
    
    const orders = await Order.find(filter)
      .populate('courses.course', 'title thumbnail price')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'خطا در دریافت سفارش‌ها' });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('courses.course', 'title thumbnail price description')
      .populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({ message: 'سفارش یافت نشد' });
    }

    // Check if user owns this order
    if (order.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'دسترسی غیرمجاز' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'خطا در دریافت سفارش' });
  }
});

// @route   PUT /api/orders/:id/payment
// @desc    Update payment status
// @access  Private
router.put('/:id/payment', auth, [
  body('paymentStatus').isIn(['pending', 'completed', 'failed', 'refunded']).withMessage('وضعیت پرداخت نامعتبر است'),
  body('paymentId').optional().notEmpty().withMessage('شناسه پرداخت الزامی است')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { paymentStatus, paymentId } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'سفارش یافت نشد' });
    }

    // Check if user owns this order
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'دسترسی غیرمجاز' });
    }

    order.paymentStatus = paymentStatus;
    if (paymentId) order.paymentId = paymentId;

    // If payment is completed, enroll user in courses and update order status
    if (paymentStatus === 'completed' && order.status === 'pending') {
      order.status = 'confirmed';
      order.completedAt = new Date();

      // Enroll user in all courses
      const user = await User.findById(req.user.id);
      for (const item of order.courses) {
        if (!user.enrolledCourses.includes(item.course)) {
          user.enrolledCourses.push(item.course);
        }
      }
      await user.save();

      // Update course enrollment counts
      for (const item of order.courses) {
        await Course.findByIdAndUpdate(item.course, {
          $inc: { enrolledStudents: 1 }
        });
      }
    }

    await order.save();

    res.json({
      message: 'وضعیت پرداخت بروزرسانی شد',
      order: {
        id: order._id,
        status: order.status,
        paymentStatus: order.paymentStatus
      }
    });
  } catch (error) {
    console.error('Update payment error:', error);
    res.status(500).json({ message: 'خطا در بروزرسانی وضعیت پرداخت' });
  }
});

// @route   POST /api/orders/validate-coupon
// @desc    Validate coupon code
// @access  Private
router.post('/validate-coupon', auth, [
  body('couponCode').notEmpty().withMessage('کد تخفیف الزامی است'),
  body('totalAmount').isNumeric().withMessage('مبلغ کل باید عدد باشد')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { couponCode, totalAmount } = req.body;

    // Simple coupon validation logic
    // In a real application, you would have a Coupon model
    let discount = 0;
    let isValid = false;
    let message = 'کد تخفیف نامعتبر است';

    if (couponCode === 'WELCOME10') {
      discount = totalAmount * 0.1;
      isValid = true;
      message = 'کد تخفیف ۱۰٪ اعمال شد';
    } else if (couponCode === 'SAVE20') {
      discount = totalAmount * 0.2;
      isValid = true;
      message = 'کد تخفیف ۲۰٪ اعمال شد';
    }

    res.json({
      isValid,
      discount,
      message,
      finalAmount: totalAmount - discount
    });
  } catch (error) {
    console.error('Validate coupon error:', error);
    res.status(500).json({ message: 'خطا در بررسی کد تخفیف' });
  }
});

module.exports = router; 
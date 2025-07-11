const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Course = require('../models/Course');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile with enrolled courses
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('enrolledCourses', 'title thumbnail price instructor');

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'خطا در دریافت پروفایل' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, [
  body('name').optional().notEmpty().withMessage('نام کاربر الزامی است'),
  body('phone').optional().isMobilePhone('fa-IR').withMessage('شماره تلفن معتبر وارد کنید')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, avatar } = req.body;
    const updateFields = {};

    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;
    if (avatar) updateFields.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateFields,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'پروفایل با موفقیت بروزرسانی شد',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'خطا در بروزرسانی پروفایل' });
  }
});

// @route   GET /api/users/enrolled-courses
// @desc    Get user's enrolled courses
// @access  Private
router.get('/enrolled-courses', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const user = await User.findById(req.user.id);
    const skip = (page - 1) * limit;
    
    const courses = await Course.find({
      _id: { $in: user.enrolledCourses }
    })
    .populate('instructor', 'name avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

    const total = user.enrolledCourses.length;

    res.json({
      courses,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get enrolled courses error:', error);
    res.status(500).json({ message: 'خطا در دریافت دوره‌های ثبت‌نام شده' });
  }
});

// @route   GET /api/users/learning-progress
// @desc    Get user's learning progress
// @access  Private
router.get('/learning-progress', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('enrolledCourses', 'title thumbnail duration lessons');

    const progress = user.enrolledCourses.map(course => ({
      courseId: course._id,
      title: course.title,
      thumbnail: course.thumbnail,
      totalLessons: course.lessons.length,
      completedLessons: 0, // This would be tracked in a separate model
      progress: 0 // This would be calculated based on completed lessons
    }));

    res.json(progress);
  } catch (error) {
    console.error('Get learning progress error:', error);
    res.status(500).json({ message: 'خطا در دریافت پیشرفت یادگیری' });
  }
});

// @route   GET /api/users/certificates
// @desc    Get user's certificates
// @access  Private
router.get('/certificates', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('enrolledCourses', 'title thumbnail certificate');

    const certificates = user.enrolledCourses
      .filter(course => course.certificate)
      .map(course => ({
        courseId: course._id,
        title: course.title,
        thumbnail: course.thumbnail,
        issuedAt: new Date(), // This would be tracked in a separate model
        certificateUrl: `/certificates/${course._id}/${user._id}` // This would be generated
      }));

    res.json(certificates);
  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json({ message: 'خطا در دریافت گواهینامه‌ها' });
  }
});

// @route   GET /api/users/dashboard
// @desc    Get user dashboard data
// @access  Private
router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('enrolledCourses', 'title thumbnail duration');

    const totalCourses = user.enrolledCourses.length;
    const totalHours = user.enrolledCourses.reduce((sum, course) => sum + course.duration, 0);
    
    // This would be calculated from actual learning progress
    const completedCourses = 0;
    const inProgressCourses = totalCourses - completedCourses;

    const dashboard = {
      totalCourses,
      completedCourses,
      inProgressCourses,
      totalHours,
      recentCourses: user.enrolledCourses.slice(0, 5),
      // Add more dashboard data as needed
    };

    res.json(dashboard);
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ message: 'خطا در دریافت اطلاعات داشبورد' });
  }
});

// Admin routes
// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private (Admin)
router.get('/', [auth, admin], async (req, res) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    
    const filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.json({
      users,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'خطا در دریافت کاربران' });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID (Admin only)
// @access  Private (Admin)
router.get('/:id', [auth, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('enrolledCourses', 'title thumbnail price');

    if (!user) {
      return res.status(404).json({ message: 'کاربر یافت نشد' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'خطا در دریافت کاربر' });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user (Admin only)
// @access  Private (Admin)
router.put('/:id', [auth, admin], [
  body('role').optional().isIn(['student', 'admin']).withMessage('نقش نامعتبر است'),
  body('isActive').optional().isBoolean().withMessage('وضعیت فعال باید boolean باشد')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'کاربر یافت نشد' });
    }

    res.json({
      message: 'کاربر با موفقیت بروزرسانی شد',
      user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'خطا در بروزرسانی کاربر' });
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete user (Admin only)
// @access  Private (Admin)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'کاربر یافت نشد' });
    }

    // Prevent deleting own account
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ message: 'نمی‌توانید حساب کاربری خود را حذف کنید' });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'کاربر با موفقیت حذف شد' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'خطا در حذف کاربر' });
  }
});

module.exports = router; 
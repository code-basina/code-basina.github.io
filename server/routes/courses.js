const express = require('express');
const { body, validationResult } = require('express-validator');
const Course = require('../models/Course');
const User = require('../models/User');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all published courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, level, search, sort, page = 1, limit = 12 } = req.query;
    
    const filter = { isPublished: true };
    
    if (category) filter.category = category;
    if (level) filter.level = level;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const sortOptions = {};
    if (sort === 'price') sortOptions.price = 1;
    else if (sort === 'price-desc') sortOptions.price = -1;
    else if (sort === 'rating') sortOptions['rating.average'] = -1;
    else if (sort === 'newest') sortOptions.createdAt = -1;
    else sortOptions.createdAt = -1; // Default sort

    const skip = (page - 1) * limit;
    
    const courses = await Course.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('instructor', 'name avatar');

    const total = await Course.countDocuments(filter);

    res.json({
      courses,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'خطا در دریافت دوره‌ها' });
  }
});

// @route   GET /api/courses/featured
// @desc    Get featured courses
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true, isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .populate('instructor', 'name avatar');

    res.json(courses);
  } catch (error) {
    console.error('Get featured courses error:', error);
    res.status(500).json({ message: 'خطا در دریافت دوره‌های ویژه' });
  }
});

// @route   GET /api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name avatar bio')
      .populate('reviews.user', 'name avatar');

    if (!course) {
      return res.status(404).json({ message: 'دوره یافت نشد' });
    }

    if (!course.isPublished) {
      return res.status(404).json({ message: 'دوره یافت نشد' });
    }

    res.json(course);
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ message: 'خطا در دریافت دوره' });
  }
});

// @route   POST /api/courses
// @desc    Create a new course
// @access  Private (Admin)
router.post('/', [auth, admin], [
  body('title').notEmpty().withMessage('عنوان دوره الزامی است'),
  body('description').notEmpty().withMessage('توضیحات دوره الزامی است'),
  body('price').isNumeric().withMessage('قیمت باید عدد باشد'),
  body('category').isIn(['javascript', 'python', 'react', 'nodejs', 'database', 'mobile', 'block-programming', 'web-design', 'other']).withMessage('دسته‌بندی نامعتبر است'),
  body('level').isIn(['beginner', 'intermediate', 'advanced']).withMessage('سطح نامعتبر است'),
  body('duration').isNumeric().withMessage('مدت زمان باید عدد باشد')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const courseData = {
      ...req.body,
      instructor: {
        name: req.user.name,
        bio: req.user.bio || '',
        avatar: req.user.avatar || ''
      }
    };

    const course = new Course(courseData);
    await course.save();

    res.status(201).json({
      message: 'دوره با موفقیت ایجاد شد',
      course
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'خطا در ایجاد دوره' });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update course
// @access  Private (Admin)
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'دوره یافت نشد' });
    }

    res.json({
      message: 'دوره با موفقیت بروزرسانی شد',
      course
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ message: 'خطا در بروزرسانی دوره' });
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete course
// @access  Private (Admin)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'دوره یافت نشد' });
    }

    res.json({ message: 'دوره با موفقیت حذف شد' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ message: 'خطا در حذف دوره' });
  }
});

// @route   POST /api/courses/:id/enroll
// @desc    Enroll in a course
// @access  Private
router.post('/:id/enroll', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'دوره یافت نشد' });
    }

    const user = await User.findById(req.user.id);
    
    // Check if already enrolled
    if (user.enrolledCourses.includes(course._id)) {
      return res.status(400).json({ message: 'شما قبلاً در این دوره ثبت‌نام کرده‌اید' });
    }

    // Add course to user's enrolled courses
    user.enrolledCourses.push(course._id);
    await user.save();

    // Increment enrolled students count
    course.enrolledStudents += 1;
    await course.save();

    res.json({
      message: 'ثبت‌نام در دوره با موفقیت انجام شد',
      course: {
        id: course._id,
        title: course.title,
        thumbnail: course.thumbnail
      }
    });
  } catch (error) {
    console.error('Enroll error:', error);
    res.status(500).json({ message: 'خطا در ثبت‌نام' });
  }
});

// @route   POST /api/courses/:id/review
// @desc    Add review to course
// @access  Private
router.post('/:id/review', auth, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('امتیاز باید بین ۱ تا ۵ باشد'),
  body('comment').optional().isLength({ max: 500 }).withMessage('نظر حداکثر ۵۰۰ کاراکتر باشد')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'دوره یافت نشد' });
    }

    // Check if user is enrolled
    const user = await User.findById(req.user.id);
    if (!user.enrolledCourses.includes(course._id)) {
      return res.status(400).json({ message: 'برای نظر دادن باید در دوره ثبت‌نام کرده باشید' });
    }

    // Check if already reviewed
    const existingReview = course.reviews.find(review => 
      review.user.toString() === req.user.id
    );

    if (existingReview) {
      return res.status(400).json({ message: 'شما قبلاً برای این دوره نظر داده‌اید' });
    }

    const { rating, comment } = req.body;
    
    course.reviews.push({
      user: req.user.id,
      rating,
      comment
    });

    course.updateRating();
    await course.save();

    res.json({
      message: 'نظر شما با موفقیت ثبت شد',
      review: {
        rating,
        comment,
        user: {
          id: req.user.id,
          name: req.user.name,
          avatar: req.user.avatar
        }
      }
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'خطا در ثبت نظر' });
  }
});

// @route   POST /api/courses/seed
// @desc    Seed sample courses (development only)
// @access  Private (Admin)
router.post('/seed', [auth, admin], async (req, res) => {
  try {
    const sampleCourses = require('../data/sample-courses');
    
    let addedCount = 0;
    let skippedCount = 0;
    
    for (const courseData of sampleCourses) {
      // Check if course already exists
      const existingCourse = await Course.findOne({ title: courseData.title });
      
      if (existingCourse) {
        skippedCount++;
        continue;
      }
      
      const course = new Course(courseData);
      await course.save();
      addedCount++;
    }
    
    res.json({
      message: 'دوره‌های نمونه با موفقیت اضافه شدند',
      added: addedCount,
      skipped: skippedCount
    });
  } catch (error) {
    console.error('Seed courses error:', error);
    res.status(500).json({ message: 'خطا در افزودن دوره‌های نمونه' });
  }
});

module.exports = router; 
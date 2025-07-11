const express = require('express');
const { body, validationResult } = require('express-validator');
const Schedule = require('../models/Schedule');
const Course = require('../models/Course');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/schedule
// @desc    Get all scheduled classes
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { course, instructor, status, startDate, endDate, page = 1, limit = 20 } = req.query;
    
    const filter = { isPublic: true };
    
    if (course) filter.course = course;
    if (instructor) filter.instructor = instructor;
    if (status) filter.status = status;
    
    if (startDate || endDate) {
      filter.startTime = {};
      if (startDate) filter.startTime.$gte = new Date(startDate);
      if (endDate) filter.startTime.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;
    
    const schedules = await Schedule.find(filter)
      .populate('course', 'title thumbnail')
      .populate('instructor', 'name avatar')
      .populate('enrolledStudents.user', 'name avatar')
      .sort({ startTime: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Schedule.countDocuments(filter);

    res.json({
      schedules,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get schedules error:', error);
    res.status(500).json({ message: 'خطا در دریافت برنامه کلاس‌ها' });
  }
});

// @route   GET /api/schedule/my-classes
// @desc    Get user's enrolled classes
// @access  Private
router.get('/my-classes', auth, async (req, res) => {
  try {
    const schedules = await Schedule.find({
      'enrolledStudents.user': req.user.id
    })
    .populate('course', 'title thumbnail')
    .populate('instructor', 'name avatar')
    .sort({ startTime: 1 });

    res.json(schedules);
  } catch (error) {
    console.error('Get my classes error:', error);
    res.status(500).json({ message: 'خطا در دریافت کلاس‌های شما' });
  }
});

// @route   GET /api/schedule/:id
// @desc    Get schedule by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate('course', 'title thumbnail description')
      .populate('instructor', 'name avatar bio')
      .populate('enrolledStudents.user', 'name avatar');

    if (!schedule) {
      return res.status(404).json({ message: 'کلاس یافت نشد' });
    }

    res.json(schedule);
  } catch (error) {
    console.error('Get schedule error:', error);
    res.status(500).json({ message: 'خطا در دریافت اطلاعات کلاس' });
  }
});

// @route   POST /api/schedule
// @desc    Create a new schedule
// @access  Private (Admin)
router.post('/', [auth, admin], [
  body('course').notEmpty().withMessage('دوره الزامی است'),
  body('title').notEmpty().withMessage('عنوان کلاس الزامی است'),
  body('startTime').isISO8601().withMessage('زمان شروع معتبر نیست'),
  body('endTime').isISO8601().withMessage('زمان پایان معتبر نیست'),
  body('maxStudents').isInt({ min: 1 }).withMessage('حداکثر تعداد دانشجویان باید حداقل ۱ باشد')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      course,
      title,
      description,
      startTime,
      endTime,
      maxStudents,
      meetingLink,
      meetingPassword,
      platform,
      isRecurring,
      recurringPattern,
      recurringDays,
      endDate,
      materials,
      notes
    } = req.body;

    // Validate course exists
    const courseExists = await Course.findById(course);
    if (!courseExists) {
      return res.status(404).json({ message: 'دوره یافت نشد' });
    }

    // Validate time
    if (new Date(startTime) >= new Date(endTime)) {
      return res.status(400).json({ message: 'زمان پایان باید بعد از زمان شروع باشد' });
    }

    const schedule = new Schedule({
      course,
      instructor: req.user.id,
      title,
      description,
      startTime,
      endTime,
      maxStudents,
      meetingLink,
      meetingPassword,
      platform,
      isRecurring,
      recurringPattern,
      recurringDays,
      endDate,
      materials,
      notes
    });

    await schedule.save();

    res.status(201).json({
      message: 'کلاس با موفقیت برنامه‌ریزی شد',
      schedule
    });
  } catch (error) {
    console.error('Create schedule error:', error);
    res.status(500).json({ message: 'خطا در ایجاد برنامه کلاس' });
  }
});

// @route   PUT /api/schedule/:id
// @desc    Update schedule
// @access  Private (Admin)
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'کلاس یافت نشد' });
    }

    // Check if instructor owns this schedule
    if (schedule.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'دسترسی غیرمجاز' });
    }

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'برنامه کلاس با موفقیت بروزرسانی شد',
      schedule: updatedSchedule
    });
  } catch (error) {
    console.error('Update schedule error:', error);
    res.status(500).json({ message: 'خطا در بروزرسانی برنامه کلاس' });
  }
});

// @route   DELETE /api/schedule/:id
// @desc    Delete schedule
// @access  Private (Admin)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'کلاس یافت نشد' });
    }

    // Check if instructor owns this schedule
    if (schedule.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'دسترسی غیرمجاز' });
    }

    await Schedule.findByIdAndDelete(req.params.id);

    res.json({ message: 'کلاس با موفقیت حذف شد' });
  } catch (error) {
    console.error('Delete schedule error:', error);
    res.status(500).json({ message: 'خطا در حذف کلاس' });
  }
});

// @route   POST /api/schedule/:id/enroll
// @desc    Enroll in a class
// @access  Private
router.post('/:id/enroll', auth, async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'کلاس یافت نشد' });
    }

    // Check if class is full
    if (schedule.isFull) {
      return res.status(400).json({ message: 'کلاس پر است' });
    }

    // Check if user is already enrolled
    const alreadyEnrolled = schedule.enrolledStudents.some(enrollment => 
      enrollment.user.toString() === req.user.id
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'شما قبلاً در این کلاس ثبت‌نام کرده‌اید' });
    }

    await schedule.enrollStudent(req.user.id);

    res.json({
      message: 'ثبت‌نام در کلاس با موفقیت انجام شد',
      schedule: {
        id: schedule._id,
        title: schedule.title,
        startTime: schedule.startTime,
        endTime: schedule.endTime
      }
    });
  } catch (error) {
    console.error('Enroll in class error:', error);
    res.status(500).json({ message: 'خطا در ثبت‌نام در کلاس' });
  }
});

// @route   DELETE /api/schedule/:id/unenroll
// @desc    Unenroll from a class
// @access  Private
router.delete('/:id/unenroll', auth, async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'کلاس یافت نشد' });
    }

    await schedule.unenrollStudent(req.user.id);

    res.json({
      message: 'خروج از کلاس با موفقیت انجام شد'
    });
  } catch (error) {
    console.error('Unenroll from class error:', error);
    res.status(500).json({ message: 'خطا در خروج از کلاس' });
  }
});

// @route   PUT /api/schedule/:id/status
// @desc    Update class status
// @access  Private (Admin)
router.put('/:id/status', [auth, admin], [
  body('status').isIn(['scheduled', 'ongoing', 'completed', 'cancelled']).withMessage('وضعیت نامعتبر است')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status } = req.body;

    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'کلاس یافت نشد' });
    }

    // Check if instructor owns this schedule
    if (schedule.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'دسترسی غیرمجاز' });
    }

    schedule.status = status;
    await schedule.save();

    res.json({
      message: 'وضعیت کلاس بروزرسانی شد',
      status: schedule.status
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'خطا در بروزرسانی وضعیت کلاس' });
  }
});

module.exports = router; 
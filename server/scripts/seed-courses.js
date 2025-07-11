const mongoose = require('mongoose');
const Course = require('../models/Course');
const sampleCourses = require('../data/sample-courses');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/code-with-sina', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

async function seedCourses() {
  try {
    console.log('شروع افزودن دوره‌های نمونه...');
    
    let addedCount = 0;
    let skippedCount = 0;
    
    for (const courseData of sampleCourses) {
      // Check if course already exists
      const existingCourse = await Course.findOne({ title: courseData.title });
      
      if (existingCourse) {
        console.log(`دوره "${courseData.title}" قبلاً وجود دارد.`);
        skippedCount++;
        continue;
      }
      
      const course = new Course(courseData);
      await course.save();
      console.log(`دوره "${courseData.title}" با موفقیت اضافه شد.`);
      addedCount++;
    }
    
    console.log(`\nخلاصه:`);
    console.log(`- ${addedCount} دوره جدید اضافه شد`);
    console.log(`- ${skippedCount} دوره قبلاً وجود داشت`);
    console.log('تمام دوره‌ها با موفقیت پردازش شدند.');
  } catch (error) {
    console.error('خطا در افزودن دوره‌ها:', error);
  } finally {
    mongoose.connection.close();
    console.log('اتصال به پایگاه داده بسته شد.');
  }
}

// Run the script
seedCourses(); 
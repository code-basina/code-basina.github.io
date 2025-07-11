const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'عنوان کلاس الزامی است']
  },
  description: String,
  startTime: {
    type: Date,
    required: [true, 'زمان شروع کلاس الزامی است']
  },
  endTime: {
    type: Date,
    required: [true, 'زمان پایان کلاس الزامی است']
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  maxStudents: {
    type: Number,
    default: 20
  },
  enrolledStudents: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    }
  }],
  meetingLink: {
    type: String
  },
  meetingPassword: {
    type: String
  },
  platform: {
    type: String,
    enum: ['zoom', 'skype', 'google_meet', 'discord', 'other'],
    default: 'zoom'
  },
  status: {
    type: String,
    enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringPattern: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'weekly'
  },
  recurringDays: [{
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  }],
  endDate: {
    type: Date
  },
  materials: [{
    title: String,
    description: String,
    fileUrl: String,
    fileType: String
  }],
  notes: String,
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Calculate duration before saving
scheduleSchema.pre('save', function(next) {
  if (this.startTime && this.endTime) {
    this.duration = Math.round((this.endTime - this.startTime) / (1000 * 60)); // Convert to minutes
  }
  next();
});

// Virtual for checking if class is full
scheduleSchema.virtual('isFull').get(function() {
  return this.enrolledStudents.length >= this.maxStudents;
});

// Virtual for available spots
scheduleSchema.virtual('availableSpots').get(function() {
  return Math.max(0, this.maxStudents - this.enrolledStudents.length);
});

// Method to enroll student
scheduleSchema.methods.enrollStudent = function(userId) {
  if (this.isFull) {
    throw new Error('کلاس پر است');
  }
  
  const alreadyEnrolled = this.enrolledStudents.some(enrollment => 
    enrollment.user.toString() === userId.toString()
  );
  
  if (alreadyEnrolled) {
    throw new Error('شما قبلاً در این کلاس ثبت‌نام کرده‌اید');
  }
  
  this.enrolledStudents.push({ user: userId });
  return this.save();
};

// Method to unenroll student
scheduleSchema.methods.unenrollStudent = function(userId) {
  this.enrolledStudents = this.enrolledStudents.filter(enrollment => 
    enrollment.user.toString() !== userId.toString()
  );
  return this.save();
};

module.exports = mongoose.model('Schedule', scheduleSchema); 
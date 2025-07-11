const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'عنوان دوره الزامی است'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'توضیحات دوره الزامی است']
  },
  shortDescription: {
    type: String,
    maxlength: 200
  },
  price: {
    type: Number,
    required: [true, 'قیمت دوره الزامی است'],
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  category: {
    type: String,
    required: [true, 'دسته‌بندی دوره الزامی است'],
    enum: ['javascript', 'python', 'react', 'nodejs', 'database', 'mobile', 'block-programming', 'web-design', 'other']
  },
  level: {
    type: String,
    required: [true, 'سطح دوره الزامی است'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  duration: {
    type: Number, // in hours
    required: [true, 'مدت زمان دوره الزامی است']
  },
  lessons: [{
    title: String,
    description: String,
    duration: Number, // in minutes
    videoUrl: String,
    isFree: {
      type: Boolean,
      default: false
    }
  }],
  instructor: {
    name: {
      type: String,
      required: [true, 'نام مدرس الزامی است']
    },
    bio: String,
    avatar: String
  },
  thumbnail: {
    type: String,
    required: [true, 'تصویر دوره الزامی است']
  },
  images: [String],
  tags: [String],
  requirements: [String],
  whatYouWillLearn: [String],
  enrolledStudents: {
    type: Number,
    default: 0
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  certificate: {
    type: Boolean,
    default: true
  },
  language: {
    type: String,
    default: 'persian'
  }
}, {
  timestamps: true
});

// Calculate final price based on discount
courseSchema.virtual('finalPrice').get(function() {
  if (this.discount > 0) {
    return this.price - (this.price * this.discount / 100);
  }
  return this.price;
});

// Update average rating
courseSchema.methods.updateRating = function() {
  if (this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating.average = totalRating / this.reviews.length;
    this.rating.count = this.reviews.length;
  }
};

module.exports = mongoose.model('Course', courseSchema); 
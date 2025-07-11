const sampleCourses = [
  {
    title: 'برنامه نویسی جاوا اسکریپت',
    description: 'یادگیری برنامه‌نویسی جاوا اسکریپت از پایه تا پیشرفته. در این دوره شما با مفاهیم اولیه برنامه‌نویسی، متغیرها، حلقه‌ها، توابع و برنامه‌نویسی شیءگرا آشنا خواهید شد. این دوره مناسب برای کودکان و نوجوانان علاقه‌مند به برنامه‌نویسی است.',
    shortDescription: 'یادگیری برنامه‌نویسی جاوا اسکریپت از پایه تا پیشرفته با پروژه‌های عملی',
    price: 1200000,
    originalPrice: 1500000,
    discount: 20,
    category: 'javascript',
    level: 'beginner',
    duration: 24,
    lessons: [
      {
        title: 'معرفی جاوا اسکریپت',
        description: 'آشنایی با زبان برنامه‌نویسی جاوا اسکریپت و محیط توسعه',
        duration: 45,
        videoUrl: 'https://example.com/js-intro.mp4',
        isFree: true
      },
      {
        title: 'متغیرها و انواع داده',
        description: 'یادگیری متغیرها، انواع داده و عملگرها در جاوا اسکریپت',
        duration: 60,
        videoUrl: 'https://example.com/js-variables.mp4',
        isFree: false
      },
      {
        title: 'ساختارهای کنترلی',
        description: 'یادگیری شرط‌ها و حلقه‌ها در جاوا اسکریپت',
        duration: 75,
        videoUrl: 'https://example.com/js-controls.mp4',
        isFree: false
      },
      {
        title: 'توابع',
        description: 'یادگیری تعریف و استفاده از توابع در جاوا اسکریپت',
        duration: 90,
        videoUrl: 'https://example.com/js-functions.mp4',
        isFree: false
      },
      {
        title: 'آرایه‌ها و اشیاء',
        description: 'کار با آرایه‌ها و اشیاء در جاوا اسکریپت',
        duration: 80,
        videoUrl: 'https://example.com/js-arrays-objects.mp4',
        isFree: false
      },
      {
        title: 'پروژه نهایی',
        description: 'ساخت یک پروژه کامل با استفاده از آموخته‌ها',
        duration: 120,
        videoUrl: 'https://example.com/js-final-project.mp4',
        isFree: false
      }
    ],
    instructor: {
      name: 'سینا محمدی',
      bio: 'مدرس برنامه‌نویسی با ۵ سال تجربه در آموزش کودکان و نوجوانان',
      avatar: '/profile.jpg'
    },
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop'
    ],
    tags: ['javascript', 'برنامه‌نویسی', 'وب', 'مبتدی'],
    requirements: [
      'آشنایی با کامپیوتر',
      'علاقه به یادگیری برنامه‌نویسی',
      'سن ۸ تا ۱۶ سال'
    ],
    whatYouWillLearn: [
      'اصول اولیه برنامه‌نویسی',
      'کار با متغیرها و انواع داده',
      'نوشتن شرط‌ها و حلقه‌ها',
      'تعریف و استفاده از توابع',
      'کار با آرایه‌ها و اشیاء',
      'ساخت پروژه‌های عملی'
    ],
    enrolledStudents: 45,
    rating: {
      average: 4.8,
      count: 12
    },
    isPublished: true,
    isFeatured: true,
    certificate: true,
    language: 'persian'
  },
  {
    title: 'برنامه نویسی بلوکی',
    description: 'یادگیری برنامه‌نویسی با استفاده از بلوک‌های بصری. این دوره مناسب برای کودکان و نوجوانانی است که می‌خواهند مفاهیم برنامه‌نویسی را به روشی ساده و جذاب یاد بگیرند. با استفاده از ابزارهای بصری، دانش‌آموزان می‌توانند بازی‌ها و انیمیشن‌های خود را بسازند.',
    shortDescription: 'یادگیری برنامه‌نویسی با بلوک‌های بصری و ساخت بازی‌ها و انیمیشن‌ها',
    price: 800000,
    originalPrice: 1000000,
    discount: 20,
    category: 'block-programming',
    level: 'beginner',
    duration: 16,
    lessons: [
      {
        title: 'معرفی برنامه‌نویسی بلوکی',
        description: 'آشنایی با مفاهیم برنامه‌نویسی بلوکی و ابزارهای مورد نیاز',
        duration: 30,
        videoUrl: 'https://example.com/block-intro.mp4',
        isFree: true
      },
      {
        title: 'حرکت و انیمیشن',
        description: 'یادگیری ایجاد حرکت و انیمیشن با بلوک‌ها',
        duration: 45,
        videoUrl: 'https://example.com/block-movement.mp4',
        isFree: false
      },
      {
        title: 'کنترل و شرط‌ها',
        description: 'یادگیری کنترل شخصیت‌ها و استفاده از شرط‌ها',
        duration: 50,
        videoUrl: 'https://example.com/block-controls.mp4',
        isFree: false
      },
      {
        title: 'صدا و موسیقی',
        description: 'اضافه کردن صدا و موسیقی به پروژه‌ها',
        duration: 40,
        videoUrl: 'https://example.com/block-sound.mp4',
        isFree: false
      },
      {
        title: 'ساخت بازی ساده',
        description: 'ساخت یک بازی کامل با استفاده از آموخته‌ها',
        duration: 90,
        videoUrl: 'https://example.com/block-game.mp4',
        isFree: false
      }
    ],
    instructor: {
      name: 'سینا محمدی',
      bio: 'مدرس برنامه‌نویسی با تخصص در آموزش کودکان و نوجوانان',
      avatar: '/profile.jpg'
    },
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop'
    ],
    tags: ['برنامه‌نویسی بلوکی', 'بازی', 'انیمیشن', 'مبتدی'],
    requirements: [
      'آشنایی با کامپیوتر',
      'علاقه به ساخت بازی و انیمیشن',
      'سن ۶ تا ۱۴ سال'
    ],
    whatYouWillLearn: [
      'مفاهیم اولیه برنامه‌نویسی',
      'کار با بلوک‌های بصری',
      'ایجاد حرکت و انیمیشن',
      'کنترل شخصیت‌ها',
      'اضافه کردن صدا و موسیقی',
      'ساخت بازی‌های ساده'
    ],
    enrolledStudents: 78,
    rating: {
      average: 4.9,
      count: 23
    },
    isPublished: true,
    isFeatured: true,
    certificate: true,
    language: 'persian'
  },
  {
    title: 'طراحی وب مقدماتی',
    description: 'یادگیری طراحی وب از پایه. در این دوره شما با HTML، CSS و اصول طراحی وب آشنا خواهید شد. دانش‌آموزان یاد می‌گیرند چگونه صفحات وب زیبا و کاربردی بسازند و با مفاهیم طراحی ریسپانسیو آشنا می‌شوند.',
    shortDescription: 'یادگیری HTML، CSS و طراحی وب از پایه تا ساخت صفحات زیبا',
    price: 1000000,
    originalPrice: 1200000,
    discount: 17,
    category: 'web-design',
    level: 'beginner',
    duration: 20,
    lessons: [
      {
        title: 'معرفی HTML',
        description: 'آشنایی با زبان نشانه‌گذاری HTML و ساختار صفحات وب',
        duration: 50,
        videoUrl: 'https://example.com/html-intro.mp4',
        isFree: true
      },
      {
        title: 'تگ‌های اصلی HTML',
        description: 'یادگیری تگ‌های مهم HTML برای ساخت محتوا',
        duration: 60,
        videoUrl: 'https://example.com/html-tags.mp4',
        isFree: false
      },
      {
        title: 'معرفی CSS',
        description: 'آشنایی با CSS و استایل‌دهی به صفحات وب',
        duration: 55,
        videoUrl: 'https://example.com/css-intro.mp4',
        isFree: false
      },
      {
        title: 'رنگ‌ها و فونت‌ها',
        description: 'یادگیری کار با رنگ‌ها، فونت‌ها و استایل‌های متنی',
        duration: 45,
        videoUrl: 'https://example.com/css-colors-fonts.mp4',
        isFree: false
      },
      {
        title: 'لایه‌بندی و Flexbox',
        description: 'یادگیری لایه‌بندی صفحات و استفاده از Flexbox',
        duration: 70,
        videoUrl: 'https://example.com/css-layout.mp4',
        isFree: false
      },
      {
        title: 'طراحی ریسپانسیو',
        description: 'یادگیری طراحی ریسپانسیو برای دستگاه‌های مختلف',
        duration: 65,
        videoUrl: 'https://example.com/responsive-design.mp4',
        isFree: false
      },
      {
        title: 'پروژه نهایی',
        description: 'ساخت یک وب‌سایت کامل با استفاده از آموخته‌ها',
        duration: 120,
        videoUrl: 'https://example.com/web-final-project.mp4',
        isFree: false
      }
    ],
    instructor: {
      name: 'سینا محمدی',
      bio: 'مدرس طراحی وب و برنامه‌نویسی با تجربه در آموزش کودکان و نوجوانان',
      avatar: '/profile.jpg'
    },
    thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop'
    ],
    tags: ['HTML', 'CSS', 'طراحی وب', 'مبتدی'],
    requirements: [
      'آشنایی با کامپیوتر',
      'علاقه به طراحی و خلاقیت',
      'سن ۱۰ تا ۱۶ سال'
    ],
    whatYouWillLearn: [
      'اصول HTML و ساختار صفحات وب',
      'کار با CSS و استایل‌دهی',
      'طراحی لایه‌بندی صفحات',
      'کار با رنگ‌ها و فونت‌ها',
      'طراحی ریسپانسیو',
      'ساخت وب‌سایت کامل'
    ],
    enrolledStudents: 62,
    rating: {
      average: 4.7,
      count: 18
    },
    isPublished: true,
    isFeatured: true,
    certificate: true,
    language: 'persian'
  }
];

module.exports = sampleCourses; 
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Users, Clock, Star, ArrowLeft, ArrowRight, Code, Lightbulb, Award, Sparkles, Zap, Rocket, User } from 'lucide-react';
import axios from 'axios';
import CourseCard from '../components/Course/CourseCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import WhyLearnProgramming from '../components/Home/WhyLearnProgramming';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Fetch featured courses
  const { data: featuredCourses, isLoading } = useQuery(
    'featuredCourses',
    async () => {
      const response = await axios.get('/api/courses/featured');
      return response.data;
    }
  );

  const stats = [
    { label: 'کدآموز', value: '50+', icon: Users },
    { label: 'دوره', value: '30+', icon: Play },
    { label: 'ساعت آموزش', value: '500+', icon: Clock },
    { label: 'امتیاز', value: '4.8', icon: Star },
  ];

  const features = [
    {
      title: 'آموزش عملی',
      description: ' یادگیری با پروژه‌های واقعی و تمرینات عملی در کنار مربی',
      icon: '🎯',
    },
    {
      title: 'پشتیبانی 24/7',
      description: 'پشتیبانی کامل و پاسخگویی به سوالات در تمام ساعات شبانه‌روز',
      icon: '💬',
    },
    {
      title: 'دوره های مقرون به صرفه',
      description: 'سطح علمی بالا در کنار قیمتی مقرون به صرفه',
      icon: '💰',
    },
    {
      title: 'دسترسی مادام‌العمر',
      description: 'دسترسی نامحدود به محتوای دوره‌ها',
      icon: '♾️',
    },
  ];

  // Floating particles animation
  const FloatingParticle = ({ delay, duration, x, y }) => (
    <motion.div
      className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-60"
      animate={{
        x: [0, x],
        y: [0, y],
        opacity: [0.6, 0.2, 0.6],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  );

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20 relative overflow-hidden">
        {/* Floating particles */}
        <FloatingParticle delay={0} duration={6} x={100} y={-50} />
        <FloatingParticle delay={2} duration={8} x={-80} y={30} />
        <FloatingParticle delay={4} duration={7} x={60} y={-80} />
        <FloatingParticle delay={1} duration={9} x={-120} y={-20} />
        <FloatingParticle delay={3} duration={5} x={90} y={60} />
        
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-loose">
                  <motion.span 
                    className="text-yellow-300 inline-block"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    با سینا
                  </motion.span>
                  <br />
                  <motion.span 
                    className="text-3xl md:text-5xl inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    آینده فرزندتان را بسازید!
                  </motion.span>
                  <br />
                  <motion.span 
                    className="text-2xl md:text-3xl inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    آموزش برنامه‌نویسی برای کودکان و نوجوانان
                  </motion.span>
                </h1>
              </motion.div>
              
              <motion.p 
                className="text-xl mb-8 text-blue-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                من در «با سینا» با محیطی امن و سرگرم‌کننده، برنامه‌نویسی را به زبان ساده و پروژه‌محور به فرزندان شما آموزش می‌دهم. رشد خلاقیت، تقویت تفکر منطقی و آماده‌سازی برای آینده‌ای روشن، هدیه ما به فرزند شماست.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to="/courses"
                    className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-center transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <Rocket className="w-5 h-5" />
                    مشاهده دوره‌ها
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to="/about"
                    className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-xl font-semibold text-center transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <User className="w-5 h-5" />
                    درباره مدرس
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              {/* Large animated arrow pointing to video */}
              <motion.div
                className="absolute -left-32 top-1/2 transform -translate-y-1/2 z-20"
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0 }}
              >
                <motion.div
                  animate={{
                    x: [-100, 0],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1.5
                  }}
                >
                  <svg 
                    width="140" 
                    height="40" 
                    viewBox="0 0 120 40" 
                    className="text-yellow-300 drop-shadow-lg"
                    fill="currentColor"
                  >
                    {/* White outline */}
                    <path d="M0 20 L100 20 M100 20 L85 5 M100 20 L85 35" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                    {/* Yellow arrow */}
                    <path d="M0 20 L100 20 M100 20 L85 5 M100 20 L85 35" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </motion.div>
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <Play className="w-16 h-16 text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"
          style={{ y }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <motion.div 
                  className="flex justify-center mb-4"
                  whileHover={{ scale: 1.2 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                >
                  <stat.icon className="w-10 h-10 text-primary-600" />
                </motion.div>
                <motion.div 
                  className="text-4xl font-bold text-secondary-900 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-secondary-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-100 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-200 opacity-20 rounded-full blur-2xl z-0"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-200 opacity-20 rounded-full blur-2xl z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              چرا «با سینا» برای فرزند شما؟
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              آموزش برنامه‌نویسی با رویکردی مدرن، پروژه‌محور و متناسب با دنیای نوجوانان و کودکان؛ همراه با پشتیبانی والدین و فضای دوستانه.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Code, color: "text-blue-500", title: "پروژه‌های واقعی و جذاب", desc: "یادگیری با ساخت بازی، اپلیکیشن و ربات؛ تجربه‌ای واقعی و کاربردی" },
              { icon: Users, color: "text-green-500", title: "جامعه دوستانه و حمایتی", desc: "ارتباط با هم‌سن و سال‌ها و پشتیبانی ویژه والدین و مربی" },
              { icon: Lightbulb, color: "text-yellow-400", title: "رشد خلاقیت و تفکر مدرن", desc: "تقویت مهارت حل مسئله و خلاقیت با چالش‌های متنوع برنامه‌نویسی" },
              { icon: Award, color: "text-purple-500", title: "دستاورد و انگیزه", desc: "کسب مدال، گواهینامه و شرکت در چالش‌های هفتگی برای افزایش انگیزه" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card p-6 text-center bg-white/80 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center border border-white/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br from-${feature.color.split('-')[1]}-100 to-${feature.color.split('-')[1]}-200 flex items-center justify-center mb-4`}
                  whileHover={{ scale: 1.2 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </motion.div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">{feature.title}</h3>
                <p className="text-secondary-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Challenge Box */}
          <motion.div 
            className="max-w-2xl mx-auto mt-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl shadow-lg p-6 flex items-center gap-4 border border-white/20"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -5 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
            >
              <Lightbulb className="w-10 h-10 text-yellow-200 flex-shrink-0" />
            </motion.div>
            <div>
              <h4 className="text-white text-lg font-bold mb-1">چالش هفته</h4>
              <p className="text-white text-base">این هفته: یک بازی ساده با جاوااسکریپت بساز و جایزه ببر! <span className="font-semibold">(برای همه سنین)</span></p>
            </div>
          </motion.div>
        </div>
      </section>

       {/* Why Learn Programming Section */}
       <WhyLearnProgramming />

      {/* Featured Courses Section */}
      <section className="py-16 bg-white relative">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50/30"
          style={{ y }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-2">
                دوره‌های ویژه
              </h2>
              <p className="text-secondary-600">
                محبوب‌ترین دوره‌های باسینا را ببینید
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05, x: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to="/courses"
                className="flex items-center space-x-2 space-x-reverse text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                <span>مشاهده همه</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {isLoading ? (
            <motion.div 
              className="flex justify-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <LoadingSpinner />
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {featuredCourses?.slice(0, 6).map((course, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  viewport={{ once: true }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-bg text-white relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-10 left-20 w-20 h-20 bg-yellow-300/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-20 w-16 h-16 bg-blue-300/20 rounded-full"
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              آماده شروع یادگیری هستید؟
            </motion.h2>
            <p className="text-xl mb-8 text-blue-100">
              همین امروز شروع کنید و مهارت‌های برنامه نویسی خود را ارتقا دهید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to="/register"
                  className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  ثبت‌نام رایگان
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to="/courses"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  مشاهده دوره‌ها
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    courses: [
      { name: 'JavaScript', href: '/courses?category=javascript' },
      { name: 'Python', href: '/courses?category=python' },
      { name: 'React', href: '/courses?category=react' },
      { name: 'Node.js', href: '/courses?category=nodejs' },
    ],
    support: [
      { name: 'راهنمای استفاده', href: '/support-guide' },
      { name: 'سوالات متداول', href: '/faq' },
      { name: 'تماس با من', href: '/contact' },
      { name: 'گزارش مشکل', href: '/report-issue' },
    ],
    company: [
      { name: 'درباره ما', href: '/about' },
      { name: 'وبلاگ', href: '/blog' },
    ],
  };

  const socialLinks = [
    { name: 'Github', icon: Github, href: 'https://github.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  ];

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <img src="/profile.jpg" alt="Logo" style={{ width: 28, height: 28, borderRadius: '50%' }} />
              <span className="text-xl font-bold">با سینا</span>
            </div>
            <p className="text-secondary-300 mb-4">
              بهترین پلتفرم آموزش برنامه نویسی برای کودک و نوجوان با کیفیت بالا و پشتیبانی کامل
            </p>
            <div className="flex space-x-4 space-x-reverse">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-400 hover:text-primary-400 transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-4">دوره‌ها</h3>
            <ul className="space-y-2">
              {footerLinks.courses.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">پشتیبانی</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">مجموعه</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-secondary-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left ltr">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Mail className="w-5 h-5 text-primary-400 ml-2" />
              <a href="mailto:basina.com" className="text-secondary-300 hover:text-primary-400">
                basina.com
              </a>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <Phone className="w-5 h-5 text-primary-400 ml-2" />
              <a href="tel:+989392421382" className="text-secondary-300 hover:text-primary-400" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                +98 939 242 1382
              </a>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <MapPin className="w-5 h-5 text-primary-400 ml-2" />
              <span className="text-secondary-300">گیلان، ایران</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-secondary-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-400 text-sm">
              © {currentYear} تمامی حقوق این پلتفورم برای باسینا محفوظ است.
            </p>
            <div className="flex space-x-6 space-x-reverse text-sm">
              <Link to="/privacy" className="text-secondary-400 hover:text-white transition-colors duration-200">
                حریم خصوصی
              </Link>
              <Link to="/terms" className="text-secondary-400 hover:text-white transition-colors duration-200">
                شرایط استفاده
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
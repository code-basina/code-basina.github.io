import React from "react";
import { FaLightbulb, FaRocket, FaUserGraduate, FaLaptopCode, FaChartLine } from "react-icons/fa";

const benefits = [
  { icon: <FaChartLine className="text-blue-500 text-xl ml-2" />, text: "آمادگی فرزندتان برای مشاغل آینده و دنیای دیجیتال" },
  { icon: <FaLightbulb className="text-yellow-400 text-xl ml-2" />, text: "تقویت خلاقیت و مهارت حل مسئله در کودکان و نوجوانان" },
  { icon: <FaRocket className="text-pink-500 text-xl ml-2" />, text: "افزایش اعتماد به نفس و استقلال در یادگیری" },
  { icon: <FaLaptopCode className="text-green-500 text-xl ml-2" />, text: "امکان ساخت بازی، ربات و پروژه‌های جذاب توسط فرزند شما" },
  { icon: <FaUserGraduate className="text-purple-500 text-xl ml-2" />, text: "یادگیری مهارتی ارزشمند در محیطی امن و سرگرم‌کننده" },
];

const WhyLearnProgramming = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl shadow-xl my-12 mx-auto max-w-5xl bg-gradient-to-br from-blue-50 via-white to-purple-50 p-0 md:p-0 flex flex-col md:flex-row items-center">
      {/* تصویر یا آیکون بزرگ */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/3 h-full p-8">
        <img
          src="/profile.jpg"
          alt="برنامه نویسی"
          className="w-40 h-40 object-cover rounded-full border-4 border-blue-200 shadow-lg mb-4 animate-float"
        />
        <span className="text-blue-600 font-bold text-lg mt-2">آینده روشن برای فرزند شما</span>
      </div>
      {/* متن */}
      <div className="w-full md:w-2/3 p-8">
        <h2 className="text-3xl font-extrabold mb-4 text-blue-700 drop-shadow-sm">چرا یادگیری برنامه‌نویسی برای فرزند شما مهم است؟</h2>
        <p className="mb-3 text-gray-700 text-lg leading-relaxed">
          دنیای امروز به سرعت در حال تغییر است و مهارت برنامه‌نویسی یکی از کلیدی‌ترین ابزارهای موفقیت در آینده خواهد بود. با آموزش برنامه‌نویسی، فرزند شما نه تنها سرگرم می‌شود، بلکه مهارت‌هایی ارزشمند برای زندگی و کار آینده‌اش کسب می‌کند.
        </p>
        <p className="mb-4 text-gray-700 text-base">
          ما در «با سینا» با رویکردی جذاب و متناسب با سن کودکان و نوجوانان، این مسیر را برای فرزند شما هموار کرده‌ایم.
        </p>
        <ul className="mt-4 space-y-3">
          {benefits.map((item, idx) => (
            <li key={idx} className="flex items-center bg-white/80 rounded-lg shadow-sm px-4 py-2 hover:bg-blue-50 transition">
              {item.icon}
              <span className="text-gray-800 text-base">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* افکت بصری پس‌زمینه */}
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-blue-200 opacity-30 rounded-full blur-2xl z-0"></div>
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-purple-200 opacity-30 rounded-full blur-2xl z-0"></div>
    </section>
  );
};

export default WhyLearnProgramming; 
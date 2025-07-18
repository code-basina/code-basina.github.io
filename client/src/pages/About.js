import React from 'react';

const About = () => (
  <div className="max-w-3xl mx-auto py-12 px-4 text-right">
    <div className="flex flex-col items-center mb-8">
      <img src="/profile.jpg" alt="Sina Jafarzadeh" className="w-32 h-32 rounded-full shadow-lg mb-4" />
      <h1 className="text-3xl font-bold mb-2">سینا جعفرزاده</h1>
      <h2 className="text-xl text-primary-600 font-semibold mb-2">توسعه‌دهنده وب و مدرس برنامه‌نویسی</h2>
      <p className="text-secondary-700 text-center max-w-xl">
        سلام. سینا جعفرزاده هستم، مهندس برنامه نویسی وب و مدرس برنامه نویسی برای کودک و نوجوان با سابقه ی حرفه ای، به مدت 5 سال.
        من باسینا را تاسیس کردم چون این در مدت جهت یادگیری و پیش برد اهدافم در این حرفه چالش زیادی داشته ام و تجربیاتی کسب کرده ام که علاقه مندم آن ها را برای بچه هایی که به این عرصه علاقه مند هستند، به بهترین روش به اشتراک بزارم. همچنین سابقه تدریس در آموزشگاه‌های معتبر و برگزاری کارگاه‌های برنامه‌نویسی برای سنین مختلف، به من کمک کرده تا آموزش را متناسب با نیازهای کودکان و نوجوانان ارائه دهم.
        تلام دوره های این وب سایت با عشق و دلسوزی طراحی و تدریس می شوند و هدف من ایجاد یک محیط امن، شاد و موثر برای یادگیری فرزند شماست.
      </p>
    </div>

    <section className="mb-8">
      <h3 className="text-2xl font-bold mb-4 text-primary-700">سوابق شغلی</h3>
      <div className="mb-2">
        <b>مجموعه CodingWithBasir (یوتیوب) </b> — دستیار مدرس و توسعه‌دهنده وب (از سال 1399 تا 1402)
        <ul className="list-disc pr-6 text-secondary-800">
          <li>در ساخت فروشگاه الکترونیک Amazona با این مجموعه همکاری کردم .</li>
          <li>به عنوان مدرس به دانشجویان خارجی آموزش برنامه نویسی وب دادم و اشکالاتشون رو به زبان انگلیسی برطرف کردم</li>
        </ul>
      </div>

      <div className="mb-2">
        <b>آموزشگاه فنی و حرفه ای رشدینو در گیلان</b> — مدرس برنامه‌نویسی وب و اسکرچ (از سال 1402 تا 1404)
        <ul className="list-disc pr-6 text-secondary-800">
          <li>در آموزشگاه فنی و حرفه ای رشدینو به مدت دوسال به کدآموزهای نوجوان، برنامه نویسی وب در سطح مقدماتی و پیشرفته آموزش دادم.</li>
          <li>تجربه ی آموزش به کودکان با دوره های اسکرچ، برنامه نویسی بلوکی پیشرفته و بازی سازی مقدماتی.</li>
        </ul>
      </div>

      <div className="mb-2">
        <b>آکادمی آموزش آنلاین ابرکلاس</b> — مدرس برنامه‌نویسی بلوکی پیشرفته و طراحی وب (از سال 1404 تا الان)
        <ul className="list-disc pr-6 text-secondary-800">
          <li>آموزش هوشمندانه دوره های برنامه نویسی بلوکی پیشرفته با زبان برنامه نویسی محبوب جاوااسکریپت به کدآموزهای نونهال و نوجوان. به همراه انجام پروژه بازی سازی در code.org . </li>
          <li>آموزش برنامه نویسی و طراحی وب مقدماتی به نوجوانان برای آمادگی ورود به بازار کار جهانی و در اختیار گذاشتن تجربیات لازم برای شروع کار در این حرفه.</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <h3 className="text-2xl font-bold mb-4 text-primary-700">مهارت‌ها و تکنولوژی‌ها</h3>
      <ul className="list-disc pr-6 text-secondary-800 space-y-1">
        <li><b>تسلط:</b> JavaScript، React، Redux، Node.js، Express، MongoDB، HTML5، CSS3، Git، VS Code</li>
        <li><b>آشنایی:</b> Adobe XD، Figma، Unity2D، C#، Flutter، Dart</li>
      </ul>
    </section>

    <section className="mb-8">
      <h3 className="text-2xl font-bold mb-4 text-primary-700">پروژه‌ها</h3>
      <div className="mb-4">
        <h4 className="font-semibold">فروشگاه اینترنتی کامل (مانند آمازون)</h4>
        <ul className="list-disc pr-6 text-secondary-800">
          <li>طراحی با HTML5 و CSS3</li>
          <li>پیاده‌سازی فرانت‌اند با React و Redux</li>
          <li>ساخت بک‌اند با Node و MongoDB</li>
          <li>اتصال به Paypal و احراز هویت با JWT</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold">سبد خرید تک‌صفحه‌ای</h4>
        <ul className="list-disc pr-6 text-secondary-800">
          <li>بازخورد آنی به کاربر هنگام افزودن کالا</li>
          <li>آشنایی با توسعه وب و تکنولوژی‌های بک‌اند</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <h3 className="text-2xl font-bold mb-4 text-primary-700">تحصیلات</h3>
      <ul className="list-disc pr-6 text-secondary-800">
        <li>دانشگاه ملی و مهارت گیلان — کاردانی نرم‌افزار (۱۴۰۰-۱۴۰۳)</li>
        <li>دانشگاه آزاد اسلامی لاهیجان — کارشناسی مهندسی کامپیوتر (۱۴۰۴ به بعد)</li>
      </ul>
    </section>

    <section className="mb-8">
      <h3 className="text-2xl font-bold mb-4 text-primary-700">جوایز و گواهینامه‌ها</h3>
      <ul className="list-disc pr-6 text-secondary-800">
        <li>گواهینامه Web Developer، bitdegree.org - ۲۰۲۰</li>
        <li>گواهینامه حرفه‌ای Front-End Web Developer، edx.org - ۲۰۱۹</li>
      </ul>
    </section>

    <section>
      <h3 className="text-2xl font-bold mb-4 text-primary-700">راه‌های ارتباطی</h3>
      <ul className="pr-6 text-secondary-800 space-y-1">
        <li><b>ایمیل:</b> sinajafarzadeh.developer@gmail.com</li>
        <li><b>گیت‌هاب:</b> github.com/</li>
        <li><b>لینکدین:</b> linkedin.com/in/</li>
      </ul>
    </section>
  </div>
);

export default About; 
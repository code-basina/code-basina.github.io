import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-right">
      <h1 className="text-3xl font-bold mb-6 text-primary-700">تماس با من</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">اطلاعات تماس</h2>
        <ul className="space-y-2 text-secondary-800">
          <li><b>ایمیل:</b> <a href="mailto:basina.code@gmail.com" className="text-primary-600">basina.code@gmail.com</a></li>
          <li><b>تلفن:</b> <a href="tel:09392421382" className="text-primary-600">09392421382</a></li>
          <li><b>آدرس:</b> گیلان، لاهیجان</li>
          <li><b>اینستاگرام:</b> <a href="https://instagram.com/basina.code" target="_blank" rel="noopener noreferrer" className="text-primary-600">basina.code</a></li>
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">فرم تماس</h2>
        {submitted ? (
          <div className="text-green-600 font-bold">پیام شما با موفقیت ارسال شد!</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">نام</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input-field w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">ایمیل</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input-field w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">پیام</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="input-field w-full min-h-[100px]"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full mt-2"
            >
              ارسال پیام
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact; 
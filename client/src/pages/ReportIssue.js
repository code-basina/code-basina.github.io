import React, { useState } from 'react';

const ReportIssue = () => {
  const [form, setForm] = useState({ email: '', issue: '' });
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
      <h1 className="text-3xl font-bold mb-6 text-primary-700">گزارش مشکل</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">فرم گزارش مشکل</h2>
        {submitted ? (
          <div className="text-green-600 font-bold">مشکل شما با موفقیت ثبت شد!</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="block mb-1 font-medium">شرح مشکل</label>
              <textarea
                name="issue"
                value={form.issue}
                onChange={handleChange}
                className="input-field w-full min-h-[100px]"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full mt-2"
            >
              ارسال گزارش
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReportIssue; 
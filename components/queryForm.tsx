'use client';

import { useState } from 'react';
import emailjs from 'emailjs-com';

const QueryForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!form.email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    const serviceID = 'service_mzsfb3h';
    const templateID = 'template_ur857gv';
    const publicKey = 'exxQgPcdw5t9qRTTc';

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      phone: form.phone,
      message: form.message,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        alert('Message submitted successfully!');
        setForm({ name: '', email: '', phone: '', message: '' });
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert('Failed to send message. Please try again later.');
      });
  };

  return (
    <section className="relative bg-white py-16 px-4">
      {/* Optional Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url('/your-bg.jpg')` }}
      />

      <div className="relative z-10 max-w-3xl mx-auto bg-gray-100 p-8 rounded-lg shadow-md">
        <p className="text-center text-sm text-green-600 font-medium">🟢 For More Query</p>
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">
          Have Any Other <span className="text-yellow-500">Question</span>?
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name, Email, Phone */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center border bg-white px-3 rounded">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 outline-none text-sm"
                required
              />
              <span>👤</span>
            </div>

            <div className="flex items-center border bg-white px-3 rounded">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 outline-none text-sm"
                required
              />
              <span>✉️</span>
            </div>

            <div className="flex items-center border bg-white px-3 rounded">
              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-2 outline-none text-sm"
                required
              />
              <span>📞</span>
            </div>
          </div>

          {/* Message */}
          <div className="flex items-start border bg-white px-3 rounded">
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 outline-none text-sm resize-none"
              required
            />
            <span className="pt-2">🖊️</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-900 transition text-sm w-full sm:w-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default QueryForm;

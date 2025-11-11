"use client";

import { useState } from "react";
import emailjs from "emailjs-com";

const QueryForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    const serviceID = "service_mzsfb3h";
    const templateID = "template_ur857gv";
    const publicKey = "exxQgPcdw5t9qRTTc";

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      phone: form.phone,
      message: form.message,
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        alert("Message submitted successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send message. Please try again later.");
      });
  };

  return (
    <section className="relative bg-gradient-to-tr from-[#FAF5FF] to-[#EDE9FE] py-20 px-4">
      {/* Container Card */}
      <div className="relative z-10 max-w-3xl p-10 mx-auto shadow-xl bg-white/90 backdrop-blur-lg rounded-2xl">
        {/* Headings */}
        <div className="mb-10 text-center">
          <p className="text-[#9333EA] text-sm font-medium">🟣 Let’s Talk</p>
          <h2 className="text-3xl font-bold text-[#1F2937]">
            Got a <span className="text-[#581C87]">Question</span>?
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm">
            Fill the form below and our team will get back to you shortly.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name, Email, Phone */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder=" "
                required
                className="peer w-full bg-white border border-gray-300 rounded-md px-4 pt-5 pb-2 text-sm text-[#1F2937] outline-none focus:border-[#9333EA] focus:ring-1 focus:ring-[#9333EA]"
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-2 text-sm text-[#6B7280] transition-all
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
                  peer-focus:top-2 peer-focus:text-sm"
              >
                Your Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder=" "
                required
                className="peer w-full bg-white border border-gray-300 rounded-md px-4 pt-5 pb-2 text-sm text-[#1F2937] outline-none focus:border-[#9333EA] focus:ring-1 focus:ring-[#9333EA]"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-2 text-sm text-[#6B7280] transition-all
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
                  peer-focus:top-2 peer-focus:text-sm"
              >
                Your Email
              </label>
            </div>

            {/* Phone */}
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder=" "
                required
                className="peer w-full bg-white border border-gray-300 rounded-md px-4 pt-5 pb-2 text-sm text-[#1F2937] outline-none focus:border-[#9333EA] focus:ring-1 focus:ring-[#9333EA]"
              />
              <label
                htmlFor="phone"
                className="absolute left-4 top-2 text-sm text-[#6B7280] transition-all
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
                  peer-focus:top-2 peer-focus:text-sm"
              >
                Mobile Number
              </label>
            </div>
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder=" "
              rows={4}
              required
              className="peer w-full bg-white border border-gray-300 rounded-md px-4 pt-6 pb-2 text-sm text-[#1F2937] outline-none focus:border-[#9333EA] focus:ring-1 focus:ring-[#9333EA] resize-none"
            />
            <label
              htmlFor="message"
              className="absolute left-4 top-3 text-sm text-[#6B7280] transition-all
                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base
                peer-focus:top-3 peer-focus:text-sm"
            >
              Your Message
            </label>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#581C87] hover:bg-[#9333EA] text-white px-8 py-3 rounded-full shadow-md transition-all hover:scale-105 text-sm font-medium"
            >
              Submit Query
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default QueryForm;

"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Has the food undergone lab testing for taste evaluation?",
    answer: "Yes, the food has undergone rigorous lab testing to ensure both taste and quality standards are met consistently.",
  },
  {
    question: "What are the advantages of making an advance payment?",
    answer:
      "Advance payments secure your booking, enable priority service, and help us streamline the delivery process efficiently.",
  },
  {
    question: "How soon can we get emergency delivery?",
    answer:
      "We aim to deliver within 30–45 minutes depending on your location. Emergency dispatch is available 24/7.",
  },
  {
    question: "Are your staff members medically trained?",
    answer:
      "Yes, our team consists of certified and trained professionals with emergency response experience.",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="bg-[#FAF5FF] py-20 px-4 md:px-24">
      {/* Heading */}
      <div className="mb-12 text-center">
        <p className="text-[#9333EA] font-semibold text-lg mb-2">FAQs</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937]">
          Frequently Asked Questions
        </h2>
      </div>

      {/* Grid */}
      <div className="grid items-start gap-12 mx-auto max-w-7xl md:grid-cols-2">
        {/* Left Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/FAQ.jpg"
            alt="FAQ Illustration"
            width={500}
            height={500}
            className="object-contain w-full max-w-sm shadow-xl rounded-xl"
          />
        </div>

        {/* Right FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden transition-all bg-white shadow-md rounded-xl"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left hover:bg-[#EDE9FE] transition duration-300"
              >
                <span className="text-[#1F2937] font-semibold">{faq.question}</span>
                <FaChevronDown
                  className={`text-[#9333EA] transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer Section */}
              <div
                className={`px-5 text-[#4B5563] text-sm leading-relaxed overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 py-4" : "max-h-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

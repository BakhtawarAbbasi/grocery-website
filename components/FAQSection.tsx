'use client';

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Image from 'next/image';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Has the food undergone lab testing for taste evaluation?',
    answer: '',
  },
  {
    question: 'What are the advantages of making an advance payment?',
    answer:
      'Khadi Natural Herbal: Oil – A rejuvenating blend of essential oils and botanical extracts for nourished, radiant skin. Indulge in the goodness of nature for a blissful aromatherapy experience.',
  },
  {
    question: 'Has the food undergone lab testing for taste evaluation?',
    answer: '',
  },
  {
    question: 'Has the food undergone lab testing for taste evaluation?',
    answer: '',
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="bg-white py-16 px-4 md:px-24">

      {/* Top Headings */}
      <div className="text-center mb-12">
        <p className="text-green-600 font-semibold text-lg mb-2">Faq’s</p>
        <h2 className="text-3xl md:text-4xl font-bold">Frequently asked questions</h2>
      </div>

      {/* Grid: Left Image & Right FAQs */}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-start gap-10">
        {/* Left Image */}
        <div className="flex justify-center">
          <Image
            src="/images/faq.PNG" 
            alt="FAQ Illustration"
            width={500}
            height={500}
            className="w-full h-auto max-w-md"
          />
        </div>

        {/* Right Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-md overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-2 py-4 bg-gray-100 hover:bg-gray-200 transition"
              >
                <span className="text-left text-gray-800 font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="text-green-900" />
                ) : (
                  <FaChevronDown className="text-green-900" />
                )}
              </button>
              {openIndex === index && faq.answer && (
                <div className="px-6 py-4 text-sm text-gray-600 bg-white">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

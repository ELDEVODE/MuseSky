import React, { useState } from 'react'

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqItems = [
    {
      question: "Is there a free trial available?",
      answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."
    },
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades will be applied at the start of the next billing cycle."
    },
    {
      question: "What is your cancellation policy?",
      answer: "You can cancel your subscription at any time. Upon cancellation, you'll have access to your account until the end of your current billing period."
    },
    {
      question: "Can other info be added to an invoice?",
      answer: "Yes, you can add custom information to your invoices. Please contact our support team for assistance with adding specific details to your invoices."
    },
    {
      question: "How does billing work?",
      answer: "We bill on a monthly or annual basis, depending on the plan you choose. Payment is due at the beginning of each billing cycle."
    },
    {
      question: "How do I change my account email?",
      answer: "You can change your account email in your profile settings. After changing, you'll need to verify the new email address for security purposes."
    }
  ];

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqItems.map((item, index) => (
        <div key={index} className={`rounded-lg overflow-hidden transition-all duration-100 ease-out ${openIndex === index ? 'bg-[#191919]' : ''}`}>
          <button
            onClick={() => toggleItem(index)}
            className="flex justify-between items-center w-full p-4 text-left"
          >
            <span className="text-white text-lg font-semibold font-['Onest']">{item.question}</span>
            <span className="text-white text-xl border-2 border-[#eaecf0] rounded-full w-6 h-6 flex items-center justify-center">{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index && (
            <div className="px-4 pb-4">
              <p className="text-[#eaecf0] text-base font-normal font-['Onest'] leading-normal">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FAQAccordion
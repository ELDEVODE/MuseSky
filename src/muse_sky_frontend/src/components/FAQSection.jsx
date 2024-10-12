import React from 'react'
import FAQAccordion from './FAQAccordion'

const FAQSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16">
        <div className="w-full md:w-1/3">
          <p className="text-[#eaecf0] text-base font-normal font-onest leading-normal">Support</p>
          <div className="text-white text-3xl md:text-5xl font-semibold font-bricolage my-5">FAQs</div>
          <p className="text-[#eaecf0] text-base font-normal font-onest leading-7">
            Everything you need to know about the product and billing. Can't find the answer you're looking for? Please{' '}
            <a href="#" className="underline">chat to our friendly team</a>.
          </p>
        </div>
        <div className="w-full md:w-2/3">
          <FAQAccordion />
        </div>
      </div>
    </div>
  )
}

export default FAQSection
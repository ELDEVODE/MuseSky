import React from 'react'
import { Spaceman } from '../assets/images'

const FeaturesSection = () => {
  return (
    <div className="h-auto py-8 md:py-12 lg:py-16 bg-gradient-to-r from-[#ffa500] to-[#ffc966] border-2 border-[#ffc252] backdrop-blur-[12.63px] flex flex-col md:flex-row justify-center items-center gap-8 px-4 md:px-6 lg:px-8">
      <div className="flex-col justify-start items-start gap-8 w-full md:w-[500px] lg:w-[416px] flex">
        <div className="self-stretch p-4 bg-[#333333] rounded-xl flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-white text-2xl md:text-3xl font-bold font-bricolage">Our Amazing features</div>
          <div className="w-full text-white text-sm font-normal font-onest leading-6">We try our best to bring you the best available NFTs. We'd like to hear your feedback to make it more impactful</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 w-full">
          {['No gas fee', 'Cheap', 'Secure', 'Web-based'].map((feature, index) => (
            <div key={index} className="w-full sm:w-[200px] md:w-full lg:w-[200px] h-[180px] md:h-[160px] lg:h-[200px] p-4 bg-[#332000]/25 rounded-xl border border-white backdrop-blur-[50px] flex-col justify-start items-start gap-2 inline-flex">
              <div className="self-stretch text-white text-lg md:text-xl font-bold font-bricolage">{feature}</div>
              <div className="self-stretch text-white text-xs md:text-sm font-normal font-onest leading-5">We try our best to bring you the best available NFTs. We'd like to hear your</div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl shadow overflow-hidden flex-col justify-end items-center inline-flex mt-8 md:mt-0">
        <img className="w-full max-w-[300px] md:max-w-[350px] lg:max-w-[600px] h-auto" src={Spaceman} alt="Feature illustration" />
      </div>
    </div>
  )
}

export default FeaturesSection

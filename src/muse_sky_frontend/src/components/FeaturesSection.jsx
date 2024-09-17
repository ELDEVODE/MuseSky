import React from 'react'
import { Spaceman } from '../assets/images'

const FeaturesSection = () => {
  return (
    <div className="h-auto py-16 bg-gradient-to-r from-[#ffa500] to-[#ffc966] border-2 border-[#ffc252] backdrop-blur-[12.63px] flex justify-center items-center gap-8">
      <div className="flex-col justify-start items-start gap-8 w-[416px] flex">
        <div className="self-stretch p-4 bg-[#333333] rounded-xl flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-white text-3xl font-bold font-['Bricolage Grotesque']">Our Amazing features</div>
          <div className="w-full text-white text-sm font-normal font-['Onest'] leading-6">We try out best to bring you the best available NFTs. We'd like to hear your feedback to make it more impactful</div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {['No gas fee', 'Cheap', 'Secure', 'Web-based'].map((feature, index) => (
            <div key={index} className="w-[200px] h-[200px] p-4 bg-[#332000]/25 rounded-xl border border-white backdrop-blur-[50px] flex-col justify-start items-start gap-2 inline-flex">
              <div className="self-stretch text-white text-xl font-bold font-['Bricolage Grotesque']">{feature}</div>
              <div className="self-stretch text-white text-sm font-normal font-['Onest'] leading-5">We try out best to bring you the best available NFTs. We'd like to hear your</div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl shadow overflow-hidden flex-col justify-end items-center inline-flex">
        <img className="w-[600px] h-[600px]" src={Spaceman} alt="Feature illustration" />
      </div>
    </div>
  )
}

export default FeaturesSection
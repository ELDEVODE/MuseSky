import React from 'react'
import { Star10 } from '../assets/svg'

const BannerContent = () => (
  <div className="flex flex-row items-center justify-end gap-5">
    <div className="opacity-20 text-white text-[28px] font-bold font-['Oxanium'] uppercase">MUSESKY</div>
    <div className="w-8 h-8"><img src={Star10} alt="star-10" /></div>
  </div>
)

const Banner = ({ className, direction }) => {
  return (
    <div className={`p-3 bg-white/20 overflow-hidden ${className}`}>
      <div className={`${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}  flex`}>
        {[...Array(15)].map((_, index) => (
          <BannerContent key={index} />
        ))}
      </div>
    </div>
  )
}

export default Banner
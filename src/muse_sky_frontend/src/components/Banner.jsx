import React from 'react'
import { Star10 } from '../assets/svg'

const BannerContent = () => (
  <div className="flex flex-row items-center justify-end space-x-2">
    <div className="opacity-20 text-white text-[18px] font-bold font-oxanium uppercase">MUSESKY</div>
    <div className="w-6 h-6 opacity-80"><img src={Star10} alt="star-10" /></div>
  </div>
)

const Banner = ({ className, direction }) => {
  return (
    <div className={`p-4 bg-white/20 overflow-hidden ${className} w-full`}>
      <div className={`${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right justify-end'}  flex`}>
        {[...Array(25)].map((_, index) => (
          <BannerContent key={index} />
        ))}
      </div>
    </div>
  )
}

export default Banner
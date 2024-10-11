import React from 'react'
import { BannnerFrame1, BannnerFrame2, MUSESKY } from '../assets/svg'
import Banner from './Banner'

const BannerSection = () => {
  return (
    <div className="relative w-full h-[30vh] min-h-[180px] max-h-[300px]  flex flex-col justify-center items-center overflow-hidden">
      <Banner className="rotate-[2deg] relative" direction="left" />
      <div className="h-2"></div>
      <Banner className="relative rotate-[2deg] " direction="right" />
    </div>
  )
}

export default BannerSection
import React from 'react'
import { BannnerFrame1, BannnerFrame2, MUSESKY } from '../assets/svg'
import Banner from './Banner'

const BannerSection = () => {
  return (
    <div className="relative w-full h-[240px] flex flex-col gap-2 justify-center align-center overflow-hidden">
      <Banner className="rotate-[2deg]" direction="left" />

      <Banner className="rotate-[2deg] self-end" direction="right" />

    </div>
  )
}

export default BannerSection
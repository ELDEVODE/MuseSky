import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import {
  YoutubeLogo, TwitterLogo,
  FacebookLogo, GooglePlusLogo
} from '../assets/svg'
import { Logo, vector } from '../assets/images'

function Footer() {
  return (
    <footer className="relative h-[510.01px] p-16 bg-gradient-to-br from-[#ffc866] to-[#e49400] mb-[35px] rounded-sm flex justify-center items-start">
      <img
        className="absolute top-0"
        src={vector} alt="vector"
      />
      <div className="grow shrink basis-0 py-16 bg-white/20 rounded-2xl border-2 border-white backdrop-blur-[39px] flex flex-col justify-start items-center gap-8">
        <div className="flex justify-start items-start gap-48">
          <div className="flex flex-col justify-center items-center gap-2">
            <img
              className="h-[70px]"
              src={Logo} alt="" />
            <div className="text-white text-3xl font-bold font-oxanium uppercase">MUSESKY</div>
          </div>
          <div className="h-[197.01px] flex justify-between items-start">
            <div className="self-stretch py-2 flex flex-col justify-between items-start">
              <div className="grow shrink basis-0 flex flex-col justify-between items-start">
                <div className="w-[295.65px] text-[#5f491f] text-[15.01px] font-medium font-['Onest'] leading-[27.01px]">
                  Musesky is an NFTs marketplace built on the internet computer where you can discover, sell and bid NFTs and get rich
                </div>
                <div className="flex justify-start items-center gap-4 mt-4">
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95">
                    <img src={YoutubeLogo} alt="YouTube" className="w-6 h-6" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95">
                    <img src={TwitterLogo} alt="Twitter" className="w-6 h-6" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95">
                    <img src={FacebookLogo} alt="Facebook" className="w-6 h-6" />
                  </a>
                  <a href="https://plus.google.com" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95">
                    <img src={GooglePlusLogo} alt="Google Plus" className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="h-[197.01px] flex justify-between items-start ml-8">
              <div className="flex flex-col justify-start items-start gap-[13.51px] mr-8">
                <div className="w-[72.04px] text-[#261d0c] text-lg font-bold font-['Onest'] leading-relaxed">About</div>
                <div className="flex flex-col justify-start items-start gap-[1.50px]">
                  <Link to={ROUTES.HOME} className="text-[#5f491f] text-[15.01px] font-medium font-['Onest'] leading-[37.89px] transition-colors duration-200 ease-in-out hover:text-[#261d0c]">About NFT</Link>
                  <Link to={ROUTES.HOME} className="text-[#5f491f] text-[15.01px] font-medium font-['Onest'] leading-[37.89px] transition-colors duration-200 ease-in-out hover:text-[#261d0c]">Live Auctions</Link>
                  <Link to={ROUTES.BLOG} className="text-[#5f491f] text-[15.01px] font-medium font-['Onest'] leading-[37.89px] transition-colors duration-200 ease-in-out hover:text-[#261d0c]">NFT Blog</Link>
                  <Link to={ROUTES.HOME} className="text-[#5f491f] text-[15.01px] font-medium font-['Onest'] leading-[37.89px] transition-colors duration-200 ease-in-out hover:text-[#261d0c]">Activity</Link>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-[13.51px]">
                <div className="w-[72.04px] text-[#261d0c] text-lg font-bold font-['Onest'] leading-relaxed">Support</div>
                <div className="flex flex-col justify-start items-start gap-[1.50px]">
                  <Link to={ROUTES.HOME} className="text-[#5f491f] text-[15.01px] font-medium font-['Onest'] leading-[37.89px] transition-colors duration-200 ease-in-out hover:text-[#261d0c]">Help & Support</Link>
                  <Link to={ROUTES.HOME} className="text-[#5f491f] text-[15.01px] font-medium font-['Onest'] leading-[37.89px] transition-colors duration-200 ease-in-out hover:text-[#261d0c]">Item Details</Link>
                  <Link to={ROUTES.HOME} className="text-[#5f491f] text-[15.01px] font-medium font-['Onest'] leading-[37.89px] transition-colors duration-200 ease-in-out hover:text-[#261d0c]">Author Profile</Link>
                  <Link to={ROUTES.COLLECTION} className="text-[#5f491f] text-[15.01px] font-medium font-['Onest'] leading-[37.89px] transition-colors duration-200 ease-in-out hover:text-[#261d0c]">Collection</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-[0px] px-[100px] flex flex-col justify-start items-start">
          <div className="self-stretch h-[0px] opacity-20 border-2 border-white"></div>
        </div>
        <div className="text-black text-[15.01px] font-normal font-['Onest'] leading-[27.01px]">©2024 MuseSky All rights reserved</div>
      </div>
    </footer>
  )
}

export default Footer
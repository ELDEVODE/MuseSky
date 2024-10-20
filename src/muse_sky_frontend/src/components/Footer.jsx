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
    <footer className="relative h-auto p-8 md:p-16 bg-gradient-to-br from-[#ffc866] to-[#e49400] mb-[35px] rounded-sm flex justify-center items-start">
      <img
        className="absolute top-0 w-full h-full object-cover"
        src={vector} alt="vector"
      />
      <div className="w-full md:w-auto grow shrink basis-0 py-8 md:py-16 px-6 md:px-16 bg-white/20 rounded-2xl border-2 border-white backdrop-blur-[39px] flex flex-col justify-start md:items-center items-start gap-8">
        <div className="w-full flex flex-col md:flex-row justify-start md:justify-between items-start md:mx-auto md:w-[85%] gap-8 md:gap-48">
          <div className="flex flex-col justify-center items-start gap-2">
            <img
              className="h-[60px] md:h-[70px]"
              src={Logo} alt="" />
            <div className="text-white text-base md:text-lg font-bold font-oxanium uppercase">MUSESKY</div>
          </div>
          <div className="w-full md:grow flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0">
            <div className="w-auto flex flex-col justify-between items-start">
              <div className="w-full md:w-[295.65px] text-left text-[#5f491f] text-sm md:text-[15.01px] font-medium font-onest leading-[24px] md:leading-[27.01px]">
                Musesky is an NFTs marketplace built on the internet computer where you can discover, sell and bid NFTs and get rich
              </div>
              <div className="flex justify-start items-center gap-4 mt-4">
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95">
                  <img src={YoutubeLogo} alt="YouTube" className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95">
                  <img src={TwitterLogo} alt="Twitter" className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95">
                  <img src={FacebookLogo} alt="Facebook" className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a href="https://plus.google.com" target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95">
                  <img src={GooglePlusLogo} alt="Google Plus" className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              </div>
            </div>
            <div className="w-auto md:w-auto flex flex-row justify-between md:justify-start items-start gap-8 md:gap-16 md:ml-8">
              <div className="flex flex-col justify-start items-start gap-[13.51px]">
                <div className="text-[#261d0c] text-base md:text-lg font-bold font-onest leading-relaxed">About</div>
                <div className="flex flex-col justify-start items-start gap-[1.50px]">
                  <Link to={ROUTES.HOME} className="text-[#5f491f] text-sm md:text-[15.01px] font-medium font-onest leading-[32px] md:leading-[37.89px] transition-colors duration-200 ease-in-out hover:text-[#261d0c]">About NFT</Link>
                  <Link to={ROUTES.HOME} className="text-[#5f491f] text-sm md:text-[15.01px] font-medium font-onest leading-[32px] md:leading-[37.89px] transition-colors duration-200 ease-in-out hover:text-[#261d0c]">Live Auctions</Link>
                  <Link to={ROUTES.BLOG} className="text-[#5f491f] text-sm md:text-[15.01px] font-medium font-onest leading-[32px] md:leading-[37.89px] transition-colors duration-200 ease-in-out hover:text-[#261d0c]">NFT Blog</Link>
                  <Link to={ROUTES.HOME} className="text-[#5f491f] text-sm md:text-[15.01px] font-medium font-onest leading-[32px] md:leading-[37.89px] transition-colors duration-200 ease-in-out hover:text-[#261d0c]">Activity</Link>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-[13.51px]">
                <div className="text-[#261d0c] text-base md:text-lg font-bold font-onest leading-relaxed">Support</div>
                <div className="flex flex-col justify-start items-start gap-[1.50px]">
                  <Link to={ROUTES.HOME} className="text-[#5f491f] text-sm md:text-[15.01px] font-medium font-onest leading-[32px] md:leading-[37.89px] transition-colors duration-200 ease-in-out hover:text-[#261d0c]">Help & Support</Link>
                  <Link to={ROUTES.HOME} className="text-[#5f491f] text-sm md:text-[15.01px] font-medium font-onest leading-[32px] md:leading-[37.89px] transition-colors duration-200 ease-in-out hover:text-[#261d0c]">Item Details</Link>
                  <Link to={ROUTES.HOME} className="text-[#5f491f] text-sm md:text-[15.01px] font-medium font-onest leading-[32px] md:leading-[37.89px] transition-colors duration-200 ease-in-out hover:text-[#261d0c]">Author Profile</Link>
                  <Link to={ROUTES.COLLECTION} className="text-[#5f491f] text-sm md:text-[15.01px] font-medium font-onest leading-[32px] md:leading-[37.89px] transition-colors duration-200 ease-in-out hover:text-[#261d0c]">Collection</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[0px] flex flex-col justify-start items-start px-4 md:px-[100px]">
          <div className="w-full h-[0px] opacity-20 border-t-2 border-white"></div>
        </div>
        <div className="text-black text-xs md:text-[15.01px] font-normal font-onest leading-normal md:leading-[27.01px]">©2024 MuseSky All rights reserved</div>
      </div>
    </footer>
  )
}

export default Footer
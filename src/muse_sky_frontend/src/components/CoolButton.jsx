import React from 'react'
import { Subtract } from '../assets/images'
import { SubtractMask } from '../assets/svg'

const CoolButton = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`w-[240px] h-12 relative bg-transparent focus:outline-none focus:ring-2 focus:ring-[#ffc252] focus:ring-opacity-50 group ${className}`}
      aria-label="Collect Now"
    >
      <div className="w-[70%] h-12 absolute left-[34.7px] top-0 align-center rounded-lg bg-[#ffb6523f] shadow-[0_0_10px_8px_rgba(255,194,82,0.3)] group-hover:shadow-[0_0_20px_10px_rgba(255,194,82,0.4)] 
                 transition-shadow duration-300 ease-in-out"></div>
      <div
        className="w-44 h-12 left-[30px] flex items-center justify-center top-0 absolute bg-subtract bg-center bg-no-repeat
        [mask-image:url('../src/assets/svg/Subtract.svg')] [mask-size:100%_100%]"
      />

      <div className="w-[27px] h-[27px] left-[17px] top-[5px] absolute origin-top-left rotate-45 bg-white/20 rounded-[4px] border border-[#ffc966] backdrop-blur-[12.63px] group-hover:animate-go-left group-hover:left-[12px] transition-position duration-100 ease-out" />
      <div className={`flex h-[29px] w-full relative justify-center items-center `}>
        <span className="z-3 text-[#201604] text-base font-semibold font-['Archivo'] group-hover:animate-bounce-text">{children}</span>
      </div>
      <div className="w-[27px] h-[27px] left-[219px] top-[5px] absolute origin-top-left rotate-45 bg-white/20 rounded-[4px] border border-[#ffc966] backdrop-blur-[12.63px] group-hover:animate-stretch-right group-hover:left-[224px] transition-position duration-100 ease-out" />
    </button>
  )
}

export default CoolButton
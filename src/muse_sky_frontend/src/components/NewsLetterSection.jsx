import React from 'react'

const NewsLetterSection = () => {
  return (
    <div className="w-full h-auto md:h-[350px] p-4 md:p-16 flex-col justify-center items-center gap-2 inline-flex">
      <div className="self-stretch flex-col justify-center items-center gap-8 flex">
        <div className="self-stretch text-center text-[#f5fbf2] text-2xl md:text-4xl font-bold font-bricolage leading-tight">Ready for Next NFT Drop?</div>
        <div className="w-full max-w-[400px] h-[60px] p-1.5 rounded-xl border-2 border-[#ffc252] flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch grow shrink basis-0 justify-between items-center inline-flex">
            <input type="email" className="w-full h-full p-2 text-[#a89f8e] bg-transparent outline-none text-sm font-normal font-onest leading-7" placeholder="info@gmail.com" />
            <button className="w-12 self-stretch px-3 bg-[#ffc252] rounded-lg flex-col justify-center text-xl font-extrabold items-center gap-2 inline-flex transition-all duration-300 ease-in-out hover:bg-[#ffb01f] hover:shadow-lg active:bg-[#ffa500] active:shadow-inner active:transform active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsLetterSection
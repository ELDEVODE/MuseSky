import React from 'react'
import DisplayCard from '../components/DisplayCard'
import { Rectangle25 } from '../assets/images'


const CollectionDetails = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center py-20'>
        <DisplayCard imageUrl={Rectangle25} />
      </div>

      {/* <div className="h-[976px] py-[50px] flex flex-col justify-start items-center gap-[30px]">
        <div className="w-full h-[876px] px-[100px] flex flex-col justify-start items-start gap-[30px]">
          <div className="flex flex-col justify-start items-start gap-[150px]">
            <div className="flex flex-col justify-start items-center gap-[30px]">
              <div className="flex flex-col justify-start items-start gap-2.5">
                <div className="text-white text-[51px] font-semibold font-['Bricolage Grotesque'] capitalize leading-[56.10px]">The Orbitians</div>
                <div className="text-[#858584] text-[22px] font-normal font-['Onest'] capitalize leading-9">Minted on Sep 30, 2022</div>
              </div>
              <div className="flex flex-col justify-start items-start gap-[30px]">
                <div className="flex flex-col justify-start items-start gap-2.5">
                  <div className="text-[#858584] text-[22px] font-bold font-['Bricolage Grotesque'] capitalize leading-9">Created By</div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-start gap-2.5">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <img className="w-6 h-6 rounded-[120px]" src="https://via.placeholder.com/24x24" />
                      </div>
                    </div>
                    <div className="text-white text-[22px] font-semibold font-['Onest'] capitalize leading-[30.80px]">Orbitian</div>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-2.5">
                  <div className="w-[510px] text-[#858584] text-[22px] font-bold font-['Bricolage Grotesque'] capitalize leading-9">Description</div>
                  <div className="text-white text-base font-normal font-['Onest'] leading-relaxed">The Orbitians<br />is a collection of 10,000 unique NFTs on the Ethereum blockchain,   There are all sorts of beings in the NFT Universe. The most advanced and friendly of the bunch are Orbitians.  They live in a metal space machines, high up in the sky and only have one foot on Earth.<br/>These Orbitians are a peaceful race, but they have been at war with a group of invaders for many generations. The invaders are called Upside-Downs, because of their inverted bodies that live on the ground, yet do not know any other way to be. Upside-Downs believe that they will be able to win this war if they could only get an eye into Orbitian territory, so they've taken to make human beings their target.</div>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-2.5">
                <div className="text-[#858584] text-[22px] font-bold font-['Space Mono'] capitalize leading-9">Details</div>
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 relative" />
                  <div className="text-white text-[22px] font-normal font-['Work Sans'] leading-9">View on Etherscan</div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 relative" />
                  <div className="text-white text-[22px] font-normal font-['Work Sans'] leading-9">View Original</div>
                </div>
                <div className="flex flex-col justify-start items-start gap-5">
                  <div className="text-[#858584] text-[22px] font-semibold font-['Work Sans'] capitalize leading-[30.80px]">Tags</div>
                  <div className="flex items-start gap-5">
                    <div className="px-[30px] bg-[#3b3b3b] rounded-[20px] flex items-center gap-3">
                      <div className="text-center text-white text-base font-semibold font-['Work Sans'] uppercase leading-snug">Animation</div>
                    </div>
                    <div className="px-[30px] bg-[#3b3b3b] rounded-[20px] flex items-center gap-3">
                      <div className="text-center text-white text-base font-semibold font-['Work Sans'] uppercase leading-snug">Illustration</div>
                    </div>
                    <div className="px-[30px] bg-[#3b3b3b] rounded-[20px] flex items-center gap-3">
                      <div className="text-center text-white text-base font-semibold font-['Work Sans'] uppercase leading-snug">Moon</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default CollectionDetails

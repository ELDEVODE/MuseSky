import React from 'react';
import { FiX } from 'react-icons/fi';
import { CoolButton } from './';
import { weatherIcons } from '../testdata/nftData';

const CheckoutModal = ({ nft, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#3b3b3b] pb-4 mb:pb-unset rounded-2xl w-full max-w-xl mx-auto max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 sm:p-6 md:px-8">
          <h2 className="text-white text-2xl sm:text-3xl font-semibold font-['Bricolage Grotesque']">Checkout</h2>
          <button
            onClick={onClose}
            className="p-2 bg-black rounded-lg border border-[#ffc252] transition-colors duration-200 ease-in-out group hover:bg-[#ffc252]"
          >
            <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-colors duration-200 ease-in-out group-hover:text-black" />
          </button>
        </div>

        <div className="overflow-y-auto flex-grow">
          <div className="p-4 md:pt-0 sm:p-6 md:p-8 pt-0">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="w-full sm:w-1/2 aspect-[3/4] rounded-sm overflow-hidden relative">
                <img
                  className="w-full h-full object-cover"
                  src={nft.image || "https://via.placeholder.com/269x333"}
                  alt={nft.title}
                />
                <div className="absolute bottom-3 left-3 right-3 bg-black/50 rounded-lg p-2 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-xs sm:text-sm">{nft.location || 'Unknown Location'}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl">{weatherIcons[nft.current_weather]}</span>
                      <span className="text-white text-xs sm:text-sm">{nft.current_weather}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-1/2 flex flex-col justify-between">
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-white text-xl sm:text-2xl font-semibold font-['Bricolage Grotesque']">{nft.title}</h3>
                  <div>
                    <p className="text-[#e6e6eb] text-xs sm:text-sm">Price</p>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-lg sm:text-xl font-medium">{nft.basePrice} ckBTC</span>
                      <span className="text-[#e6e6eb] text-xs sm:text-sm">({nft.priceUSD})</span>
                    </div>
                  </div>

                  <hr className="border-[#6b6785]" />

                  <div className="flex justify-between text-sm">
                    <span className="text-[#ceccd6]">Your balance</span>
                    <span className="text-white font-medium">7.00698 ckBTC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#ceccd6]">Service fee</span>
                    <span className="text-white font-medium">0 ckBTC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#ceccd6]">You will pay</span>
                    <span className="text-white font-medium">{nft.basePrice} ckBTC</span>
                  </div>

                  <hr className="border-[#6b6785]" />
                </div>

                <div className="mt-4 sm:mt-6 mx-auto">
                  <CoolButton onClick={() => console.log('Purchase confirmed')}>
                    Purchase now
                  </CoolButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;

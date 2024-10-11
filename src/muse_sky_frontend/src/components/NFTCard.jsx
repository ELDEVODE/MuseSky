import React, { useState, useEffect } from 'react';
import { weatherConditions, weatherIcons } from '../testdata/nftData';

const NFTCard = ({ nft }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentWeather, setCurrentWeather] = useState(nft.current_weather);

  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % nft.all_images.length;
          setCurrentWeather(weatherConditions[newIndex]);
          return newIndex;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isHovered, nft.all_images.length]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
    setCurrentWeather(nft.current_weather);
  };

  return (
    <div
      className="aspect-[3/4] w-full bg-[#2a2a2a] rounded-[20px] border border-white flex-col justify-start items-center inline-flex overflow-hidden relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500"
        src={isHovered ? nft.all_images[currentImageIndex] : nft.image}
        alt={nft.title}
      />
      <div className="absolute top-2 right-2 bg-black/50 rounded-full p-2 backdrop-blur-sm">
        <span className="text-2xl">{weatherIcons[currentWeather]}</span>
      </div>
      <div className="w-full h-[25%] p-4 bg-black/50 backdrop-blur-[3.62px] flex-col justify-between items-center flex absolute bottom-0 left-0">
        <div className="self-stretch h-full flex-col justify-center items-start gap-[4px] flex">
          <div className="self-stretch text-white text-base font-semibold font-['Bricolage Grotesque'] capitalize leading-tight">
            {nft.title}
          </div>
          <div className="text-white text-sm">Current: {nft.current_weather}</div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;

import React, { useState, useEffect } from 'react';
import DisplayCard from './DisplayCard';
import { Rectangle25, Rectangle26, Rectangle27, Rectangle28, Rectangle29, Rectangle30, Rectangle31 } from '../assets/images';
import useImagePreloader from '../hooks/useImagePreloader';

const theimages = [
  Rectangle25,
  Rectangle26,
  Rectangle27,
  Rectangle28,
  Rectangle29,
  Rectangle30,
  Rectangle31,
];

const CardCarousel = ({ images = theimages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const imagesPreloaded = useImagePreloader(images);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change card every 3 seconds

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [images.length]);

  const getCardStyle = (index) => {
    if (images.length === 0) return {};

    const diff = (index - currentIndex + images.length) % images.length;
    let translateX = 0;
    let scale = 1;
    let zIndex = 0;
    let brightness = 100;

    if (diff === 0) {
      zIndex = 3;
    } else if (diff === 1 || diff === images.length - 1) {
      translateX = diff === 1 ? 50 : -50;
      scale = 0.85;
      zIndex = 2;
      brightness = 70;
    } else {
      translateX = diff === 2 ? 100 : -100;
      scale = 0.7;
      zIndex = 1;
      brightness = 40;
    }

    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      zIndex,
      filter: `brightness(${brightness}%)`,
      display: diff <= 2 || diff >= images.length - 2 ? 'block' : 'none',
    };
  };

  if (images.length === 0) {
    return <div>No images to display</div>;
  }

  const cardWidth = isMobile ? "250px" : "306px";
  const cardHeight = isMobile ? "325px" : "400px";

  if (!imagesPreloaded) {
    return (
      <div className="flex justify-center items-center h-[400px] md:h-[530px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="relative h-[400px] md:h-[530px] w-full px-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute transition-all duration-500 ease-in-out"
            style={getCardStyle(index)}
          >
            <DisplayCard
              width={cardWidth}
              height={cardHeight}
              imageUrl={image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;

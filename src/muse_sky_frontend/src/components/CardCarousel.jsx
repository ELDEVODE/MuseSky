import React, { useState, useEffect } from 'react';
import DisplayCard from './DisplayCard';
import { Rectangle25, Rectangle26, Rectangle27, Rectangle28, Rectangle29, Rectangle30, Rectangle31 } from '../assets/images';

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

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change card every 3 seconds

    return () => clearInterval(interval);
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
    };
  };

  if (images.length === 0) {
    return <div>No images to display</div>;
  }

  return (
    <div className="relative h-[530px] w-full px-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute transition-all duration-500 ease-in-out"
            style={getCardStyle(index)}
          >
            <DisplayCard
              width="306px"
              height="400px"
              imageUrl={image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
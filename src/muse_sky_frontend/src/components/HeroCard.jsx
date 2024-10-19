import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sunny, cloudy, rainy, snowy, sunnySkeleton, cloudySkeleton, rainySkeleton, snowySkeleton } from '../assets/images';
import GlitchEffect from './GlitchEffect';

// Preload images
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

function HeroCard() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const skeletonImages = [sunnySkeleton, cloudySkeleton, rainySkeleton, snowySkeleton];
  const weatherImages = [sunny, cloudy, rainy, snowy];
  const imageCache = useRef(new Map());

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imagePromises = [...skeletonImages, ...weatherImages].map(src =>
          imageCache.current.has(src) ? imageCache.current.get(src) : preloadImage(src)
        );
        const loadedImages = await Promise.all(imagePromises);
        loadedImages.forEach((img, index) => {
          const src = index < skeletonImages.length ? skeletonImages[index] : weatherImages[index - skeletonImages.length];
          imageCache.current.set(src, img);
        });
        setImagesLoaded(true);
      } catch (error) {
        console.error('Failed to preload images:', error);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const intervalId = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % weatherImages.length);
        setTimeout(() => {
          setIsGlitching(false);
        }, 300); // Duration of the glitch effect
      }, 100);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [imagesLoaded]);

  const weatherEffects = [
    'drop-shadow-[0_0_10px_rgba(255,165,0,0.7)] brightness-110', // Sunny
    'drop-shadow-[0_0_10px_rgba(169,169,169,0.7)] brightness-90', // Cloudy
    'drop-shadow-[0_0_10px_rgba(0,0,255,0.5)] brightness-100', // Rainy
    'drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] brightness-125', // Snowy
  ];

  const floatingAnimation = {
    y: [0, -10, 0],
    rotate: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="w-full md:w-[350px] h-[400px] relative group">
      <div className="w-full h-full p-3 absolute rounded-2xl border border-[#ffaa0c] flex-col justify-start items-start inline-flex overflow-visible">
        <div className="w-full h-[300px] mx-auto bg-white/20 rounded-xl overflow-hidden relative">
          <GlitchEffect isActive={isGlitching}>
            <img
              key={currentImageIndex}
              className="w-full h-auto object-cover object-top"
              src={skeletonImages[currentImageIndex]}
              alt="NFT Preview"
            />
          </GlitchEffect>
        </div>
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={currentImageIndex}
            className="absolute top-[2%] right-[-7%] w-[25%] h-auto"
            initial={{ x: '100%', opacity: 0, rotate: -45 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            exit={{ x: '-100%', opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }} // Reduced duration for faster transition
          >
            <motion.div
              className={`w-full h-full ${weatherEffects[currentImageIndex]}`}
              animate={pulseAnimation}
            >
              <motion.img
                src={weatherImages[currentImageIndex]}
                alt="Weather Icon"
                className="w-full h-full"
                animate={floatingAnimation}
                whileHover={{ scale: 1.1, rotate: 15 }}
                style={{ originX: 0.5, originY: 0.5 }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="bottom flex flex-row justify-between w-full mt-2">
          <div className="flex flex-col justify-start items-start gap-1">
            <div className="text-[#d7d7d7] text-base md:text-sm font-semibold font-onest">Chill Bones</div>
            <div className="text-[#d7d7d7] text-sm md:text-xs font-normal font-onest">Chill Bones #10123334</div>
          </div>
          <div className="flex flex-col justify-start items-end gap-1">
            <div className="text-[#d7d7d7] text-base md:text-sm font-semibold font-onest">Top bid</div>
            <div className="text-[#d7d7d7] text-sm md:text-xs font-normal font-onest">3.222</div>
            <div className="text-[#d7d7d7] text-sm md:text-xs font-normal font-onest">7days left</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCard;

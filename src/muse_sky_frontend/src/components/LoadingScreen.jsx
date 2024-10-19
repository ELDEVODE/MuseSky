import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../assets/images';
import TwinkleStars from './TwinkleStars'; // Import the TwinkleStars component

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #000 70%, #42290f 100%)' }}
    >
      {/* Use TwinkleStars component for the starry background */}
      <TwinkleStars frequency={20} className="z-0" />

      {/* Logo with pulsating glow and drop shadow */}
      <motion.div
        className="relative w-32 h-32 z-10"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            filter: [
              'drop-shadow(0 0 10px rgba(255, 194, 82, 0.3)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))',
              'drop-shadow(0 0 20px rgba(255, 194, 82, 0.5)) drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))',
              'drop-shadow(0 0 10px rgba(255, 194, 82, 0.3)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <img src={Logo} alt="MuseSky Logo" className="w-full h-full object-contain relative z-10" />
      </motion.div>

      {/* Loading text with enhanced radiance and drop shadow */}
      <motion.h2
        className="mt-8 text-3xl font-bold text-[#ffc252] font-bricolage z-10"
        animate={{
          opacity: [0.7, 1, 0.7],
          filter: [
            'drop-shadow(0 0 10px rgba(255, 194, 82, 0.5)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
            'drop-shadow(0 0 20px rgba(255, 194, 82, 0.7)) drop-shadow(0 6px 8px rgba(0, 0, 0, 0.4))',
            'drop-shadow(0 0 30px rgba(255, 194, 82, 0.5)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        MuseSky
      </motion.h2>
    </div>
  );
};

export default LoadingScreen;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GlitchEffect = ({ children, isActive }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setKey(prevKey => prevKey + 1);
      }, Math.random() * 500 + 100); // Trigger re-render every 100-600ms
      return () => clearInterval(interval);
    }
  }, [isActive]);

  const glitchVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.05,
      },
    },
  };

  const sliceCount = 20;
  const slices = Array.from({ length: sliceCount }, (_, i) => i);

  const colorChannels = ['red', 'green', 'blue'];

  return (
    <motion.div
      key={key}
      variants={glitchVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {children}
      {isActive && (
        <>
          {colorChannels.map((channel, index) => (
            <motion.div
              key={`${channel}-${key}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${children.props.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                mixBlendMode: 'screen',
                filter: `${channel}(100%) hue-rotate(${index * 120}deg)`,
                opacity: 0.5,
              }}
              animate={{
                x: Math.random() * 10 - 5,
                y: Math.random() * 10 - 5,
                filter: `blur(${Math.random() * 2}px) ${channel}(100%) hue-rotate(${index * 120 + Math.random() * 30 - 15}deg)`,
              }}
              transition={{
                duration: 0.05,
                ease: "linear",
              }}
            />
          ))}
          {slices.map((slice) => {
            const randomOffset = Math.random() * 20 - 10;
            const randomHeight = (100 / sliceCount) * (Math.random() * 0.5 + 0.75);
            return (
              <motion.div
                key={`${slice}-${key}`}
                style={{
                  position: 'absolute',
                  top: `${((slice / sliceCount) * 100) + randomOffset}%`,
                  left: 0,
                  right: 0,
                  height: `${randomHeight}%`,
                  backgroundImage: `url(${children.props.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: `center ${(slice / sliceCount) * 100}%`,
                  transformOrigin: 'center',
                }}
                animate={{
                  x: Math.random() * 20 - 10,
                  y: Math.random() * 20 - 10,
                  rotate: Math.random() * 2 - 1,
                  filter: `hue-rotate(${Math.random() * 360}deg)`,
                  opacity: Math.random() * 0.3 + 0.7,
                }}
                transition={{
                  duration: 0.05,
                  ease: "linear",
                }}
              />
            );
          })}
        </>
      )}
    </motion.div>
  );
};

export default GlitchEffect;

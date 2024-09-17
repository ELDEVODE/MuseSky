import React, { useEffect, useState } from 'react';

const TwinkleStars = ({ frequency = 50, className = '' }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const starCount = Math.max(1, Math.min(100, frequency));
      const newStars = Array.from({ length: starCount }, (_, i) => {
        const { color, opacity } = getStarColorAndOpacity();
        return {
          id: i,
          x: `${Math.random() * 100}%`,
          y: `${Math.random() * 100}%`,
          size: Math.random() * 6 + 8, // 8 to 14
          color,
          opacity,
          delay: Math.random() * 4, // Random delay between 0 and 4 seconds
          duration: Math.random() * 2 + 3, // Random duration between 3 and 5 seconds
          fadeInDuration: Math.random() * 2 + 1, // Random fade-in duration between 1 and 3 seconds
        };
      });
      setStars(newStars);
    };

    generateStars();
    window.addEventListener('resize', generateStars);
    return () => window.removeEventListener('resize', generateStars);
  }, [frequency]);

  const getStarColorAndOpacity = () => {
    const rand = Math.random();
    if (rand < 0.01) return { color: '#FFFFFF', opacity: 0.9 }; // 1% chance for white, very opaque
    if (rand < 0.5) return { color: '#FFC966', opacity: 0.7 }; // 49% chance for light color, more opaque
    return { color: '#CC8400', opacity: 0.5 }; // 50% chance for dark color, more translucent
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-[-1] ${className}`}>
      <svg width="0" height="0">
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>
      {stars.map((star) => (
        <svg
          key={star.id}
          xmlns="http://www.w3.org/2000/svg"
          width={star.size}
          height={star.size * (41 / 36)}
          viewBox="0 0 36 41"
          fill="none"
          style={{
            position: 'absolute',
            left: star.x,
            top: star.y,
            animation: `fadeIn ${star.fadeInDuration}s ease-out ${star.delay}s forwards, softTwinkle ${star.duration}s ease-in-out ${star.delay + star.fadeInDuration}s infinite`,
            opacity: 0,
          }}
        >
          <path
            d="M14.0686 0.820049L12.1878 16.4922L0.0548576 23.8908L13.9778 26.737L21.0613 40.843L22.942 25.1708L35.075 17.7722L21.152 14.926L14.0686 0.820049Z"
            fill={star.color}
            opacity={star.opacity}
            filter="url(#glow)"
          />
        </svg>
      ))}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes softTwinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: ${0.6}; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
};

export default TwinkleStars;
import React from 'react';

const BackgroundCircles = ({ count = 10 }) => {
  const circles = Array.from({ length: count }, (_, index) => {
    const size = Math.floor(Math.random() * (280 - 200 + 1) + 200);
    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    // Slightly increased opacity range from 0.08 to 0.20
    const opacity = Math.random() * (0.20 - 0.08) + 0.08;

    return (
      <div
        key={index}
        className="absolute rounded-full blur-[100px] z-[-1]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          opacity: opacity,
          backgroundColor: '#ff8f1f',
        }}
      />
    );
  });

  return <div className="absolute inset-0 overflow-hidden z-[-1]">{circles}</div>;
};

export default BackgroundCircles;
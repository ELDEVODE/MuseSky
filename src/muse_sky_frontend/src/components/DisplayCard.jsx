import React from 'react'

const DisplayCard = ({ width, height, imageUrl }) => {
  return (
    <div
      className="p-3 bg-white/30 rounded-[28px] shadow border border-white/50 backdrop-blur-[36px] flex-col justify-center items-center gap-[25.95px] inline-flex overflow-hidden"
      style={{ width, height }}
    >
      <div className="w-full h-full rounded-2xl overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={imageUrl}
          alt="NFT"
        />
      </div>
    </div>
  );
};

export default DisplayCard;
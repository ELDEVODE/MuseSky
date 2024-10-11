import React from 'react';
import { Link } from 'react-router-dom';

const CollectionCard = ({ id, image, title, creator }) => (
  <Link to={`/collection/${id}`} className="block w-full max-w-[220px]">
    <div className="w-full h-[280px] bg-[#2a2a2a] rounded-[14px] border border-white flex-col justify-start items-center inline-flex overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="self-stretch h-[210px] rounded-tl-[14px] rounded-tr-[14px]">
        <img className="w-full h-full object-cover" src={image} alt={title} />
      </div>
      <div className="w-full h-[70px] p-2.5 bg-black/50 border-t backdrop-blur-[3px] flex-col justify-between items-start flex">
        <div className="self-stretch flex-col justify-start items-start gap-0.5 flex">
          <div className="self-stretch text-white text-sm font-semibold font-['Bricolage Grotesque'] capitalize leading-tight truncate">{title}</div>
          <div className="self-stretch justify-start items-center gap-1.5 inline-flex">
            <div className="w-4 h-4 rounded-full overflow-hidden">
              <img className="w-full h-full object-cover" src={creator.avatar} alt={creator.name} />
            </div>
            <div className="grow shrink basis-0 text-white text-xs font-normal font-['Onest'] leading-tight truncate">{creator.name}</div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const CollectionGrid = ({ collections }) => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 bg-white/15 rounded-[20px] backdrop-blur-[2px]">
      <div className="grid grid-cols-1 py-10  sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {collections.map((collection, index) => (
          <div key={index} className="flex justify-center">
            <CollectionCard {...collection} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionGrid;
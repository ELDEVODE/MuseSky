import React from 'react';
import { Link } from 'react-router-dom';
import { uint8ArrayToImageUrl } from '../store/BackendCall';

// const imageUrl = collections?.length > 0 ? uint8ArrayToImageUrl(collections[3]?.image) : null;


const CollectionCard = ({ id, image, title, creator, price, likes, destiny }) => (

  <Link to={destiny ? `/randomId/collections/${id}` : `/collection/${id}`} className="block w-full max-w-[260px]">
    <div className="w-full relative h-[320px] bg-[#2a2a2a] rounded-[14px] border border-white flex-col justify-start items-center inline-flex overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="self-stretch h-full rounded-tl-[14px] rounded-tr-[14px]">
        <img className="w-full h-full object-cover" src={image} alt={title} />
      </div>
      <div className="w-full absolute bottom-0 p-4 bg-black/50  backdrop-blur-[3px] flex-row justify-between items-start flex">
        <div className="self-stretch flex-col justify-start items-start gap-1.5 flex">
          <div className="self-stretch text-white text-base font-semibold font-['Bricolage Grotesque'] capitalize leading-tight truncate">{title}</div>
          <div className="self-stretch justify-start items-center gap-2 inline-flex">
            <div className="w-5 h-5 rounded-full overflow-hidden">
              <img className="w-full h-full object-cover" src={image} /* alt={creator.name} */ />
            </div>
            <div className="grow shrink basis-0 text-white text-sm font-normal font-['Onest'] leading-tight truncate">{/*{creator.name} */} Place Holder</div>
          </div>
        </div>
        <div className="self-stretch justify-between items-start inline-flex flex-col">
          <div className="text-[#e6e6eb] inline-flex flex-row items-center gap-1.5 text-xs font-medium font-['Epilogue'] leading-snug">{price} ckBTC</div>
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.33324 13.6279C5.26719 11.8817 3.55716 10.146 2.73025 8.64005C1.88391 7.09873 1.95775 5.80054 2.42739 4.87918C3.3927 2.98536 6.13777 2.37977 7.81028 4.4951L8.3332 5.15646L8.85616 4.49513C10.529 2.37972 13.2742 2.9854 14.2395 4.87918C14.7091 5.80053 14.7829 7.0987 13.9365 8.64004C13.1095 10.146 11.3994 11.8817 8.33324 13.6279ZM8.33326 3.0937C5.98045 0.857964 2.50953 1.78199 1.23947 4.27368C0.542444 5.64115 0.532923 7.40857 1.56152 9.2818C2.58098 11.1384 4.61359 13.0981 8.01074 14.9758L8.33322 15.1541L8.65572 14.9758C12.053 13.0982 14.0857 11.1384 15.1052 9.28182C16.1339 7.40859 16.1244 5.64116 15.4274 4.27367C14.1573 1.78194 10.6863 0.857998 8.33326 3.0937Z" fill="#FF72D2" />
            </svg>
            <div className="text-[#e6e6eb] text-xs font-medium font-['Epilogue'] leading-snug">{likes}</div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const CollectionGrid = ({ collections, option2 }) => {
  return (
    <div className={`w-full max-w-5xl mx-auto ${!option2 && "p-4 sm:p-6 md:p-8 lg:p-10 md:bg-white/15 backdrop-blur-[2px]"} bg-transparent rounded-[20px] `}>
      <div className="grid grid-cols-1 py-6 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {collections.map((collection, index) => (
          <div key={index} className="flex justify-center">
            <CollectionCard {...collection} destiny={option2} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionGrid;

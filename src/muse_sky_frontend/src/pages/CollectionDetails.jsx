import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TwinkleStars } from '../components';
import BackgroundCircles from '../components/BackgroundCircles';
import { FiShare2, FiX, FiHeart } from 'react-icons/fi';
import NFTCard from '../components/NFTCard';
import { testNFTs, weatherConditions, weatherIcons, collection } from '../testdata/nftData';
import { ROUTES } from '../constants/routes';

function CollectionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [savedNFTs, setSavedNFTs] = useState([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let interval;
    if (selectedNFT) {
      interval = setInterval(() => {
        setPreviewIndex((prevIndex) => (prevIndex + 1) % selectedNFT.all_images.length);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [selectedNFT]);

  const toggleLike = () => setIsLiked(!isLiked);

  const handleNFTClick = (nft) => {
    if (isMobile) {
      setSelectedNFT(nft);
      setPreviewIndex(0);
    } else {
      navigate(`${ROUTES.NFT_DETAIL}/${nft.id}`);
    }
  };

  const closeModal = () => {
    setSelectedNFT(null);
    setPreviewIndex(0);
  };

  const handleBuyNow = () => {
    if (selectedNFT) {
      navigate(`${ROUTES.NFT_DETAIL}/${selectedNFT.id}`);
    }
  };

  const handleSave = () => {
    if (selectedNFT) {
      setSavedNFTs((prev) => {
        if (prev.some((nft) => nft.id === selectedNFT.id)) {
          return prev.filter((nft) => nft.id !== selectedNFT.id);
        } else {
          return [...prev, selectedNFT];
        }
      });
    }
  };

  const isNFTSaved = (nftId) => savedNFTs.some((nft) => nft.id === nftId);

  const handleGoToArtistPage = () => {
    navigate(`${ROUTES.ARTIST_DETAILS}/${collection.creator.id}`);
  };


  return (
    <div className="relative w-full text-white py-2 px-6 md:px-6 lg:px-8 pb-32">
      <div className='max-w-6xl mx-auto mt-16 md:mt-32'>
        <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-2">{collection.title}</h1>
            <p className="text-base md:text-lg text-gray-400 mb-4">Minted on {collection.mintDate}</p>
            <div className="mb-4">
              <h2 className="text-base md:text-lg font-bold text-gray-400 mb-1">Created By</h2>
              <div className="flex items-center gap-2">
                <img className="w-5 h-5 rounded-full" src={collection.creator.avatar} alt={collection.creator.name} />
                <span className="text-base md:text-lg font-semibold">{collection.creator.name}</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto h-auto md:h-[140px] p-[20px] bg-white/20 rounded-xl border border-[#ffc966] backdrop-blur-[12.63px] flex-col justify-center items-start gap-[20px] inline-flex">
            <div className="self-stretch justify-between items-center inline-flex">
              <div className="text-white text-lg font-medium font-['Onest'] leading-normal">Base Price</div>
              <div className="justify-start items-start gap-2 flex">
                <div className="p-[4px] bg-[#27d1aa]/25 rounded-[40px] justify-center items-center flex">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 17L9 11L13 15L21 7" stroke="#27d1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 7H21V14" stroke="#27d1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-center text-[#27d1aa] text-lg font-normal font-['Onest'] leading-7">{collection.priceChange}</div>
              </div>
            </div>
            <div className="justify-center items-end gap-2 inline-flex">
              <div className="text-center text-white text-3xl font-semibold font-['Bricolage Grotesque'] leading-[38px]">{collection.basePrice}</div>
              <div className="text-center text-[#e6e6eb] text-sm font-normal font-['Onest'] leading-relaxed">({collection.priceUSD})</div>
            </div>
          </div>
        </div>

        <div className="my-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg md:text-xl text-[#858584] font-bold capitalize">Description</h2>
            <p className="text-sm md:text-base leading-relaxed">{collection.description}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-lg md:text-xl text-[#858584] font-bold capitalize">Tags</h2>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {collection.tags.map((tag, index) => (
                <span key={index} className="px-3 md:px-4 py-1 bg-[#3b3b3b] rounded-full text-xs md:text-sm font-semibold uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="h-auto md:h-[80px] flex-col justify-start items-start md:items-start gap-3 flex">
          <div className="text-right text-white text-sm font-medium font-['Onest'] leading-relaxed">Views: {collection.views}</div>
          <div className="flex items-center gap-2">
            <button
              className="h-10 px-3 bg-black rounded-lg border border-[#ffc252] flex items-center gap-1.5 hover:bg-[#ffc252]/10 transition-colors"
              onClick={toggleLike}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? "#FF72D2" : "none"} stroke="#FF72D2" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="text-white text-sm font-medium font-['Onest'] leading-relaxed">{collection.likes}</span>
            </button>
            <button className="w-10 h-10 bg-black rounded-lg border border-[#ffc252] flex items-center justify-center hover:bg-[#ffc252]/10 transition-colors">
              <FiShare2 size={18} color="white" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">NFTs in this Collection</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {testNFTs.slice(0, 10).map((nft, index) => (
            <div key={index} className="w-full max-w-[220px] mx-auto" onClick={() => handleNFTClick(nft)}>
              <NFTCard nft={nft} />
            </div>
          ))}
        </div>
        <div className="mt-8 md:mt-12 flex justify-center md:justify-end">
          <button
            onClick={handleGoToArtistPage}
            className="w-full md:w-auto px-4 md:px-6 py-3 bg-white/20 rounded-xl border-2 border-[#ffc966] backdrop-blur-sm text-white font-medium 
              hover:bg-[#ffc966] hover:text-black transition-all duration-300 ease-out
              flex items-center justify-center gap-2 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none"
              className="mr-2 transition-all duration-300 group-hover:animate-bounce-horizontal">
              <path d="M3.125 9.48145C2.64175 9.48145 2.25 9.8732 2.25 10.3564C2.25 10.8397 2.64175 11.2314 3.125 11.2314H16.875C17.3582 11.2314 17.75 10.8397 17.75 10.3564C17.75 9.8732 17.3582 9.48145 16.875 9.48145H3.125Z" fill="#FFC252" stroke="#FFC252" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:fill-black group-hover:stroke-black" />
              <path d="M10.6313 15.3627L10.6313 15.3627C10.2896 15.7044 10.2896 16.2585 10.6313 16.6002L10.6313 16.6002C10.973 16.9419 11.527 16.9419 11.8687 16.6002L17.4937 10.9752C17.8354 10.6335 17.8354 10.0794 17.4937 9.73773L11.8687 4.11273C11.527 3.77102 10.973 3.77102 10.6313 4.11273C10.2896 4.45444 10.2896 5.00846 10.6313 5.35016L15.6376 10.3564L10.6313 15.3627Z" fill="#FFC252" stroke="#FFC252" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:fill-black group-hover:stroke-black" />
            </svg>
            <span>Go To Artist Page</span>
          </button>
        </div>
      </div>

      {selectedNFT && isMobile && (
        <div className="fixed inset-0 mx-6 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[#2a2a2a] rounded-lg p-4 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedNFT.title}</h3>
              <button onClick={closeModal} className="text-white">
                <FiX size={24} />
              </button>
            </div>
            <div className="relative aspect-[3/4] mb-4">
              <img
                src={selectedNFT.all_images[previewIndex]}
                alt={selectedNFT.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute top-2 right-2 bg-black/50 rounded-full p-2 backdrop-blur-sm">
                <span className="text-2xl">{weatherIcons[weatherConditions[previewIndex]]}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 bg-[#ffc966] text-black font-semibold rounded-lg hover:bg-[#ffb733] transition-colors duration-300"
              >
                Buy Now
              </button>
              <button
                onClick={handleSave}
                className={`flex-1 py-3 font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center gap-2
                  ${isNFTSaved(selectedNFT.id)
                    ? "bg-[#FF72D2] text-white hover:bg-[#FF4BC7]"
                    : "bg-white text-black hover:bg-gray-200"
                  }`}
              >
                <FiHeart size={18} />
                {isNFTSaved(selectedNFT.id) ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      <BackgroundCircles count={5} />
      <TwinkleStars frequency={25} />
    </div>
  )
}

export default CollectionDetailPage;
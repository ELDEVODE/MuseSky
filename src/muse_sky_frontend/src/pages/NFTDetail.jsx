import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CoolButton, TwinkleStars } from '../components';
import BackgroundCircles from '../components/BackgroundCircles';
import { testNFT, collection, testNFTs, weatherConditions, weatherIcons } from '../testdata/nftData';
import { FiShare2, FiX, FiHeart } from 'react-icons/fi';
import NFTCard from '../components/NFTCard';
import { ROUTES } from '../constants/routes';

function NFTDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nft, setNFT] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [savedNFTs, setSavedNFTs] = useState([]);

  useEffect(() => {
    setNFT(testNFT);
  }, [id]);

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
    <div className="relative w-full text-white py-2 px-4 md:px-6 pb-24 md:pb-32">
      <div className="max-w-5xl mx-auto mt-12 md:mt-24">
        <div className=''>
          <h1 className="text-2xl md:text-4xl font-semibold mb-2">{collection.title}</h1>
          <p className="text-sm md:text-base text-gray-400 mb-3">Minted on {collection.mintDate}</p>
          <div className="mb-3">
            <h2 className="text-base font-bold text-gray-400 mb-2">Created By</h2>
            <div className="flex items-center gap-3">
              <img className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover" src={collection.creator.avatar} alt={collection.creator.name} />
              <span className="text-base md:text-lg font-semibold">{collection.creator.name}</span>
            </div>
          </div>
        </div>

        <div className='mt-12 md:mt-16'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12'>
            {/* for mobile */}
            <div className="flex md:hidden flex-col gap-6">
              <div className="p-4 bg-[#3b3b3b] rounded-xl">
                <h2 className="text-base font-bold mb-1">NFT Title</h2>
                <h3 className="text-2xl font-semibold">{nft?.title}</h3>
              </div>

              <div className="w-full aspect-square bg-[#ffc252]/20 rounded-xl shadow border-2 border-black/0 backdrop-blur-[36.85px] flex justify-center items-center p-3 relative">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={nft?.image || "https://via.placeholder.com/500"}
                  alt={nft?.title || "NFT Image"}
                />
                <div className="absolute bottom-5 right-5 bg-black/50 rounded-full p-2 backdrop-blur-sm flex items-center gap-2">
                  <span className="text-2xl">{weatherIcons[nft?.current_weather]}</span>
                  <span className="text-sm p-2 pl-0">{nft?.current_weather}</span>
                </div>
              </div>
            </div>

            {/* for desktop */}
            <div className="flex flex-col gap-6">
              <div className="p-5 bg-[#3b3b3b] rounded-xl">
                <div className="mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Current Price</span>
                    <span className="text-[#27d1aa] inline-flex items-center gap-1 text-sm"><div className="p-[3px] bg-[#27d1aa]/25 rounded-[40px] justify-center items-center flex">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 17L9 11L13 15L21 7" stroke="#27d1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 7H21V14" stroke="#27d1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>+2.48%</span>
                  </div>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-2xl font-semibold">0.024 ETH</span>
                    <span className="text-[#e6e6eb] text-xs">($3,618.36)</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between sm:flex-row gap-3">
                  <CoolButton>Purchase Now</CoolButton>
                  <button className="px-3 py-1.5 bg-white/10 rounded-xl border-2 border-[#ffc966] text-sm">
                    Save NFT
                  </button>
                </div>
              </div>

              <div className="p-5 bg-[#3b3b3b] rounded-xl grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-3">Description</h3>
                  <p className="mb-5 text-sm">{collection.description}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Animation', 'Moon', 'Illustration', 'Space'].map((tag, index) => (
                      <span key={index} className="px-2 py-0.5 bg-[#545454] rounded-full text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-col gap-6">
              <div className="p-4 bg-[#3b3b3b] rounded-xl">
                <h2 className="text-base font-bold mb-1">NFT Title</h2>
                <h3 className="text-2xl font-semibold">{nft?.title}</h3>
              </div>

              <div className="w-full aspect-square bg-[#ffc252]/20 rounded-xl shadow border-2 border-black/0 backdrop-blur-[36.85px] flex justify-center items-center p-3 relative">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={nft?.image || "https://via.placeholder.com/500"}
                  alt={nft?.title || "NFT Image"}
                />
                <div className="absolute bottom-5 right-5 bg-black/50 rounded-full p-2 backdrop-blur-sm flex items-center gap-2">
                  <span className="text-2xl">{weatherIcons[nft?.current_weather]}</span>
                  <span className="text-sm p-2 pl-0">{nft?.current_weather}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button className="w-[45%] max-w-[180px] h-12 sm:h-14 px-2 sm:px-4 py-2 bg-white/20 rounded-xl sm:rounded-2xl border-2 border-[#ffc966] backdrop-blur-[12.63px] justify-center items-center gap-1 sm:gap-2 flex group hover:bg-[#ffc966] hover:text-black transition-all duration-300 ease-out">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" className="text-base sm:text-lg transition-all duration-300 group-hover:translate-x-[-0.25em]">
              <path d="M15.8334 10H4.16675" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.0001 15.8334L4.16675 10L10.0001 4.16669" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-center text-xs sm:text-sm font-medium font-['Onest'] leading-snug">Previous NFT</div>
          </button>
          <button className="w-[45%] max-w-[180px] h-12 sm:h-14 px-2 sm:px-4 py-2 bg-white/20 rounded-xl sm:rounded-2xl border-2 border-[#ffc966] backdrop-blur-[12.63px] justify-center items-center gap-1 sm:gap-2 flex group hover:bg-[#ffc966] hover:text-black transition-all duration-300 ease-out">
            <div className="text-center text-xs sm:text-sm font-medium font-['Onest'] leading-snug">Next NFT</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" className="text-base sm:text-lg transition-all duration-300 group-hover:translate-x-[0.25em]">
              <path d="M4.16675 10H15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 4.16669L15.8333 10L10 15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
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

      <BackgroundCircles count={8} />
      <TwinkleStars frequency={30} />
    </div>
  );
}

export default NFTDetail;
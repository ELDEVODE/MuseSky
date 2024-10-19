import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TwinkleStars } from '../../components';
import BackgroundCircles from '../../components/BackgroundCircles';
import { FiShare2, FiX, FiHeart } from 'react-icons/fi';
import NFTCard from '../../components/NFTCard';
import { testNFTs, weatherConditions, weatherIcons, collection } from '../../testdata/nftData';
import { ROUTES } from '../../constants/routes';
import { FaPlus } from 'react-icons/fa';
import Pagination from '../../components/Pagination';

function CollectionPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [savedNFTs, setSavedNFTs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nftsPerPage] = useState(10);

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

  // Calculate pagination
  const indexOfLastNFT = currentPage * nftsPerPage;
  const indexOfFirstNFT = indexOfLastNFT - nftsPerPage;
  const currentNFTs = testNFTs.slice(indexOfFirstNFT, indexOfLastNFT);
  const totalPages = Math.ceil(testNFTs.length / nftsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

      {1 ? <div className="max-w-6xl mx-auto mt-16">
        <div className="rounded-xl border-2 mx-auto border-[#ffc252] border-dashed flex items-center justify-center m-8 py-8 md:py-16 w-[80%] md:w-[60%]">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-8 h-8 relative">
              <FaPlus className="text-white text-3xl" />
            </div>
            <div>
              <h2 className="text-white text-lg sm:text-xl font-extrabold font-['Bricolage Grotesque'] leading-tight">No NFTs in Collection</h2>
              <p className="text-white/20 text-sm sm:text-base font-light font-['Onest'] leading-snug">Create your first NFT</p>
            </div>
            <button
              className="w-full p-3 bg-white/20 rounded-xl border-2 border-[#ffc966] backdrop-blur-[12.63px] text-[#ffc252] text-md sm:text-sm font-medium font-['Onest'] leading-7 transition-all duration-300 hover:bg-white/30 hover:text-white"
              onClick={() => navigate(ROUTES.CREATE_NFT)}
            >
              Create a new NFT
            </button>
          </div>
        </div>
      </div> :
        <div className="max-w-6xl mx-auto mt-16">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">NFTs in this Collection</h2>

            {testNFTs.length > 0 && (
              <button
                className="group justify-center md:justify-start px-4 py-2 rounded-lg bg-[#ffc252] text-[#2c2520] text-md sm:text-base font-medium font-['Onest'] flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,194,82,0.5)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ffc252] focus:ring-opacity-50 active:scale-100"
                onClick={() => { navigate(ROUTES.CREATE_NFT) }}
              >
                <FaPlus className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:rotate-90" />
                <span>Add NFT</span>
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {currentNFTs.map((nft, index) => (
              <div key={index} className="w-full max-w-[220px] mx-auto" onClick={() => handleNFTClick(nft)}>
                <NFTCard nft={nft} />
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>}

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
                View NFT
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

export default CollectionPreview;

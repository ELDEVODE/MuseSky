import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import { TwinkleStars } from '../../components';
import BackgroundCircles from '../../components/BackgroundCircles';

const CreateNFT = () => {
  const navigate = useNavigate();
  const [collectionName, setCollectionName] = useState('');
  const [pinnedLocation, setPinnedLocation] = useState('');
  const [price, setPrice] = useState('');
  const [nftImages, setNftImages] = useState([null, null, null, null]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRefs = useRef([]);
  const dragCounter = useRef(0);
  const dropZoneRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement the logic to create a new NFT
    console.log('Creating NFT:', { collectionName, pinnedLocation, price, nftImages });
  };

  const handleImageUpload = (file, index) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...nftImages];
        newImages[index] = e.target.result;
        setNftImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files[0], index);
      e.dataTransfer.clearData();
    }
  };

  const handleCancel = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const renderImageUploader = (index) => {
    return (
      <div
        key={index}
        className={`w-full h-[200px] px-3.5 rounded-lg border-dashed border-2 ${hoveredIndex === index ? 'border-[#ffd280] bg-[#ffc252]/10' : 'border-[#ffc252]'
          } flex-col justify-center items-center flex cursor-pointer transition-all duration-300`}
        onClick={() => fileInputRefs.current[index].click()}
        onDragOver={(e) => {
          handleDrag(e);
          setHoveredIndex(index);
        }}
        onDragEnter={(e) => {
          handleDragIn(e);
          setHoveredIndex(index);
        }}
        onDragLeave={(e) => {
          handleDragOut(e);
          setHoveredIndex(null);
        }}
        onDrop={(e) => {
          handleDrop(e, index);
          setHoveredIndex(null);
        }}
      >
        {nftImages[index] ? (
          <img src={nftImages[index]} alt={`NFT ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <div className="self-stretch flex-col justify-center text-center items-center gap-2.5 inline-flex">
            <FiUpload className={`w-6 h-6 ${hoveredIndex === index ? 'text-[#ffd280]' : 'text-white'}`} />
            <div className="flex-col justify-start items-center gap-1 flex">
              <div className={`text-base font-medium font-['Epilogue'] leading-relaxed ${hoveredIndex === index ? 'text-[#ffd280]' : 'text-white'}`}>
                {hoveredIndex === index ? 'Drop image here' : 'Upload image'}
              </div>
              <div className="text-[#ceccd6] text-sm font-normal font-['Epilogue'] leading-snug">
                {hoveredIndex === index ? 'Release to upload' : 'Drag or choose your file to upload'}
              </div>
            </div>
            <div className="text-center text-[#ceccd6] text-[11px] font-normal font-['Epilogue'] leading-[13.20px] tracking-tight">
              (PNG, GIF, WEBP, MP4 or MP3. Max 5 Mb.)
            </div>
          </div>
        )}
        <input
          type="file"
          ref={(el) => fileInputRefs.current[index] = el}
          className="hidden"
          onChange={(e) => handleImageUpload(e.target.files[0], index)}
          accept="image/*,video/*,audio/*"
        />
      </div>
    );
  };

  return (
    <div className="relative w-full text-white overflow-hidden px-6">
      <div className="relative mb-10">
        <div className="w-full py-8 mt-[100px] bg-transparent flex flex-col justify-center items-center relative">
          <div className='flex flex-col w-full items-center justify-center pb-10 gap-4 border-b border-[#CECCD6]/30'>
            <h1 className="text-4xl sm:text-5xl font-bold font-['Bricolage Grotesque'] capitalize leading-tight mb-1">
              ADD AN NFT
            </h1>
            <p className="text-sm font-normal font-['Onest'] leading-relaxed text-center">
              Create your unique NFT and add it to your collection.
            </p>
          </div>
          <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 mt-12">
            <div className="w-full md:w-1/2">
              <h2 className="block text-md font-medium font-['Onest'] mb-1">NFT Details</h2>
              <form onSubmit={handleSubmit} className="mt-2 space-y-6">
                <div>
                  <label htmlFor="collectionName" className="block text-sm text-[#E6E6EB] font-medium font-['Onest'] mb-1">
                    Collection Name <span className="text-[#ef466f]">*</span>
                  </label>
                  <input
                    type="text"
                    id="collectionName"
                    value={collectionName}
                    onChange={(e) => setCollectionName(e.target.value)}
                    className="w-full h-12 px-3 bg-white/20 rounded-lg border border-[#FFC252]/20 text-white placeholder-[#9c99ae] text-sm font-normal font-['Onest'] leading-snug focus:outline-none"
                    placeholder="Enter your Collection name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="pinnedLocation" className="block text-sm text-[#E6E6EB] font-medium font-['Onest'] mb-1">
                    Pinned Location <span className="text-[#ef466f]">*</span>
                  </label>
                  <input
                    type="text"
                    id="pinnedLocation"
                    value={pinnedLocation}
                    onChange={(e) => setPinnedLocation(e.target.value)}
                    className="w-full h-12 px-3 bg-white/20 rounded-lg border border-[#FFC252]/20 text-white placeholder-[#9c99ae] text-sm font-normal font-['Onest'] leading-snug focus:outline-none"
                    placeholder="e.g : art, painting, etc"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm text-[#E6E6EB] font-medium font-['Onest'] mb-1">
                    Price
                  </label>
                  <div className="flex">
                    <div className="h-12 px-4 py-3 bg-white/20 rounded-l-lg border-l-2 border-t-2 border-b-2 border-[#FFC252]/20 flex items-center">
                      <span className="text-white text-sm font-normal font-['Onest']">USD</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="flex-grow h-12 px-3 bg-white/20 rounded-r-lg border-2 border-[#FFC252]/20 text-white placeholder-[#9c99ae] text-sm font-normal font-['Onest'] leading-snug focus:outline-none"
                      placeholder="e.g. 500"
                    />
                  </div>
                </div>

                <div className="pt-4 hidden md:flex justify-between items-center ">
                  <button
                    type="submit"
                    className="py-4 px-8 bg-[#ffc252] text-[#070134] rounded-lg font-semibold font-medium font-['Onest'] transition-all duration-300 hover:bg-[#ffd280] focus:outline-none focus:ring-2 focus:ring-[#ffc252] focus:ring-opacity-50"
                  >
                    Add to Collection
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="text-md font-semibold font-normal cursor-pointer hover:text-[#fff] font-['Onest'] inline-block text-[#EF466F]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="block text-md font-medium font-['Onest'] mb-4">NFT Images</h2>
              <div className="grid grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((index) => renderImageUploader(index))}
              </div>
            </div>
          </div>

          <div className="w-full max-w-6xl mx-auto mt-8 md:hidden">
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="py-4 px-8 bg-[#ffc252] text-[#070134] rounded-lg font-semibold font-medium font-['Onest'] transition-all duration-300 hover:bg-[#ffd280] focus:outline-none focus:ring-2 focus:ring-[#ffc252] focus:ring-opacity-50"
              >
                Add to Collection
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-md font-semibold font-normal cursor-pointer hover:text-[#fff] font-['Onest'] inline-block text-[#EF466F]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <BackgroundCircles count={5} />
      <TwinkleStars frequency={14} />
    </div>
  );
};

export default CreateNFT;

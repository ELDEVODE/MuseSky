import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { NewsLetterSection } from '../components'
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import CollectionGrid from '../components/CollectionGrid'
import { testImages, testCollections } from '../testdata/collectionData';
import { TwinkleStars } from '../components'
import BackgroundCircles from '../components/BackgroundCircles';

function CollectionPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const collectionsPerPage = 12

  const filteredCollections = useMemo(() => {
    return testCollections.filter(collection =>
      collection.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const totalPages = Math.ceil(filteredCollections.length / collectionsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const getRandomImage = () => testImages[Math.floor(Math.random() * testImages.length)];

  const currentCollections = useMemo(() => {
    const indexOfLastCollection = currentPage * collectionsPerPage
    const indexOfFirstCollection = indexOfLastCollection - collectionsPerPage
    return filteredCollections.slice(indexOfFirstCollection, indexOfLastCollection)
  }, [currentPage, filteredCollections, collectionsPerPage])

  const getPaginationRange = useCallback(() => {
    const maxVisiblePages = 3;
    const range = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      range.push(1);

      if (currentPage <= 2) {
        range.push(2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 1) {
        range.push('...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        range.push('...', currentPage, '...', totalPages);
      }
    }

    return range;
  }, [currentPage, totalPages]);

  const handlePageChange = useCallback((pageNumber) => {
    console.log('handlePageChange called with:', pageNumber);
    if (typeof pageNumber === 'number' && pageNumber >= 1 && pageNumber <= totalPages) {
      console.log('Setting current page to:', pageNumber);
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  }, [totalPages]);

  console.log('Current page:', currentPage);
  console.log('Total pages:', totalPages);

  return (
    <div className="w-full text-white overflow-hidden px-4 md:px-0">
      <div className='relative'>
        {/* Browse Collections Searchbar */}
        <div className="w-full py-8 mt-[100px] bg-transparent flex justify-center items-center relative">
          <div className="w-full max-w-3xl px-3 flex flex-col gap-4">
            <div className="w-full">
              <h1 className="text-3xl sm:text-4xl font-bold font-['Bricolage Grotesque'] capitalize leading-tight mb-1">Browse Collections</h1>
              <p className="text-sm font-normal font-['Onest'] leading-relaxed">Browse through our extensive NFT Marketplace.</p>
            </div>
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search your favourite NFTs Collection"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full h-10 sm:h-12 px-3 pr-10 bg-white/20 rounded-lg border border-white/50 text-white placeholder-[#858584] text-sm font-normal font-['Onest'] leading-snug focus:outline-none"
              />
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
            </div>
          </div>
        </div>

        {/* Collection Grid */}
        <div className="py-12 relative">
          <CollectionGrid collections={currentCollections.map(collection => ({
            ...collection,
            image: getRandomImage()
          }))} />
        </div>

        {/* Pagination */}
        <div className="w-full flex justify-center py-6 relative cursor-pointer">
          <div className="shadow flex items-center gap-2">
            <button
              className="p-2 bg-[#ffc252] rounded-lg transition-all duration-300 hover:bg-[#ffd280] hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ffc252] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FiChevronLeft className="w-4 h-4 text-black" />
            </button>
            {getPaginationRange().map((number, index) => (
              <button
                key={index}
                onClick={() => number !== '...' && handlePageChange(number)}
                className={`w-8 h-8 p-1 rounded-lg border flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ffc252] focus:ring-opacity-50 ${number === currentPage
                  ? 'bg-[#ffc252] text-black hover:bg-[#ffd280]'
                  : number === '...'
                    ? 'bg-black text-white border-[#7f7f7f] cursor-default'
                    : 'bg-black text-white border-[#7f7f7f] hover:bg-[#2f2f2f] hover:border-white'
                  }`}
                disabled={number === '...'}
              >
                <span className="text-xs font-medium font-['Onest'] leading-snug">{number}</span>
              </button>
            ))}
            <button
              className="p-2 bg-[#ffc252] rounded-lg transition-all duration-300 hover:bg-[#ffd280] hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ffc252] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FiChevronRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>

        {/* Add background circle elements */}
        <BackgroundCircles count={5} />
        <TwinkleStars frequency={20} />
      </div>

      {/* NewsLetter Section */}
      <div className="w-full px-3 sm:px-6 py-12 relative overflow-hidden">
        <NewsLetterSection />
      </div>
    </div>
  )
}

export default CollectionPage
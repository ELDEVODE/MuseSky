import React, { useState, useEffect } from 'react'
import { NewsLetterSection } from '../components'
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import CollectionGrid from '../components/CollectionGrid'
import { testImages, testCollections } from '../testdata/collectionData';

function CollectionPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredCollections, setFilteredCollections] = useState([])
  const collectionsPerPage = 12  // Changed from 8 to 12
  const maxPageNumbers = 5

  useEffect(() => {
    const filtered = testCollections.filter(collection =>
      collection.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredCollections(filtered)
    setCurrentPage(1)
  }, [searchQuery])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const getRandomImage = () => testImages[Math.floor(Math.random() * testImages.length)];

  const indexOfLastCollection = currentPage * collectionsPerPage
  const indexOfFirstCollection = indexOfLastCollection - collectionsPerPage
  const currentCollections = filteredCollections.slice(indexOfFirstCollection, indexOfLastCollection)

  const totalPages = Math.ceil(filteredCollections.length / collectionsPerPage)

  const getPaginationRange = () => {
    const delta = 2; // Number of pages to show on either side of the current page
    const range = [];
    const rangeWithDots = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    let l;
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="w-full text-white">
      {/* Browse Collections Searchbar */}
      <div className="w-full py-8 pt-[60px] bg-black flex justify-center items-center">
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
      <div className="py-12">
        <CollectionGrid collections={currentCollections.map(collection => ({
          ...collection,
          image: getRandomImage()
        }))} />
      </div>

      {/* Pagination */}
      <div className="w-full flex justify-center py-6">
        <div className="shadow flex items-center gap-3">
          <button
            className="p-2 bg-[#3f3f3f] rounded-lg transition-all duration-300 hover:bg-[#4f4f4f] hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ffc252] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FiChevronLeft className="w-5 h-5 text-white" />
          </button>
          {getPaginationRange().map((number, index) => (
            <button
              key={index}
              onClick={() => number !== '...' && handlePageChange(number)}
              className={`w-9 h-9 p-2 rounded-lg border flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ffc252] focus:ring-opacity-50 ${number === currentPage
                  ? 'bg-[#ffc252] text-black hover:bg-[#ffd280]'
                  : number === '...'
                    ? 'bg-black text-white border-[#7f7f7f] cursor-default'
                    : 'bg-black text-white border-[#7f7f7f] hover:bg-[#2f2f2f] hover:border-white'
                }`}
              disabled={number === '...'}
            >
              <span className="text-sm font-medium font-['Onest'] leading-snug">{number}</span>
            </button>
          ))}
          <button
            className="p-2 bg-[#ffc252] rounded-lg transition-all duration-300 hover:bg-[#ffd280] hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ffc252] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FiChevronRight className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* NewsLetter Section */}
      <div className="w-full px-3 sm:px-6 py-12 relative overflow-hidden">
        <NewsLetterSection />
      </div>
    </div>
  )
}

export default CollectionPage
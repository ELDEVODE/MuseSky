import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { NewsLetterSection } from '../components'
import { FiSearch, FiPlus } from 'react-icons/fi'
import CollectionGrid from '../components/CollectionGrid'
import { testImages, testCollections } from '../testdata/collectionData';
import { TwinkleStars } from '../components'
import BackgroundCircles from '../components/BackgroundCircles';
import Pagination from '../components/Pagination';

function CollectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('')
  const collectionsPerPage = 12

  const filteredCollections = useMemo(() => {
    return testCollections.filter(collection =>
      collection.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const totalPages = Math.ceil(filteredCollections.length / collectionsPerPage)

  const getCurrentPage = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page')) || 1;
    return Math.min(Math.max(1, page), totalPages);
  }, [location.search, totalPages]);

  const currentPage = getCurrentPage();

  useEffect(() => {
    console.log('Current page:', currentPage);
    console.log('Total pages:', totalPages);
  }, [currentPage, totalPages]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    navigate('?page=1', { replace: true });
  }

  const getRandomImage = () => testImages[Math.floor(Math.random() * testImages.length)];

  const currentCollections = useMemo(() => {
    const indexOfLastCollection = currentPage * collectionsPerPage
    const indexOfFirstCollection = indexOfLastCollection - collectionsPerPage
    return filteredCollections.slice(indexOfFirstCollection, indexOfLastCollection)
  }, [currentPage, filteredCollections, collectionsPerPage])

  const handlePageChange = useCallback((pageNumber) => {
    console.log('handlePageChange called with:', pageNumber);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      navigate(`?page=${pageNumber}`, { replace: true });
      window.scrollTo(0, 0);
    }
  }, [navigate, totalPages]);

  return (
    <div className="w-full text-white overflow-hidden px-6">
      <div className='relative'>
        {/* Browse Collections Searchbar */}
        <div className="w-full py-8 mt-[100px] bg-transparent flex justify-center items-center relative">
          <div className="w-full max-w-3xl px-3 flex flex-col gap-4">
            <div className="w-full flex justify-between items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold font-['Bricolage Grotesque'] capitalize leading-tight mb-1">Browse Collections</h1>
                <p className="text-sm font-normal font-['Onest'] leading-relaxed">Browse through our extensive NFT Marketplace.</p>
              </div>
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* Add background circle elements */}
        <BackgroundCircles count={5} />
        <TwinkleStars frequency={30} />
      </div>

      {/* NewsLetter Section */}
      <div className="w-full px-3 sm:px-6 py-12 relative overflow-hidden">
        <NewsLetterSection />
      </div>
    </div>
  )
}

export default CollectionPage

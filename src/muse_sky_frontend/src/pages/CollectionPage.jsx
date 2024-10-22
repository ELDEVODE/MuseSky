import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { NewsLetterSection } from '../components'
import { FiSearch, FiPlus } from 'react-icons/fi'
import CollectionGrid from '../components/CollectionGrid'
import { TwinkleStars } from '../components'
import BackgroundCircles from '../components/BackgroundCircles'
import Pagination from '../components/Pagination'
import { useAllCollections } from '../store/BackendCall'
import { uint8ArrayToImageUrl } from '../store/BackendCall'
import LoadingScreen from '../components/LoadingScreen'

function CollectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('')
  const collectionsPerPage = 12

  const { data: collections = [], isLoading, error } = useAllCollections();

  const filteredCollections = useMemo(() => {
    return collections.filter(collection =>
      collection.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(collection => ({
      id: Number(collection.id),
      title: collection.name,
      description: collection.description,
      image: uint8ArrayToImageUrl(collection.image),
      social_links: collection.social_media_links[0] || {},
      owner: collection.owner,
      supply: Number(collection.supply)
    }))
  }, [searchQuery, collections])

  const totalPages = Math.ceil(filteredCollections.length / collectionsPerPage)

  const getCurrentPage = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page')) || 1;
    return Math.min(Math.max(1, page), totalPages);
  }, [location.search, totalPages]);

  const currentPage = getCurrentPage();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    navigate('?page=1', { replace: true });
  }

  const currentCollections = useMemo(() => {
    const indexOfLastCollection = currentPage * collectionsPerPage
    const indexOfFirstCollection = indexOfLastCollection - collectionsPerPage
    return filteredCollections.slice(indexOfFirstCollection, indexOfLastCollection)
  }, [currentPage, filteredCollections, collectionsPerPage])

  const handlePageChange = useCallback((pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      navigate(`?page=${pageNumber}`, { replace: true });
      window.scrollTo(0, 0);
    }
  }, [navigate, totalPages]);

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-red-500">Error loading collections: {error.message}</div>
      </div>
    )
  }



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

        {filteredCollections.length === 0 ? (
          <div className='flex justify-center items-center w-full'>
            <div className='max-w-4xl w-full'>
              <div className="w-full relative h-[320px] bg-[#2a2a2a] rounded-[14px] border border-white flex-col justify-center items-center inline-flex overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="text-white text-lg font-normal font-['Onest']">No collections</div>
              </div>
            </div>
          </div>
        ) : (<div className="py-12 relative"><CollectionGrid collections={currentCollections} />  </div>
        )}


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
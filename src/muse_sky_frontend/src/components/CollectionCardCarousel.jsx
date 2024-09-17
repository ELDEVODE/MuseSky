import React, { useState, useEffect } from 'react';
import CollectionCard from './CollectionCard';
import '../styles/CollectionCardCarousel.css';

const CollectionCardCarousel = ({ collections, className }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');
  const cardsPerPage = 3;

  const totalPages = Math.ceil(collections.length / cardsPerPage);
  const displayedCollections = collections.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage);

  useEffect(() => {
    setSlideDirection('');
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setSlideDirection(newPage > currentPage ? 'slide-left' : 'slide-right');
    setTimeout(() => setCurrentPage(newPage), 10);
  };

  return (
    <div className={`flex flex-col items-center gap-8 ${className}`}>
      <div className="relative overflow-hidden w-full">
        <div className={`flex justify-between items-start gap-4 transition-transform-card duration-300 ease-in-out ${slideDirection}`}>
          {displayedCollections.map((collection, index) => (
            <CollectionCard
              key={index}
              creatorName={collection.creatorName}
              collectionName={collection.collectionName}
              mainImage={collection.mainImage}
              sideImage1={collection.sideImage1}
              sideImage2={collection.sideImage2}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full ${index === currentPage ? 'bg-[#cc8d18]' : 'bg-[#64450c]'}`}
            onClick={() => handlePageChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionCardCarousel;
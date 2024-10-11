import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import CollectionCard from './CollectionCard';
import '../styles/CollectionCardCarousel.css';

const CollectionCardCarousel = ({ collections, className }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');
  const [cardsPerPage, setCardsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(window.innerWidth < 768 ? 1 : 3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(Math.min(collections.length, window.innerWidth < 768 ? 3 : collections.length) / cardsPerPage);
  const displayedCollections = collections.slice(0, window.innerWidth < 768 ? 3 : collections.length).slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage);

  useEffect(() => {
    setSlideDirection('');
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setSlideDirection(newPage > currentPage ? 'slide-left' : 'slide-right');
      setTimeout(() => setCurrentPage(newPage), 10);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handlePageChange(currentPage + 1),
    onSwipedRight: () => handlePageChange(currentPage - 1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div className={`flex flex-col items-center gap-12 ${className}`}>
      <div className="relative overflow-hidden w-full" {...handlers}>
        <div className={`flex flex-col md:flex-row justify-between items-center md:items-start gap-8 transition-transform-card duration-300 ease-in-out ${slideDirection}`}>
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
      <div className="flex justify-center items-center gap-6">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`w-5 h-5 rounded-full ${index === currentPage ? 'bg-[#cc8d18]' : 'bg-[#64450c]'}`}
            onClick={() => handlePageChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionCardCarousel;
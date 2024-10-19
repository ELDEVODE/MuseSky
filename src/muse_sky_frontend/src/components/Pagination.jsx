import React, { useCallback, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const [inputPage, setInputPage] = useState('');

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
    if (typeof pageNumber === 'number' && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  }, [totalPages, onPageChange]);

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setInputPage('');
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-6 relative cursor-pointer">
      <div className="shadow flex items-center gap-2 mb-4">
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
      <form onSubmit={handleInputSubmit} className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          max={totalPages}
          value={inputPage}
          onChange={handleInputChange}
          placeholder="Go to"
          className="w-20 px-2 py-1 text-sm bg-black text-white border border-[#7f7f7f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc252] focus:ring-opacity-50 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance-textfield] caret-[#ffc252]"
        />
        <button
          type="submit"
          className="px-3 py-1 bg-[#ffc252] text-black text-sm font-medium rounded-lg transition-all duration-300 hover:bg-[#ffd280] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ffc252] focus:ring-opacity-50"
        >
          Go
        </button>
      </form>
    </div>
  );
}

export default Pagination;

import React, { useState, useTransition } from 'react';

const BlogPost = ({ title, content, imageUrl }) => (
  <div className="w-72 flex-col justify-start items-start gap-4 inline-flex cursor-pointer">
    <img className="h-40 w-full object-cover relative rounded-lg" src={imageUrl} alt={title} />
    <div className="self-stretch flex-col justify-start items-start gap-2 flex">
      <div className="self-stretch text-white text-lg font-semibold font-onest leading-tight truncate">{title}</div>
      <div className="self-stretch h-14 text-[#dfdfd1] text-sm font-normal font-onest leading-snug overflow-hidden">
        {content.length > 100 ? `${content.substring(0, 100)}...` : content}
      </div>
    </div>
  </div>
);

const BlogCarousel = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [direction, setDirection] = useState('next');

  const nextSlide = () => {
    setDirection('next');
    startTransition(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    });
  };

  const prevSlide = () => {
    setDirection('prev');
    startTransition(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
    });
  };

  return (
    <div className="w-full px-4 flex-col justify-center items-between gap-8 inline-flex">
      <div className="flex justify-between items-start gap-4 relative overflow-hidden">
        {posts.slice(currentIndex, currentIndex + 3).map((post, index) => (
          <div
            key={index}
            className={`transition-all duration-300 ${isPending
              ? direction === 'next'
                ? '-translate-x-full opacity-0'
                : 'translate-x-full opacity-0'
              : 'translate-x-0 opacity-100'
              }`}
          >
            <BlogPost {...post} />
          </div>
        ))}
      </div>
      <div className="flex self-start justify-center items-center gap-4">
        <button
          onClick={prevSlide}
          className="w-10 h-10 bg-white/90 rounded-full border border-[#eaecf0] flex justify-center items-center transition-all duration-300 hover:bg-[#f0f0f0] hover:shadow-md hover:scale-110"
          disabled={isPending}
        >
          <div className="text-xl text-gray-600 hover:text-gray-800">←</div>
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 bg-white/90 rounded-full border border-[#eaecf0] flex justify-center items-center transition-all duration-300 hover:bg-[#f0f0f0] hover:shadow-md hover:scale-110"
          disabled={isPending}
        >
          <div className="text-xl text-gray-600 hover:text-gray-800">→</div>
        </button>
      </div>
    </div>
  );
};

export default BlogCarousel;
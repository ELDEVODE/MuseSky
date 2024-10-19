import React, { useState, useTransition } from 'react';
import BlogCard from './BlogCard';

const BlogCarousel = ({ posts }) => {
  const maxPosts = posts.slice(0, 12); // Limit to 12 posts
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [direction, setDirection] = useState('next');

  const nextSlide = () => {
    setDirection('next');
    startTransition(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % maxPosts.length);
    });
  };

  const prevSlide = () => {
    setDirection('prev');
    startTransition(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + maxPosts.length) % maxPosts.length);
    });
  };

  const getVisiblePosts = () => {
    const visiblePosts = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % maxPosts.length;
      visiblePosts.push(maxPosts[index]);
    }
    return visiblePosts;
  };

  return (
    <div className="w-full px-4 flex-col justify-center items-between gap-8 flex">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative overflow-hidden">
        {getVisiblePosts().map((post, index) => (
          <div
            key={index}
            className={`w-full md:w-1/3 transition-all duration-300 ${isPending
                ? direction === 'next'
                  ? '-translate-x-full opacity-0'
                  : 'translate-x-full opacity-0'
                : 'translate-x-0 opacity-100'
              }`}
          >
            <BlogCard
              id={post.id}
              title={post.title}
              content={post.content}
              imageUrl={post.imageUrl}
              date={post.date}
            />
          </div>
        ))}
      </div>
      <div className="hidden md:flex justify-start items-center gap-4">
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

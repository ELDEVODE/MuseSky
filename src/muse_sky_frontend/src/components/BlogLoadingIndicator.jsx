import React from 'react';
import '../styles/loadingIndicator.css';

const BlogLoadingIndicator = () => {
  return (
    <div className="flex flex-col justify-center items-center my-12">
      <div className="space-loader">
        <div className="planet"></div>
        <div className="star star-1"></div>
        <div className="star star-2"></div>
        <div className="star star-3"></div>
      </div>
      <p className="mt-4 text-[#dfdfd1] text-sm font-onest loading-text">
        <span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span><span>.</span><span>.</span><span>.</span>
      </p>
    </div>
  );
};

export default BlogLoadingIndicator;

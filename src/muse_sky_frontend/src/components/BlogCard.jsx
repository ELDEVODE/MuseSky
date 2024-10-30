import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ id, title, content, imageUrl, date }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full rounded-lg overflow-hidden shadow-lg flex flex-col transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
      onClick={() => navigate("/blog/" + id)}
    >
      <img
        className="w-full h-48 rounded-lg object-cover"
        src={imageUrl}
        alt={title}
      />
      <div className="py-4 px-0 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2">
          <h2 className="text-white text-lg font-semibold font-['Onest'] leading-tight mb-2 line-clamp-2">
            {title}
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="flex-shrink-0"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <p className="text-[#dfdfd1] text-sm font-normal font-['Onest'] leading-normal mb-3 flex-grow line-clamp-3">
          <div dangerouslySetInnerHTML={{ __html: content }} /> {}
        </p>
        <div className="text-[#8c8c8c] text-sm font-normal font-['Onest']">
          {date}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

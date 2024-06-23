import React from "react";
import { Link } from "react-router-dom";

const BlogItem = ({ title, description, link, date, imgSrc }) => {
  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded">
      <Link to={link} aria-label="Article">
        <img src={imgSrc} className="object-cover w-full h-64 rounded" alt="" />
      </Link>
      <div className="py-5">
        <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
          {date}
        </p>
        <Link
          to={link}
          aria-label="Article"
          className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
        >
          <p className="text-2xl font-bold leading-5">{title}</p>
        </Link>
        <p className="mb-4 text-gray-700 text-ellipsis line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default BlogItem;

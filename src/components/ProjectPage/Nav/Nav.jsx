import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="fixed w-full px-4 py-6 mx-auto lg:py-8 md:px-24 lg:px-8 z-10 bg-white">
      <div className="relative flex items-center justify-between lg:justify-center lg:space-x-16">
        <Link
          to="/"
          aria-label="CYC"
          title="CYC"
          className="inline-flex items-center"
        >
          <img src="/img/logo.png" className="w-12" alt="logo" />
          <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase mr-auto">
            Connieyepiz
          </span>
        </Link>        
      </div>
    </div>
  );
};

export default Nav;

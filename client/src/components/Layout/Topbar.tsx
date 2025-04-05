import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className="bg-error text-white">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
          We ship worldwide - Fast and reliable shipping!
        </div>
        <div className="text-sm hidden md:block">
          <a href="tel:+8801847293674" className="hover:text-gray-300">
            +880 1847293674
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

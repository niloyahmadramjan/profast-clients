import React from "react";
import { FaLinkedin, FaXTwitter, FaFacebook, FaYoutube } from "react-icons/fa6";
import logo from "../assets/footerLogo.png";


const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 md:rounded-t-3xl rounded-t-md mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center space-y-6">
        {/* Logo and description */}
        <div className="flex flex-col items-center space-y-3">
          <img
            src={logo}
            alt="Profast Logo"
            className="h-10"
          />
          <p className="text-sm md:text-base max-w-xl text-gray-400">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
            From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>

        {/* Menu links */}
        <div className="border-t border-gray-700 w-full pt-6">
          <ul className="flex flex-wrap justify-center gap-6 text-sm md:text-base text-gray-300">
            <li><a href="#services" className="hover:text-white">Services</a></li>
            <li><a href="#coverage" className="hover:text-white">Coverage</a></li>
            <li><a href="#about" className="hover:text-white">About Us</a></li>
            <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
            <li><a href="#blog" className="hover:text-white">Blog</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social icons */}
        <div className="border-t border-gray-700 w-full pt-6 flex justify-center space-x-6">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle bg-[#0A66C2] text-white">
            <FaLinkedin size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle bg-white text-black">
            <FaXTwitter size={20} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle bg-[#1877F2] text-white">
            <FaFacebook size={20} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle bg-[#FF0000] text-white">
            <FaYoutube size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">

        {/* Project Name and Tagline */}
        <div className="text-center mb-6">
          <h3 className="text-lg md:text-2xl font-bold">PathPulse</h3>
          <p className="text-sm md:text-base mt-2">
            Guiding your ideas from plans to progress together.
          </p>
        </div>

        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
          
          {/* Contact Info */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h4 className="text-base md:text-lg font-semibold">Contact Us</h4>
            <p className="text-sm mt-2">Email: support@pathpulse.com</p>
            <p className="text-sm">Phone: +880 1234 567 890</p>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <h4 className="text-base md:text-lg font-semibold">Connect with Us</h4>
            <div className="flex justify-center space-x-4 mt-2 text-[rgb(10,186,181)]">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-xl">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-xl">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-xl">
                <FaInstagram />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-xl">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 text-sm border-t border-gray-700 pt-4">
          <p>© {new Date().getFullYear()} PathPulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


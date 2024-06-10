import React from 'react';
import { FaGithub, FaHome, FaInfoCircle } from 'react-icons/fa';

const Navbar = () => {
  return (
    <header className="nav px-8 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Youtube Downloader</h1>
        <nav className="flex items-center gap-8">
          <button
            aria-label="info"
            onClick={() => alert('Information about the website')}
            className="text-white primary-bg rounded-xl p-2 shadow-md"
          >
            <FaInfoCircle size={24} />
          </button>

          <button
            aria-label="home"
            onClick={() => window.location.href = '/'}
            className="text-white primary-bg rounded-xl p-2 shadow-md"
          >
            <FaHome size={24} />
          </button>

          <button
            aria-label="github"
            onClick={() => window.open('https://github.com/KoiByteDev', '_blank')}
            className="text-white primary-bg rounded-xl p-2 shadow-md"
          >
            <FaGithub size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

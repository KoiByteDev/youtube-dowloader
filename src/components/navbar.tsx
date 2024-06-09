import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { FaGithub, FaHome, FaInfoCircle } from 'react-icons/fa';

const Navbar = () => {
  return (
    <AppBar position="static" className="nav px-8 py-4">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" component="div">
          Vetch
        </Typography>
        <div className="flex items-center gap-8">
          <div className="relative">
            <div className="absolute inset-0 bg-pink-600 rounded-lg blur z-0"></div>
            <div className="relative z-10 bg-black rounded-lg pr-3">
              <IconButton
                edge="end"
                aria-label="info"
                onClick={() => alert('Information about the website')}
                className="relative text-white"
              >
                <FaInfoCircle size={24} />
              </IconButton>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-pink-600 rounded-lg blur z-0"></div>
            <div className="relative z-10 bg-black rounded-lg pr-3">
              <IconButton
                edge="end"
                aria-label="home"
                onClick={() => window.location.href = '/'}
                className="relative text-white"
              >
                <FaHome size={24} />
              </IconButton>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-pink-600 rounded-lg blur z-0"></div>
            <div className="relative z-10 bg-black rounded-lg pr-3">
              <IconButton
                edge="end"
                aria-label="github"
                onClick={() => window.open('https://github.com/KoiByteDev', '_blank')}
                className="relative text-white"
              >
                <FaGithub size={24} />
              </IconButton>
            </div>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

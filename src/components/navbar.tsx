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
        <div className="flex items-center gap-12"><IconButton
            edge="end"
            aria-label="info"
            onClick={() => alert('Information about the website')}
            className="text-white"
          >
            <FaInfoCircle size={24} />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="home"
            onClick={() => window.location.href = '/'}
            className="text-white"
          >
            <FaHome size={24} />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="github"
            onClick={() => window.open('https://github.com/KoiByteDev', '_blank')}
            className="text-white"
          >
            <FaGithub size={24} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

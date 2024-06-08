import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const MainPage: NextPage = () => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  const handleSubmit = async () => {
    console.log('Fetching Video...');
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        console.log('Video downloaded successfully!');
        const data = await response.json();
        setMessage(`Video Title: ${data.title}`);
      } else {
        setMessage('Failed to fetch video information.');
      }
    } catch (error) {
      console.error('Error fetching video information:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full gap-8 px-4 md:px-0">
      <div className={`justify-center items-center bg-secondary rounded-lg w-full md:w-2/3 bg-black ${animate ? 'press-effect' : ''}`}>

        <input
          type="text"
          className="w-full bg-black text-white placeholder-gray-400 border-none rounded-lg p-3 focus:ring-gradient"
          placeholder="Paste a Video Link Here to Get Started"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setAnimate(true);
          }}
        />
      </div>

      <Button
        variant="contained"
        onClick={handleSubmit}
        className="bg-pink-600 hover:bg-pink-700"
      >
        Download
      </Button>
      {message && (
        <div className="bg-secondary p-4 rounded-lg mt-4 w-full text-center">
          {message}
        </div>
      )}

    </div>
  );
};

export default MainPage;

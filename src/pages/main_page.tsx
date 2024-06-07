import { NextPage } from 'next';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';

const MainPage: NextPage = () => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
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
    <div className="flex flex-col justify-center items-center gap-4 w-2/3">
      <div className="justify-center items-center bg-white rounded-lg p-2 w-full">
        <TextField
          className="w-full"
          placeholder="Paste a Video Link Here to Get Started"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={handleSubmit} className="bg-blue-500 text-white rounded-lg p-2 w-24">
          Submit
        </Button>
      </div>
      {message && (
        <div className="bg-gray-700 p-4 rounded-lg mt-4 w-full text-center">
          {message}
        </div>
      )}
    </div>
  );
};

export default MainPage;

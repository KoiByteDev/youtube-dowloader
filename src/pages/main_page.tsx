import { NextPage } from 'next';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';

const MainPage = () => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleDownload = async () => {
    const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    if (response.ok) {
      setMessage(`Download completed: ${data.filePath}`);
    } else {
      setMessage(`Error: ${data.error}`);
    }
  }
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
        <Button onClick={handleDownload} className="bg-blue-500 text-white rounded-lg p-2 w-24">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default MainPage;

import { NextPage } from 'next';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';


const MainPage: NextPage = () => {
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
        />
      </div>
      <div className="flex items-center gap-2">
        <Button className="bg-blue-500 text-white rounded-lg p-2 w-24">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default MainPage;

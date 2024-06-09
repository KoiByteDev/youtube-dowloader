import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

const MainPage: NextPage = () => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [animate, setAnimate] = useState(false);
  const [videoData, setVideoData] = useState<{ title: string; description: string; thumbnail: string } | null>(null);

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
        setVideoData({
          title: data.title,
          description: data.description,
          thumbnail: data.thumbnail,
        });
      } else {
        const errorData = await response.json()
        console.error('Failed to fetch video information:', errorData.error);
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

      {videoData && (
        <div className="bg-secondary p-4 rounded-lg mt-4 w-full md:w-2/3 text-center">
          <img src={videoData.thumbnail} alt="Video Thumbnail" className="w-full h-auto rounded-lg mb-4" />
          <h2 className="text-white text-lg font-bold mb-2">{videoData.title}</h2>
          <p className="text-gray-400 mb-4">{videoData.description}</p>
          <a href="/downloads/video.mp4" download className="text-white bg-pink-600 hover:bg-pink-700 py-2 px-4 rounded-lg">Download Video</a>
        </div>
      )}

      {message && (
        <div className="bg-secondary p-4 rounded-lg mt-4 w-full text-center">
          {message}
        </div>
      )}
    </div>
  );
};

export default MainPage;

import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

const MainPage: NextPage = () => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [animate, setAnimate] = useState(false);
  const [videoQueue, setVideoQueue] = useState<
    { id: string; title: string; description: string; thumbnail: string }[]
  >([]);

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
        const data = await response.json();
        console.log('Video downloaded successfully!');
        setVideoQueue(prevQueue => [
          ...prevQueue,
          {
            id: Math.random().toString(36).substr(2, 9), 
            title: data.title,
            description: data.description,
            thumbnail: data.thumbnail,
          }
        ]);
        setUrl(''); 
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch video information:', errorData.error);
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error fetching video information:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleRemoveVideo = (id: string) => {
    setVideoQueue(prevQueue => prevQueue.filter(video => video.id !== id));
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full gap-8 px-4 md:px-0">

      <div className={`justify-center items-center bg-secondary rounded-lg w-full md:w-3/5 gray-bg ${animate ? 'press-effect' : ''} z-10`}>
        <input
          type="text"
          className="w-full gray-bg text-white placeholder-gray-400 border-none rounded-lg p-6 focus:ring-gradient"
          placeholder="Paste a Video Link Here to Get Started"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setAnimate(true);
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="primary-bg hover:bg-pink-700 text-white font-bold rounded-lg z-10 px-12 py-4 text-xl"
      >
        Get Video
      </button>

      {videoQueue.map(video => (
        <div key={video.id} className="flex flex-row items-center justify-center gray-bg p-8 rounded-xl mt-4 w-full md:w-2/3 text-center relative">
          <img src={video.thumbnail} alt="Video Thumbnail" className="w-1/2 h-auto rounded-2xl mb-4 shadow-xl" />
          <div className="flex flex-col items-center justify-center space-y-10">
            <h2 className="text-white text-3xl w-2/3 font-bold mb-2">{video.title}</h2>
            <div className="text-gray-400 mb-4 overflow-hidden overflow-y-scroll max-h-28 w-2/3 custom-scrollbar">
              <p>{video.description}</p>
            </div>
            <a href={`/downloads/${video.title}.mp4`} download className="text-white font-bold primary-bg hover:bg-pink-700 py-2 px-4 rounded-lg w-3/5 shadow-xl">Download Video</a>
            <button onClick={() => handleRemoveVideo(video.id)} className="absolute top-0 right-9 font-bold text-red-500  hover:bg-red-700 hover:text-black rounded-full px-4 py-2.5">X</button>
          </div>
        </div>
      ))}

      {message && (
        <div className="bg-secondary p-4 rounded-lg mt-4 w-full text-center">
          {message}
        </div>
      )}
    </div>
  );
};

export default MainPage;

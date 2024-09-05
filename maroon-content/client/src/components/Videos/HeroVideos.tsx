import React, { useState } from 'react';
import { useVideoFiles } from '../../hooks/useVideoFiles'; // Import the custom hook
import VideoModal from './VideoModal'; // Import the VideoModal component

export const HeroVideos = () => {
  const [showModal, setShowModal] = useState(false);
  const { files, loading, error } = useVideoFiles(); // Use the custom hook to fetch video files

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Get the last video file's details, default to fallback values if no files are available
  const lastFile = files.length > 0 ? files[files.length - 1] : {
    imageFilePath: 'path/to/default-image.jpg', // Replace with a default image path if needed
    title: 'Default Title',
    source: 'Default Source',
    videoFilePath: 'https://www.youtube.com/embed/DhHuqmvGnao'
  };

  const backgroundImage = `http://localhost:5000/uploads/${lastFile.imageFilePath}`;
  const Video = `http://localhost:5000/uploads/${lastFile.videoFilePath}`;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className='hero-videos' style={{ backgroundImage: `url(${backgroundImage})` }}>
        <i className="bi bi-play-circle" onClick={handleShow}></i>
        <h3 className='hero-videos-title'>{lastFile.title}</h3>
      </div>

      <VideoModal
        show={showModal}
        onClose={handleClose}
        video={Video}
        source={lastFile.source}
      />
    </div>
  );
};

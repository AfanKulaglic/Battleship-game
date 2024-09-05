import React, { useRef, useState } from 'react';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Button } from 'react-bootstrap';
import VideoModal from './VideoModal'; // Import the VideoModal component
import { useVideoFiles } from '../../hooks/useVideoFiles'; // Import the custom hook

export const Featured: React.FC = () => {
  const carouselRef = useRef<AliceCarousel | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [sourceVideo, setSelectedSourceVideo] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);

  const { files, loading, error } = useVideoFiles(); // Use the hook

  const handlePrev = () => {
    const newIndex = activeIndex === items.length - 1 ? 0 : activeIndex - 1;
    setActiveIndex(newIndex);
    if (carouselRef.current) {
      carouselRef.current.slideTo(newIndex);
    }
  };

  const handleNext = () => {
    const newIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
    if (carouselRef.current) {
      carouselRef.current.slideTo(newIndex);
    }
  };

  const handleShow = (videoFilePath: string, source: string) => {
    setSelectedVideo(videoFilePath);
    setSelectedSourceVideo(source);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setStartX(event.clientX);
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (startX !== null) {
      const threshold = 10; // Adjust this threshold as needed
      const dragDistance = Math.abs(event.clientX - startX);

      if (dragDistance < threshold) {
        // Handle click
        const target = event.currentTarget;
        const videoFilePath = target.getAttribute('data-video-path') || '';
        const source = target.getAttribute('data-source') || '';
        handleShow(videoFilePath, source);
      }
    }
    setStartX(null); // Reset the startX state
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const items = files.map((file) => (
    <div
      role="presentation"
      className="featured-videos-card-col"
      style={{ backgroundImage: `url(http://localhost:5000/uploads/${file.imageFilePath})` }}
      key={file._id}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      data-video-path={file.videoFilePath}
      data-source={file.source}
    >
      <div className="featured-videos-content">
        <i className="bi bi-play-circle"></i>
        <h4>{file.title}</h4>
      </div>
    </div>
  )).reverse();

  return (
    <div className='featured-videos'>
        <h2 className='featured-videos-title'>Featured</h2>
        <AliceCarousel
            ref={carouselRef}
            mouseTracking
            items={items}
            activeIndex={activeIndex}
            responsive={{
              0: { items: 2.6 },
              568: { items: 2 },
              1024: { items: 5.2 },
            }}
            disableButtonsControls={true}
            disableDotsControls={true}
          />
          <div className="featured-videos-controller">
            <Button onClick={handlePrev} className="btn-secondary btn-array">
              <i className="bi bi-arrow-bar-left"></i>
            </Button>
            <Button onClick={handleNext} className="btn-secondary btn-array">
              <i className="bi bi-arrow-bar-right"></i>
            </Button>
          </div>
          
        <VideoModal
          show={showModal}
          onClose={handleClose}
          video={selectedVideo ? `http://localhost:5000/uploads/${selectedVideo}` : ''}
          source={sourceVideo ? sourceVideo : ''}
        />
    </div>
  )
}

import React, { useEffect, useRef, useState } from 'react';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Button } from 'react-bootstrap';

interface UploadedFile {
  _id: string;
  title: string;
  filePath: string;
  type: string; // 'news' or 'video'
}

export const Featured: React.FC = () => {
  const carouselRef = useRef<AliceCarousel | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/files")
      .then((res) => res.json())
      .then((data) => setFiles(data.filter((file: UploadedFile) => file.type === 'video'))) // Filtering only video files
      .catch((error) => console.error("Error:", error));
  }, []);

  // Create carousel items from the fetched files
  const items = files.map((file) => (
    <div
      role="presentation"
      className="featured-videos-card-col"
      style={{ backgroundImage: `url(http://localhost:5000/uploads/${file.filePath})` }}
      key={file._id}
    >
      <div className="featured-videos-content">
        <i className="bi bi-play-circle"></i>
        <h4>{file.title}</h4>
      </div>
    </div>
  ));

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
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

  return (
    <div className='featured-videos'>
      <h2 className='featured-videos-title'>Featured</h2>
      <AliceCarousel
        ref={carouselRef}
        mouseTracking
        items={items}
        activeIndex={activeIndex}
        responsive={{
          0: { items: 1 },
          568: { items: 2 },
          1024: { items: 3 },
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
    </div>
  );
};

export default Featured;

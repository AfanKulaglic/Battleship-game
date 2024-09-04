import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import video from '../assets/video.mp4';

export const Hero = () => {
  return (
    <Carousel fade={true} indicators={false} controls={false} className='hero'>
      <Carousel.Item className='hero-container'>
        <video
          className="d-block w-100"
          src={video}
          style={{ objectFit: 'cover', height: '100vh' }}
          autoPlay
          loop
          muted
        />
      </Carousel.Item>
    </Carousel>
  );
}

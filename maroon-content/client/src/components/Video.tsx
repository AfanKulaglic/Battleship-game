import React, { useRef, useState } from "react";
import videoBackground from "../assets/video-background.jpeg";
import { Col, Row } from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import showcase from "../assets/video-container.jpg";
import { Button } from "react-bootstrap";

export const Video = () => {
  const carouselRef = useRef<AliceCarousel | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const items: JSX.Element[] = [
    <div
      role="presentation"
      className="video-card-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={1}
    >
      <div className="video-content">
        <i className="bi bi-play-circle"></i>
      </div>
    </div>,
    <div
      role="presentation"
      className="video-card-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={2}
    >
      <div className="video-content">
        <i className="bi bi-play-circle"></i>
      </div>
    </div>,
    <div
      role="presentation"
      className="video-card-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={3}
    >
      <div className="video-content">
        <i className="bi bi-play-circle"></i>
      </div>
    </div>,
    <div
      role="presentation"
      className="video-card-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={4}
    >
      <div className="video-content">
        <i className="bi bi-play-circle"></i>
      </div>
    </div>,
    <div
      role="presentation"
      className="video-card-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={5}
    >
      <div className="video-content">
        <i className="bi bi-play-circle"></i>
      </div>
    </div>,
    <div
      role="presentation"
      className="video-card-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={6}
    >
      <div className="video-content">
        <i className="bi bi-play-circle"></i>
      </div>
    </div>,
  ];

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
    <div
      className="video"
      style={{ backgroundImage: `url(${videoBackground})` }}
    >
      <Row>
        <Col xs={3} className="video-col">
          <h2 className="video-title">Video</h2>
        </Col>
        <Col xs={9} className="video-col">
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
        </Col>
        <div className="video-controller">
          <Button onClick={handlePrev} className="btn-secondary btn-array">
            <i className="bi bi-arrow-bar-left"></i>
          </Button>
          <Button onClick={handleNext} className="btn-secondary btn-array">
            <i className="bi bi-arrow-bar-right"></i>
          </Button>
          <a href="/#" className="video-controller-all-content-link">
            <i className="bi bi-arrow-bar-right"></i> View All content
          </a>
        </div>
      </Row>
    </div>
  );
};

import React, { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import showcase from "../../assets/video-container.jpg";
import { Button, Col, Row } from "react-bootstrap";
import historyBackground from "../../assets/history2.jpg";

export const History = () => {
  const carouselRef = useRef<AliceCarousel | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const items: JSX.Element[] = [
    <div
      role="presentation"
      className="history-videos-card-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={1}
    >
      <div className="history-videos-content">
        <i className="bi bi-play-circle"></i>
      </div>
    </div>,
    <div
      role="presentation"
      className="history-videos-card-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={2}
    >
      <div className="history-videos-content">
        <i className="bi bi-play-circle"></i>
      </div>
    </div>,
    <div
      role="presentation"
      className="history-videos-card-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={3}
    >
      <div className="history-videos-content">
        <i className="bi bi-play-circle"></i>
      </div>
    </div>,
    <div
      role="presentation"
      className="history-videos-card-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={4}
    >
      <div className="history-videos-content">
        <i className="bi bi-play-circle"></i>
      </div>
    </div>,
    <div
      role="presentation"
      className="history-videos-card-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={5}
    >
      <div className="history-videos-content">
        <i className="bi bi-play-circle"></i>
      </div>
    </div>,
    <div
      role="presentation"
      className="history-videos-card-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={6}
    >
      <div className="history-videos-content">
        <i className="bi bi-play-circle"></i>
      </div>
    </div>,
    <div
      role="presentation"
      className="history-videos-card-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={6}
    >
      <div className="history-videos-content">
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
      className="history-video"
      style={{ backgroundImage: `url(${historyBackground})` }}
    >
      <Row>
        <Col xs={9}>
          <AliceCarousel
            ref={carouselRef}
            mouseTracking
            items={items}
            activeIndex={activeIndex}
            responsive={{
              0: { items: 2.6 },
              568: { items: 2 },
              1024: { items: 5 },
            }}
            disableButtonsControls={true}
            disableDotsControls={true}
          />
        </Col>
        <Col xs={3}>
          <h2 className="history-videos-title">History</h2>
        </Col>
      </Row>
      <div className="history-videos-controller">
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

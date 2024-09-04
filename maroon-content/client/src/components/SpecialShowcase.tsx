import React, { useState, useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import showcase from "../assets/showcase.jpg";
import { Button } from "react-bootstrap";

export const SpecialShowcase: React.FC = () => {
  const carouselRef = useRef<AliceCarousel | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const items: JSX.Element[] = [
    <div
      role="presentation"
      className="special-showcase-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={1}
    >
      <div className="special-showcase-content">
        <h2>asdasasd</h2>
        <Button className="btn-secondary">Read All</Button>
      </div>
    </div>,
    <div
      role="presentation"
      className="special-showcase-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={2}
    >
      <div className="special-showcase-content">
        <h2>asdasasd</h2>
        <Button className="btn-secondary">Read All</Button>
      </div>
    </div>,
    <div
      role="presentation"
      className="special-showcase-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={3}
    >
      <div className="special-showcase-content">
        <h2>asdasasd</h2>
        <Button className="btn-secondary">Read All</Button>
      </div>
    </div>,
    <div
      role="presentation"
      className="special-showcase-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={4}
    >
      <div className="special-showcase-content">
        <h2>asdasasd</h2>
        <Button className="btn-secondary">Read All</Button>
      </div>
    </div>,
    <div
      role="presentation"
      className="special-showcase-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={5}
    >
      <div className="special-showcase-content">
        <h2>asdasasd</h2>
        <Button className="btn-secondary">Read All</Button>
      </div>
    </div>,
    <div
      role="presentation"
      className="special-showcase-col"
      style={{ backgroundImage: `url(${showcase})` }}
      key={6}
    >
      <div className="special-showcase-content">
        <h2>asdasasd</h2>
        <Button className="btn-secondary">Read All</Button>
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
    <div className="special-showcase">
      <AliceCarousel
        ref={carouselRef}
        mouseTracking
        items={items}
        activeIndex={activeIndex}
        responsive={{
          0: { items: 2.6 },
          568: { items: 2 },
          1024: { items: 3.5 },
        }}
        disableButtonsControls={true}
        disableDotsControls={true}
      />
      <div className="d-flex">
        <Button onClick={handlePrev} className="btn-secondary btn-array">
            <i className="bi bi-arrow-bar-left"></i>
        </Button>
        <Button onClick={handleNext} className="btn-secondary btn-array">
            <i className="bi bi-arrow-bar-right"></i>
        </Button>
        <a href="/#" className="special-showcase-all-content-link">
            <i className="bi bi-arrow-bar-right"></i> View All content
        </a>
      </div>
    </div>
  );
};

// src/components/NewsContent.tsx
import React from 'react';
import adminImg from '../../assets/admin.jpg';
import bannerImg from '../../assets/banner.jpeg';
import { Col, Row } from 'react-bootstrap';

const images = [adminImg, bannerImg, adminImg, bannerImg, adminImg, bannerImg];

const NewsContent: React.FC = () => {
  return (
    <div className="news-gallery">
        <h2 className='news-gallery-title'>News</h2>
      <Row>
        <Col xs={12} md={6} className="news-gallery-item" style={{ backgroundImage: `url(${images[0]})` }}>
          <h1 className='news-gallery-item-title'>Last message</h1>
        </Col>
        <Col xs={6} md={3} className="news-gallery-item" style={{ backgroundImage: `url(${images[1]})` }}>
        <h1 className='news-gallery-item-title'>Last message</h1>
        </Col>
        <Col xs={6} md={3} className="news-gallery-item" style={{ backgroundImage: `url(${images[2]})` }}>
        <h1 className='news-gallery-item-title'>Last message</h1>
        </Col>
      </Row>

      <Row>
        <Col xs={6} md={4} className="news-gallery-item" style={{ backgroundImage: `url(${images[2]})` }}>
        <h1 className='news-gallery-item-title'>Last message</h1>
        </Col>
        <Col xs={6} md={4} className="news-gallery-item" style={{ backgroundImage: `url(${images[3]})` }}>
        <h1 className='news-gallery-item-title'>Last message</h1>
        </Col>
        <Col xs={6} md={4} className="news-gallery-item" style={{ backgroundImage: `url(${images[4]})` }}>
        <h1 className='news-gallery-item-title'>Last message</h1>
        </Col>
      </Row>

      <Row>
        <Col xs={3} className="news-gallery-item" style={{ backgroundImage: `url(${images[5]})` }}>
        <h1 className='news-gallery-item-title'>Last message</h1>
        </Col>
        <Col xs={3} className="news-gallery-item" style={{ backgroundImage: `url(${images[0]})` }}>
        <h1 className='news-gallery-item-title'>Last message</h1>
        </Col>
        <Col xs={6} className="news-gallery-item" style={{ backgroundImage: `url(${images[0]})` }}>
        <h1 className='news-gallery-item-title'>Last message</h1>
        </Col>
      </Row>
    </div>
  );
};

export default NewsContent;

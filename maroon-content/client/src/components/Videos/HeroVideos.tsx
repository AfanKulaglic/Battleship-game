import React, { useState } from 'react';
import videoBackground from '../../assets/hero-videos.jpg';
import { Modal } from 'react-bootstrap';

export const HeroVideos = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <div className='hero-videos' style={{ backgroundImage: `url(${videoBackground})` }}>
        <i className="bi bi-play-circle" onClick={handleShow}></i>
        <h3 className='hero-videos-title'>ZORAN ZEKIC PREVIEWS SARAJEVO - RADNIK</h3>
      </div>

      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Body style={{ padding: 0 }}>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src="https://www.youtube.com/embed/DhHuqmvGnao" 
              allowFullScreen
              title="Video Modal"
              style={{ width: '100%', height: '50vh' }}
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};



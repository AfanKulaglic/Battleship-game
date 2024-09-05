import React from 'react';
import { Modal } from 'react-bootstrap';

interface VideoModalProps {
  show: boolean;
  onClose: () => void;
  video: string;
  source: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ show, onClose, video, source }) => {
  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Body style={{ padding: 0, position: 'relative' }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          &times; {/* HTML entity for the close '×' symbol */}
        </button>
        <div className="embed-responsive embed-responsive-16by9 bg-black">
          <iframe
            className="embed-responsive-item"
            src={video} 
            allowFullScreen
            title="Video Modal"
            style={{ width: '100%', height: '50vh' }}
          ></iframe>
          <div
            style={{
              position: 'absolute',
              bottom: 20,
              left: 10,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '5px 10px',
              borderRadius: '5px',
            }}
          >
            source: {source}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VideoModal;

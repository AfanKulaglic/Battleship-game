import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import logoChest from '../assets/logoChest1.png';
import adidasLogo from '../assets/adidasLogo.png';
import { Button } from 'react-bootstrap';

export const Navigation = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = () => {
    if (location.pathname === '/') {
      const position = window.scrollY;
      setIsAtTop(position === 0);
    }
  };

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  useEffect(() => {
    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      setIsAtTop(false); // Set scrolled navigation for all other paths
    }
  }, [location]);

  return (
    <>
      {!isAtTop ? (
        <div className="navigation scrolled">
          <div className="navigation-left">
            <i
              className="bi bi-list"
              id="navigation-icons"
              onClick={toggleOffcanvas}
            />
            <a href="/" className="navigation-left-links">
              Home
            </a>
            <a href="/news" className="navigation-left-links">
              News
            </a>
            <a href="/#" className="navigation-left-links">
              Forum
            </a>
            <a href="/#" className="navigation-left-links">
              About us
            </a>
          </div>
          <img id="navigation-logo" src={logo} alt="Logo" />
          <div className="navigation-right">
            <img src={adidasLogo} className="navigation-adidas-logo" alt="Adidas Logo" />
            <i className="bi bi-search" id="navigation-icons" /> {/* Bootstrap Search Icon */}
            <i className="bi bi-question-circle" id="navigation-icons" /> {/* Bootstrap Help Icon */}
            <i className="bi bi-person" id="navigation-icons" /> {/* Bootstrap Person Icon */}
          </div>
        </div>
      ) : (
        <div className="navigation at-top">
          <div className="navigation-at-top-left">
            <img id="at-top-logo" src={logoChest} alt="Small Logo" />
            <i className="bi bi-house icons-at-top" id="navigation-icons" onClick={() => navigate('/')} />
            <i className="bi bi-play-circle" id="navigation-icons" onClick={() => navigate('/videos')} />
            <i className="bi bi-shadows" id="navigation-icons" onClick={() => navigate('/gallery')} />
            <i className="bi bi-chat-right-text" id="navigation-icons" onClick={() => navigate('/forum')} />
            <i className="bi bi-three-dots-vertical" id="navigation-icons" onClick={toggleOffcanvas} />
          </div>
          <div className="navigation-at-top-right">
            <img src={adidasLogo} className="navigation-adidas-logo" alt="Adidas Logo" />
            <i className="bi bi-search" id="navigation-icons" /> {/* Bootstrap Search Icon */}
            <i className="bi bi-question-circle" id="navigation-icons" /> {/* Bootstrap Help Icon */}
            <i className="bi bi-person" id="navigation-icons" /> {/* Bootstrap Person Icon */}
          </div>
        </div>
      )}

      <div
        className={`offcanvas navigation-offcanvas offcanvas-start bg-transparent ${isOffcanvasOpen ? 'show' : ''}`}
        style={{ visibility: isOffcanvasOpen ? 'visible' : 'hidden' }}
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header bg-transparent">
          <Button
            className="btn-secondary"
            onClick={toggleOffcanvas}
            aria-label="Close"
          >
            <i className="bi bi-x-lg"></i>
          </Button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-unstyled">
            <li className='offcanvas-list'><a href="/#" >Galleries</a></li>
            <li className='offcanvas-list'><a href="/video" >Video</a></li>
            <li className='offcanvas-list'><a href="/#" >Forum</a></li>
          </ul>
        </div>
      </div>
      {isOffcanvasOpen && <div className="offcanvas-backdrop fade show" onClick={toggleOffcanvas}></div>}
    </>
  );
};

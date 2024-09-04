import React from 'react'
import logo from '../assets/logo.png'
import { Container } from 'react-bootstrap'

export const Footer = () => {
  return (
    <div className='footer'>
        <Container>
          <div className='footer-header'>
              <img className='footer-logo' src={logo} />
              <div className='footer-header-right'>
                <i className="bi bi-facebook"></i>
                <i className="bi bi-instagram"></i>
                <i className="bi bi-youtube"></i>
              </div>
          </div>
          <div className='footer-body'>
            <div className='footer-body-column'>
                <h2>Club</h2>
                <a>About us</a>
                <a>Places</a>
            </div>
            <div className='footer-body-column'>
                <h2>Club</h2>
                <a>About us</a>
                <a>Places</a>
            </div>
          </div>
        </Container>
    </div>
  )
}

import React from 'react'
import newsImage from '../../assets/newsBackground.jpeg'
import { Col,Row } from 'react-bootstrap'

export const Header = () => {
  return (
    <div className='header-news' style={{ backgroundImage: `url(${newsImage})` }}>
      <Row>
        <Col xs={6} className='header-news-col'>
        </Col>
        <Col xs={6} className='header-news-col'>
        </Col>
      </Row>
    </div>
  )
}

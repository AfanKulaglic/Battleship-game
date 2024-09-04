import React from 'react'
import membershipImg from '../assets/membership.jpeg'
import membership1 from '../assets/membership1.jpg'
import membership2 from '../assets/membership2.jpg'
import membership3 from '../assets/membership3.jpeg'
import { Col, Row } from 'react-bootstrap'

export const Membership = () => {
  return (
    <div className='membership' style={{ backgroundImage: `url(${membershipImg})` }}>
        <h2 className="membership-title">Membership</h2>
        <div className='membership-content'>
            <Row className='membership-row'>
                <Col className='membership-col' xs={4} style={{ backgroundImage: `url(${membership1})` }}>
                    <p className='membership-col-content'>
                        YOUNG-JUNIOR-KIDS
                    </p>
                </Col>
                <Col className='membership-col' xs={4} style={{ backgroundImage: `url(${membership2})` }}>
                    <p className='membership-col-content'>
                        OLD SCHOOL
                    </p>
                </Col>
                <Col className='membership-col' xs={4} style={{ backgroundImage: `url(${membership3})` }}>
                    <p className='membership-col-content'>
                        1946
                    </p>
                </Col>
            </Row>
        </div>
    </div>
  )
}

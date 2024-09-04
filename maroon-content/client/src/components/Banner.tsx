import React from 'react'
import banner from '../assets/banner.jpeg'
import { Button } from 'react-bootstrap'

export const Banner = () => {
  return (
    <div className='banner' style={{ backgroundImage: `url(${banner})` }}>
        <div className='banner-content'>
            <h2 className='banner-content-title'>SVAKA KO DA JE ZADNJA !</h2>
            <p className='banner-content-text'>svi na kosevo</p>
            <p className='banner-content-text'>Petak 28.08.2023</p>
            <div className='d-flex'>
                <Button className='btn btn-secondary'>buy a ticket</Button>
            </div>
        </div>
    </div>
  )
}

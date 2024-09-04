import React from 'react'
import { Hero } from '../components/Hero'
import { SpecialShowcase } from '../components/SpecialShowcase'
import { Matches } from '../components/Matches'
import { Video } from '../components/Video'
import { Membership } from '../components/Membership'
import { Banner } from '../components/Banner'
import { LatestMatches } from '../components/LatestMatches'
import { Footer } from '../components/Footer'
import { Navigation } from '../components/Navigation'

export const Home = () => {
  return (
    <>
        <Navigation />
        <Hero />
        <SpecialShowcase />
        <Matches />
        <Video />
        <Membership />
        <Banner />
        <LatestMatches />
        <Footer />
    </>
  )
}

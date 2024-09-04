import React from 'react'
import { Navigation } from '../components/Navigation'
import { Header } from '../components/News/Header'
import ContentNews from '../components/News/ContentNews'
import { Footer } from '../components/Footer'

export const News = () => {
  return (
    <>
        <Navigation />
        <Header />
        <ContentNews />
        <Footer />
    </>
  )
}

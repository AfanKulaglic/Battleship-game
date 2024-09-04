import React from "react";
import { Navigation } from "../components/Navigation";
import { HeroVideos } from "../components/Videos/HeroVideos";
import { Featured } from "../components/Videos/Featured";
import { Highlights } from "../components/Videos/Highlights";
import { Interviews } from "../components/Videos/Interviews";
import { History } from "../components/Videos/History";
import { Footer } from "../components/Footer";

export const Videos = () => {
  return (
    <>
      <Navigation />
      <HeroVideos />
      <Featured />
      <Highlights />
      <Interviews />
      <History />
      <Footer />
    </>
  );
};

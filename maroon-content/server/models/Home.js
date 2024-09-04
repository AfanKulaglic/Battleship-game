// models/Home.js
const mongoose = require("mongoose");

const heroVideoSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
});

const videoBackgroundSchema = new mongoose.Schema({
  backgroundUrl: String,
});

const membershipSchema = new mongoose.Schema({
  backgroundUrl: String,
});

const bannerSchema = new mongoose.Schema({
  backgroundUrl: String,
});

const lastGamesSchema = new mongoose.Schema({
  backgroundUrl: String,
});

const HeroVideo = mongoose.model("HeroVideo", heroVideoSchema);
const VideoBackground = mongoose.model("VideoBackground", videoBackgroundSchema);
const Membership = mongoose.model("Membership", membershipSchema);
const Banner = mongoose.model("Banner", bannerSchema);
const LastGames = mongoose.model("LastGames", lastGamesSchema);

module.exports = {
  HeroVideo,
  VideoBackground,
  Membership,
  Banner,
  LastGames,
};

require("dotenv").config();

// console.log('dotenv loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.OMDB = {
    id: "trilogy"
};

exports.bands = {
  id: "codingbootcamp"
}

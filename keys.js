require("dotenv").config();

console.log('dotenv loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.OMDB = {
    id: process.env.OMDB_KEY
};

exports.bands = {
  id: process.env.BANDS_KEY
}

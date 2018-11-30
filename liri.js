// initialize keys and packages
var keys = require("./keys");
require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var moment = require("moment");

// variables storing user inputs
var input1 = process.argv[2];
var input2 = process.argv.slice(3).join(" ");

// Initializing keys
var spotify = new Spotify(keys.spotify);
var OMDBkey = keys.OMDB;
var bandsKey = keys.bands;

// *** CONCERT THIS COMMAND **
var myBands = function() {
  axios.get("https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=" + bandsKey.id).then(
    function (response) {
      var results = response.data
      for (var i = 0; i < results.length; i++) {
        console.log("----------------------------------------")
        var resultsArtist = results[i]
        var venue = resultsArtist.venue
        console.log("************** VENUE **************")
        console.log(venue.name)
        console.log(venue.city, venue.region)
        console.log("*********** DATE & TIME ***********")
        var dateArtist = resultsArtist.datetime
        console.log("ON: ", dateArtist.slice(0, 10))
        console.log("AT: ", moment(dateArtist).format("hh:mm a"))
        console.log("----------------------------------------")
      }
    },
    function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` object returns details on error
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  ); // END Bands in Town API then function
} // END myBands function


// *** SPOTIFY THIS SONG COMMAND **
var mySpotify = function() {
  if (input2 === undefined) {
    input2 = "The Sign";
  }
  spotify
    .search({
      type: 'track',
      query: input2,
      limit: 7
    })
    .then(function (response) {
      var artistItems = response.tracks.items
      console.log("\n");
      for (var i = 0; i < artistItems.length; i++) {
        console.log("***Song: " + input2 + "***")
        console.log("***Artist(s)***")
        var artistNames = artistItems[i].artists
        for (var j = 0; j < artistNames.length; j++) {
          console.log(artistNames[j].name)
        }
        console.log("***Song preview by Spotify***")
        if (artistItems[i].preview_url == null) {
          console.log("No Preview Available")
        } else {
          console.log(artistItems[i].preview_url)
        }

        var artistAlbum = artistItems[i].album
        console.log("***From Album***")
        console.log(artistAlbum.name);
        console.log("--------------------------");
      }
    })
    .catch(function (err) {
      console.log(err)
    });
} // END spotify-this-song command function

// *** MOVIE THIS SONG COMMAND **
var myMovie = function() {
  if (input2 === undefined) {
    input2 = "Mr Nobody";
  }
  axios.get("http://www.omdbapi.com/?t=" + input2 + "&apikey=" + OMDBkey.id).then(
    function (response) {
      var results = response.data
      console.log("-----" + results.Title + "-----")
      console.log("*Year Released: ", results.Year)
      console.log("*IMdb Rating:", results.imdbRating)
      var ratingsMovie = results.Ratings
      for (var i = 0; ratingsMovie.length; i++) {
        var rating = ratingsMovie[1]
        console.log("*Rotten Tomatoes Rating: ", rating)
        break
      }
      console.log("*Country of Origin: ", results.Country)
      console.log("*Language: ", results.Language)
      console.log("*Plot: ", results.Plot)
      console.log("*Actors: ", results.Actors)
    },
    function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message)
      }
      console.log(error.config)
    }
  ); // END OMDB API then function
} // END movie-this command function

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    var dataArr = data.split(",");
    if (dataArr[0] === "concert-this") {
        // assign values to input variable
        input1 = dataArr[0]
        input2 = dataArr[1]
        myBands()
    }
    if (dataArr[0] === "spotify-this-song") {
      // assign values to input variable
        input1 = dataArr[0]
        input2 = dataArr[1]
        mySpotify()
    }
    if (dataArr[0] === "movie-this") {
      // assign values to input variable
      input1 = dataArr[0]
      input2 = dataArr[1]
      myMovie()
    }
    if (error) {
      return console.error(error)
    }
    console.log(dataArr)
  });
}

var select = function(caseData, functionData){
    switch (caseData){
      case "concert-this":
        myBands(functionData);
        break;
      case "spotify-this-song":
        mySpotify(functionData);
        break;
      case "movie-this":
        myMovie();
        break;
      case "do-what-it-says":
        doWhatItSays();
        break;
      default:
        console.log("LIRI doesn't know this command");
    }
};

var main = function(input1, input2){
  select(input1, input2);
}

main(input1, input2);
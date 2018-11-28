// initialize keys and packages
var keys = require("./keys");
require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var moment = require("moment");

// variables storing user inputs
var input1 = process.argv[2];
var input2 = process.argv[3] + " " + process.argv[4];

// removes input from index 4 if single word title entered by user
if (process.argv[4] === undefined) {
  // simply redefines var input2 to take input from index 3 only
  var input2 = process.argv[3];
}

// Initializing keys
var spotify = new Spotify(keys.spotify);
// var OMDBkey = new OMDB(keys.OMDB);
var bandsKey = keys.bands;

// *** CONCERT THIS COMMAND **


var myBands = function() {
  axios.get("https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=" + bandsKey).then(
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
      // console.log("---RESPONSE start---")
      // console.log(response)
      // console.log("---RESPONSE end---")
      var artistItems = response.tracks.items
      // console.log("---Artist Items start---")
      // console.log(artistItems)
      // console.log("---Artist Items end---")
      console.log("\n");
      // artistItems = response.tracks.items
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
      // console.log("---Output test start---")
      // console.log("---Output test end---")
    })
    .catch(function (err) {
      console.log(err)
    });
} // END conditional for spotify-this-song command

// *** MOVIE THIS SONG COMMAND **
var myMovie = function() {
  axios.get("http://www.omdbapi.com/?t=" + input2 + "&apikey=4c12a09a").then(
    function (response) {
      var results = response.data
      // console.log("---RESPONSE.DATA---")
      // console.log(results)
      // console.log("---RESPONSE.DATA---")
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
} // END conditional for movie-this

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    var dataArr = data.split(",")
    console.log(dataArr[0])
    if (dataArr[0] === "concert-this") {
        input1 = dataArr[0]
        input2 = dataArr[1]
        myBands();
    }
    if (dataArr[0] === "spotify-this-song") {
        input1 = dataArr[0]
        input2 = dataArr[1]
        mySpotify();
    }
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.error(error)
    }
    // // We will then print the contents of data
    // console.log(data)
    // // Then split it by commas (to make it more readable)
    // var dataArr = data.split(",")
    // // We will then re-display the content as an array for later use.
    console.log(dataArr)
  });
} // end do-what-it-says command for loop

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
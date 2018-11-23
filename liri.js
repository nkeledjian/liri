// initialize axios
var keys = require("./keys");
require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var moment = require("moment");
// var moment = moment();

// variables storing user inputs and utility
var input1 = process.argv[2];
var input2 = process.argv[3];
var spotify = new Spotify(keys.spotify);
// var OMDBkey = new OMDB(keys.OMDB);
// var bandsKey = new bands(keys.bands);

// *** CONCERT THIS COMMAND **
if (input1 === "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=").then(
        function (response) {
            var results = response.data;
            // console.log("----------RESPONSE.DATA----------");
            // console.log(results)
            // console.log("----------RESPONSE.DATA----------");
            for (var i = 0; i < results.length; i++) {
                console.log("--------------------")
                var resultsArtist = results[i]
                console.log(" *********** VENUE ***********  ")
                console.log(resultsArtist.venue)

                // var venueArtist = resultsArtist.venue;
                // console.log(" VENUE TEST OUTPUT START")
                // for (var j = 0; j < venueArtist.length; j++) {
                //     console.log(venueArtist[j].name)
                //     console.log(venueArtist[j].city)
                // }
                // console.log("VENUE TEST OUTPUT END")

                console.log(" *********** DATE & TIME *********** ")
                var dateArtist = resultsArtist.datetime;
                console.log("ON: ", dateArtist.slice(0, 10));
                console.log("AT: ", moment(dateArtist).format("hh:mm"));
                console.log(" *********** FULL LINEUP *********** ")
                console.log(resultsArtist.lineup);
                console.log("--------------------")
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
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    ); // END Bands in Town API then function
} // END conditional for concert-this command


// *** SPOTIFY THIS SONG COMMAND **
if (input1 === "spotify-this-song") {
    spotify
    .search({ type: 'track', query: input2 })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.log(err);
    });
} // END conditional for spotify-this-song command

// *** MOVIE THIS SONG COMMAND **
if (input1 === "movie-this") {
    axios.get("http://www.omdbapi.com/?s=" + input2 + "&apikey=" + OMDBkey).then(
        function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            console.log(response.data);
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
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    ); // END OMDB API then function
} // END conditional for movie-this

if (input1 === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
        for (var i=0; i<data.length; i++){
            if (data[0] === "concert-this"){
                // call bands in town API function
            }
        }
        
        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.error(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);
      
      });
}
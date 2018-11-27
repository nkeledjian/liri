// initialize keys and packages
var keys = require("./keys");
require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var moment = require("moment");

// variables storing user inputs and utility
var input1 = process.argv[2];
// var input2 = process.argv[3];

// USE BELOW CODE TO IMPLEMENT MULTIPLE INPUTS
var nodeArg = process.argv;
var userInputArr = [];

for (var i=3; i< nodeArg.length; i++){
    userInputArr.push(nodeArg[i]);
}

var spotify = new Spotify(keys.spotify);
// var OMDBkey = new OMDB(keys.OMDB);
// var bandsKey = new bands(keys.bands);

// *** CONCERT THIS COMMAND **

    if (input1 === "concert-this") {
        axios.get("https://rest.bandsintown.com/artists/" + userInputArr + "/events?app_id=").then(
            function (response) {
                var results = response.data
                for (var i = 0; i < results.length; i++) {
                    console.log("----------------------------------------")
                    var resultsArtist = results[i]
                    var venue = resultsArtist.venue
                    console.log("*********** VENUE ***********")
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
    } // END conditional for concert-this command


// *** SPOTIFY THIS SONG COMMAND **
if (input1 === "spotify-this-song") {
    spotify
        .search({
            type: 'track',
            query: userInputArr,
            limit: 1
        })
        .then(function (response) {
            // console.log("---RESPONSE start---")
            // console.log(response)
            // console.log("---RESPONSE end---")
            var results = response.tracks
            var artistItems = results.items
            // console.log("---Artist Items start---")
            // console.log(artistItems)
            // console.log("---Artist Items end---")
            console.log("\n");
            console.log("***Song: " + userInputArr.toUpperCase() + "***")

            // artistItems = response.tracks.items
            for (var i = 0; i < artistItems.length; i++) {
                console.log("***Artist(s)***")
                var artistNames = artistItems[i].artists
                for (var j = 0; j < artistNames.length; j++) {
                    console.log(artistNames[j].name)
                }
                console.log("***Song preview by Spotify***")
                console.log(artistItems[i].preview_url)

                var artistAlbum = artistItems[i].album
                console.log("***From Album***")
                console.log(artistAlbum.name);
            }
            // console.log("---Output test start---")
            // console.log("---Output test end---")
        })
        .catch(function (err) {
            console.log(err)
        });
} // END conditional for spotify-this-song command

// *** MOVIE THIS SONG COMMAND **
if (input1 === "movie-this") {
    axios.get("http://www.omdbapi.com/?t=" + userInputArr + "&apikey=").then(
        function (response) {
            // If the axios was successful...
            // Then log the body from the site!
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

if (input1 === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        for (var i = 0; i < data.length; i++) {
            if (data[0] === "concert-this") {
                // call bands in town API function with data[1]
            }
            if (data[0] === "spotify-this-song") {
                // call spotify API function with data[1]
            }
            if (data[0] === "movie-this") {
                // call OMDB API function with data[1]
            }
        }
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.error(error)
        }
        // We will then print the contents of data
        console.log(data)
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",")
        // We will then re-display the content as an array for later use.
        console.log(dataArr)

    });
}
// } // end input for loop
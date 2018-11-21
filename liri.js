// initialize axios
var axios = require("axios");

// variables storing user inputs and utility
var input1 = process.argv[2];
var input2 = process.argv[3];
// var spotify = new Spotify(keys.spotify);
// var OMDBkey = new OMDB(keys.OMDB);
// var bandsKey = new bands(keys.bands);

// var musicInfo = {
//     "crossDomain": true,
//     "url": 'https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?market=ES&include_groups=appears_on&limit=2',
//     "method": 'GET',
//     "responseType": 'stream',
//     "headers": {
//         "Authorization": 'Bearer ' + spotify,
//     }
// }

if (input1 === "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=" + bandsKey).then(
        function(response) {
            // If the axios was successful...
            // Then log the body from the site!
            // var results = response.data
            console.log("----------");
            console.log(response.data);
            console.log("----------");
            console.log("----------");
            // var response.data = results;
            // for(var i=0; i < results.venue.length; i++) {
            //     console.log(results.venue[i].name);
            //     console.log(results.venue[i].city);
            // }
            console.log(response.data.datetime);
            console.log("----------");
        },
        function(error) {
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

if (input1 === "spotify-this-song") {
    axios(musicInfo).then(
        function(response) {
            // If the axios was successful...
            // Then log the body from the site!
            console.log(response.data);
        },
        function(error) {
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
    ); // END Spotify API then function
} // END conditional for spotify-this-song command

if (input1 === "movie-this") {
    axios.get("http://www.omdbapi.com/?s=" + input2 + "&apikey=" + OMDBkey).then(
        function(response) {
            // If the axios was successful...
            // Then log the body from the site!
            console.log(response.data);
        },

        function(error) {
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
# LIRI 
##### (Language Interpretation and Recognition Interface)

## Setup Instructions :wrench: :

##### Step 1:
Download/clone files to your machine.

##### Step 2:
You will need to sign up for a [Spotify](https://www.spotify.com/us/) account to aquire a spotify API key (SPOTIFY_ID) and a secret key (SPOTIFY_SECRET) (more detail on the ID and SECRET below). You will also need an account with [OMDB](https://www.omdbapi.com/) and [Bands in Town](https://www.bandsintown.com/) to acquire API keys.

##### Step 3:
Create a .env file within the root of the project folder and place the following code within it and insert your keys (without curly braces):

```
SPOTIFY_ID={your ID key here}
SPOTIFY_SECRET={your SECRET key here}
OMDB_KEY={your API key here}
BANDS_KEY={your API key here}

```

##### Step 4:
Create a file named `keys.js` within the root of the project folder and place the following code within it:

```
require("dotenv").config();

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
```

The keys.js file will access the variables containing your API keys from your local .env file you created.

##### Step 5:
Ensure that you have a [Git](https://git-scm.com/downloads) Bash/Console installed on your machine along with nodeJS (download the LTS version of [nodeJS](https://nodejs.org/en/)).

Navigate to the root of the project folder and enter the following command in your terminal: `npm install`

This will install the required dependencies for the project already included in the package.json file.

## LIRI Application Use Instructions :iphone: :

## MUSIC :notes:
### Search Music Groups 
###### powered by Bands in Town Artists Events API
Find out where & when your favorite artists are performing next with this command:
`node liri.js concert-this "artist/band name here`

![Alt Text](https://media.giphy.com/media/f9SiiMfOJTjI9kon52/giphy.gif)

### Search Songs 
###### powered by Spotify API
Discover information about songs and albums with the command:
* node liri.js spotify-this-song "song name here"

![Alt Text](https://media.giphy.com/media/1wpOLh8pwXk5oOtwjb/giphy.gif)

## MOVIES :movie_camera:
#### Search Titles and Reviews 
###### powered by OMdb API
Search movie titles with the command:
`node liri.js movie-this "movie title here"`

and get:
* Year Released
* IMdb rating
* Rotten Tomatoes Rating
* Plots, Actors, and More

![Alt Text](https://media.giphy.com/media/nmedq4NdAWqCjT4LGr/giphy.gif)

## DO WHAT IT SAYS MODE with RANDOM.TXT
Create a command in random.txt file like this:
`concert-this,tycho` or `movie-this,return of the jedi`

and run it with:
`node liri.js do-what-it-says`

![Alt Text](https://media.giphy.com/media/mMF9fkRjuP4hG9f6oL/giphy.gif)
# liri 
##### (Language Interpretation and Recognition Interface)


## MUSIC :notes:
### Search Music Groups 
###### powered by Bands in Town Artists Events API
Find out where & when your favorite artists are performing next with this command:
`node liri.js concert-this "artist/band name here`

`<iframe src="https://giphy.com/embed/f9SiiMfOJTjI9kon52" width="480" height="225" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/f9SiiMfOJTjI9kon52"></a></p>`

#### Search Songs 
###### powered by Spotify API
Discover information about songs and albums with the command:
* node liri.js spotify-this-song "song name here"


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

## DO WHAT IT SAYS MODE with RANDOM.TXT
Create a command in random.txt file like this:
`concert-this,tycho` or `movie-this,deep impact`

and run it with:
`node liri.js do-what-it-says`
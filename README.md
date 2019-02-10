# liri 
##### (Language Interpretation and Recognition Interface)

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
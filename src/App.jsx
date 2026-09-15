import { useState } from 'react'
import { Container, Typography, Button, Grid } from '@mui/material'
import PosterCard from "./PosterCard"
import RatingCard from "./RatingCard"
import GenreSelect from "./GenreSelect"


/* 
  create "Guess the User Rating for a Movie" game
  -give user choice for film decade, genre or both
  -round the rating to the nearest 0.5
  -give the user two tries
    -if too high or too low, tell user and give another try
    -if they get it on first or second try add to score and continue to next movie
  -increase streak score for each rating guessed correctly and reset streak if user does not score
  -populate data card with title and poster
*/
function App() {
  //set states -> movie, message, score, game over
  const [movie, setMovie] = useState(null)
  const [message, setMessage] = useState("")
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [gameOver, setGameOver] = useState(false);
  const [attempts, setAttempts] = useState(0)
  const [messageColor, setMessageColor] = useState("")
  /* 
    get a random movie only retrieve title, release date, genre ids, and movie poster 
    match genre ids to genre
  */
  const getMovie = async (genreToSearch) => {
    const randomPage = Math.floor(Math.random() * 25) + 1;
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=5ad7b3849d1bdada7730e4320420f82d&include_adult=false&region=US&sort_by=popularity.desc&language=en-US&with_original_language=en&page=${randomPage}&vote_count.gte=100&with_release_type=2|3&without_genres=10770&certification_country=US&certification.lte=R`;

    if (genreToSearch !== "All") {
      url += `&with_genres=${genreToSearch}`
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      const movies = data.results;

      const randomIndex = Math.floor(Math.random() * movies.length)
      const movie = movies[randomIndex];

      const movieData = {
        title: movie.title,
        poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://via.placeholder.com/500x750?text=No+Poster',
        year: movie.release_date
          ? movie.release_date.substring(0, 4)
          : "Unknown",
        genres: movie.genre_ids || [],
        rating: movie.vote_average
          ? Math.round(movie.vote_average * 2) / 2
          : 0
      };

      console.log(movieData); //remove this
      console.log(movies);

      setMovie(movieData);

    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const handleGenreSelection = (genre) => {
    setSelectedGenre(genre);
    getMovie(genre);
  }
  /*
    handle guess
    if guess too low or too high: try one more time
    if wrong second time, end game and reset
    if guess equals user rating first or second time
    add to score, get another movie
  */
  const handleGuess = (userGuess) => {
    if (userGuess === movie.rating) {
      setMessage('Correct!');
      setMessageColor('success');
      setScore((prevScore) => prevScore + 1);
      setAttempts(0);
      getMovie(selectedGenre);
      return;
    }

    if (attempts === 0) {
      if (userGuess > movie.rating) {
        setMessage('Too high! Try again.');
      } else {
        setMessage('Too low! Try again');
      }
      setMessageColor('error');
      setAttempts(attempts + 1);
    }

    else {
      if (userGuess > movie.rating || userGuess < movie.rating) {
        setMessage(`Sorry, The rating was ${movie.rating}.`);
        setMessageColor('error');
        //setScore(0);
        setGameOver(true);
      }
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setAttempts(0);
    setScore(0);
    setMessage("");
    setMovie(null);
    setSelectedGenre(null);
    setIsPlaying(false);
  };

  const playAgain = () => {
    setMovie(null)
    setGameOver(false);
    setAttempts(0);
    setScore(0);
    setMessage("");
    setMessageColor("");

    getMovie(selectedGenre);
  }

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
          flexDirection: 'column'
        }}
      >
        {!isPlaying && (
          <>
            <Typography variant="h3"
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 100,
                fontSize: 45
              }}>
              Guess the Movie Rating
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: '"Inter", sans-serif',
                marginBottom: 3.5
              }}
            >
              based on TMDB user ratings
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={() => setIsPlaying(true)}
            >Play</Button>
          </>
        )}

        {isPlaying && !selectedGenre && (
          <GenreSelect onSelect={handleGenreSelection} />
        )}


        {isPlaying && selectedGenre && movie && (
          <>
            <Typography
            variant="overline"
            sx={{
              marginBottom: 6.5,
              fontSize: 14,
              fontWeight: 300
            }}
            >
              score: {score}
            </Typography>
            <Grid container rowSpacing={0.5}
              sx={{ justifyContent: "center", alignItems: "center" }}>
                <Grid>
                  <PosterCard movie={movie} />
                </Grid>
                <Grid>
                  <RatingCard 
                    movie={movie} 
                    onSubmit={handleGuess} 
                    message={message}
                    messageColor={messageColor}
                    gameOver={gameOver}
                    onReset={resetGame}
                    onPlayAgain={playAgain}
                  />
                </Grid>
              </Grid>
            </>
        )}
      </Container>
    </>
  )
}

export default App

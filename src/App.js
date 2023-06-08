import MovieList from "./components/MovieList";
import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback( async function () {
    setIsLoading(true);
    setError(null)
  
  
    try {
      const response = await fetch("http://react-app-f7b3d-default-rtdb.firebaseio.com/movies.json");
      if (!response.ok) {
        throw new error("Something went wrong");
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.openingText,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
      setIsLoading(false);
    
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  },[] );

  useEffect(()=>{
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function addMovieHandler(movie){
    console.log(movie);
  }
  
  let content = <p>Found no movie</p>;

  if (movies.length > 0) {
    content = <MovieList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

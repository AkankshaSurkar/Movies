import React from "react";
import Movie from "./Movie";
import classes from "./MovieList.module.css";
const MovieList = (props) => {
  
  const { movies, onDeleteMovie } = props;

  return (
    <ul className={classes["movies-list"]}>
{movies.map((movie) => (
        <Movie 
        key={movie.id}
        id={movie.id}
        title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          onDelete={onDeleteMovie}

          />   
             ))}
    </ul>
  );
};
export default MovieList;

import React from "react";
import { useGlobalContext } from "./context";
import { NavLink } from "react-router-dom";
import "./App.css";

const Movies = () => {
  const { movie, isLoading } = useGlobalContext();

  if (isLoading) {
    return (
      <section>
        <div className="loading">Loading....</div>;
      </section>
    );
  }

  // Check if 'movie' exists and has length before mapping over it
  if (!movie || movie.length === 0) {
    return (
      <section className="movie-page">
        <div className="container">
          <h2>No movies found</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="movie-page">
      <div className="container grid grid-4-col">
        {movie.map((curMovie) => {
          const { imdbID, Title, Poster } = curMovie;
          const title = Title.substring(0, 15);
          //   console.log(curMovie);
          return (
            <NavLink to={`movie/${imdbID}`} key={imdbID}>
              <div className="card">
                <div className="card-info">
                  <h2>{title.length >= 15 ? `${title}....` : title}</h2>
                  <img src={Poster} alt={imdbID} />
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default Movies;

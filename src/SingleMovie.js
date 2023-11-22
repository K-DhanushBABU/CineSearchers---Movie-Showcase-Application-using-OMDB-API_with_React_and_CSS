import { NavLink, useParams } from "react-router-dom";
import { API_KEY } from "./context";
import React, { useEffect, useState } from "react";

const SingleMovie = () => {
  const { id } = useParams();
  console.log(id);

  const [isLoading, setisLoading] = useState(true);
  const [movie, setMovie] = useState(" ");

  const getMovies = async (url) => {
    setisLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      //   console.log(data);

      if (data.Response === "True") {
        setisLoading(false);
        setMovie(data);
      } else {
        console.log("Error: Invalid IMDb ID");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timerout = setTimeout(() => {
      getMovies(`${API_KEY}&i=${id}`);
    }, 1000);

    return () => clearTimeout(timerout);
  }, [id]);

  if (isLoading) {
    return (
      <div className="movie-section ">
        <div className="loading">Loading....</div>;
      </div>
    );
  }

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.Language}</p>
          <p className="card-text">{movie.Runtime}</p>
          <p className="card-text">{movie.imdbRating} / 10</p>
          <p className="card-text">{movie.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;

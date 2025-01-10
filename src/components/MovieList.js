import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');

  const fetchTrailer = async (movieId) => {
    const apiKey = 'e9398896e43eb1802e8c35d2e38e536c';
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const trailer = data.results.find((video) => video.type === 'Trailer');
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`); // autoplay enabled and muted by default
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  const handleMouseEnter = (movieId) => {
    setHoveredMovieId(movieId);
    fetchTrailer(movieId);
  };

  const handleMouseLeave = () => {
    setHoveredMovieId(null);
    setTrailerUrl('');
  };

  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onMouseEnter={() => handleMouseEnter(movie.id)}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={`/movie/${movie.id}`}>
              {hoveredMovieId === movie.id && trailerUrl ? (
                <iframe
                  width="200"
                  height="300"
                  src={trailerUrl}
                  title={movie.title}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/200x300'}
                  alt={movie.title}
                />
              )}
              <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
            </Link>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default MovieList;

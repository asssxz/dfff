import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css'; 

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); 

  useEffect(() => {
    const apiKey = 'e9398896e43eb1802e8c35d2e38e536c';
    
    // Fetch movie details
    const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
    fetch(movieUrl)
      .then((res) => res.json())
      .then((json) => setMovie(json));

    // Fetch cast details
    const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
    fetch(castUrl)
      .then((res) => res.json())
      .then((json) => setCast(json.cast));

    // Fetch related movies
    const relatedUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`;
    fetch(relatedUrl)
      .then((res) => res.json())
      .then((json) => setRelatedMovies(json.results));
  }, [id]);

  if (!movie) {
    return <div className="loading">Loading...</div>;
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

 
  const handleWatchClick = () => {
    const watchLink = `https://www.youtube.com/results?search_query=${movie.title}+trailer`;
    window.open(watchLink, '_blank');
  };


  const handleDownloadClick = () => {
 
    alert('Download functionality is not available. You can watch the movie on streaming platforms.');

  };

  return (
    <div className="movie-details">
      <div className="movie-header">

        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="poster-image"
          />
        </div>


        <div className="movie-info">
          <h2 className="movie-title">{movie.title}</h2>
          <div className="rating">
            <span>⭐ {movie.vote_average}</span>
          </div>
          <div className="release-date">
            <strong>Release Date:</strong> {movie.release_date}
          </div>

      
          <div className="movie-actions">
          <button className="watch-btn"   onClick={handleWatchClick} >
              <i className="fas fa-play"></i> Watch
            </button>
            <button className="download-btn" onClick={handleDownloadClick} >
              <i className="fas fa-download"></i> Download
            </button>
          </div>
        </div>
      </div>


      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => handleTabChange('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'cast' ? 'active' : ''}`}
          onClick={() => handleTabChange('cast')}
        >
          Cast
        </button>
        <button
          className={`tab-btn ${activeTab === 'related' ? 'active' : ''}`}
          onClick={() => handleTabChange('related')}
        >
          Related Movies
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview">
            <p>{movie.overview}</p>
          </div>
        )}

        {activeTab === 'cast' && (
          <div className="cast">
            <h3>Cast</h3>
            {cast.length > 0 ? (
              <ul>
                {cast.map((actor) => (
                  <li key={actor.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      alt={actor.name}
                      className="actor-image"
                    />
                    <span>{actor.name} as {actor.character}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Cast information is not available yet.</p>
            )}
          </div>
        )}

        {activeTab === 'related' && (
          <div className="related">
            <h3>Related Movies</h3>
            {relatedMovies.length > 0 ? (
              <ul>
                {relatedMovies.map((relatedMovie) => (
                  <li key={relatedMovie.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${relatedMovie.poster_path}`}
                      alt={relatedMovie.title}
                      className="related-movie-image"
                    />
                    <span>{relatedMovie.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No related movies found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;



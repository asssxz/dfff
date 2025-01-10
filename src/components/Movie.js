import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';

function Movie({ showSplash }) {
  const [movieList, setMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const getMovies = (query = '', genre = '') => {
    const apiKey = 'e9398896e43eb1802e8c35d2e38e536c';
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

    if (query) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
    }

    if (genre) {
      url += `&with_genres=${genre}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((json) => setMovieList(json.results))
      .catch((err) => console.error('Error fetching movies:', err));
  };

  useEffect(() => {
    if (!showSplash) {
      getMovies();
    }
  }, [showSplash]);

  const handleSearch = (query, genre) => {
    setSearchTerm(query);
    setCategory(genre);
    getMovies(query, genre);
  };

  return (
    <div>
      {showSplash ? (
        <div className="splash-overlay">
          <h1 className="splash-title">DataBaes</h1>
        </div>
      ) : (
        <>
          <SearchBar onSearch={handleSearch} />
          <MovieList movies={movieList} />
        </>
      )}
    </div>
  );
}

export default Movie;

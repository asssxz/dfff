import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movie from './components/Movie';
import MovieDetails from './components/MovieDetails';
import './App.css';
import { FaMoon, FaSun } from 'react-icons/fa';

function App() {
  const [movies, setMovies] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
  const [showSplash, setShowSplash] = useState(true); // Global splash state

  useEffect(() => {
    const splashTimeout = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(splashTimeout); // Cleanup timeout
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <Router>
      <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
        {/* Conditional Background */}
        {isDarkMode ? (
          <div className="video-background">
            <video
              className="background-video"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/videos/3190131-uhd_3840_2160_24fps.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="image-background">
            <img
              className="background-image"
              src="/images/pexels-tuurt-812263.jpg"
              alt="Background"
            />
          </div>
        )}

        <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
          </button>
        </div>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={<Movie showSplash={showSplash} />} // Pass splash state as prop
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function NavBarComponent() {
  const [query, setQuery] = useState ("");
  const [results, setResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const fetchResults = async (searchQuery) => {
    if (searchQuery.length === 0) {
      setResults([])
      return;
    }
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=es-MX&page=1`,
        {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTg3ZWEyZjdjNWU4MGIxMzhkMGE0ZjAwZWZkMmIxNCIsIm5iZiI6MTY5NTUxNjMzNC43ODgsInN1YiI6IjY1MGY4NmFlMjZkYWMxMDEwYzc1MjQxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aX7K-6rJ23r4WD77hsJFSvwJV5k4vUCxe13xZkpnl20'
            }
        }
      );
      const data = await response.json();
      if (data && data.results) {
        setResults(data.results.slice(0, 10));
      } else {
        setResults([]);
      }
    } catch (e) {
      console.error("Error al buscar películas:", e.message);
      setResults([]);
    }
    }


  const inputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    fetchResults(value)
    setShowDropdown(true)
  }

  const handleSelectMovie = (movieId) => {
    console.log(`Seleccionaste la película con ID: ${movieId}`);
  };

    return (
      <nav className="bg-[#121212] text-white w-full flex items-center h-12 md:h-14">
      <div className="w-full flex justify-center">
        <div className="max-w-[1280px] w-full flex items-center px-2 md:px-3 gap-1 md:gap-2">
          {/* Logo */}
          <div className="bg-[#f5c518] text-black font-bold px-2 md:px-3 py-1 rounded hover:opacity-90 text-sm md:text-base">
            IMDb
          </div>

          {/* Home Button - Hide text on mobile */}
          <button 
            className="flex items-center gap-1 hover:bg-[#252525] px-1 md:px-2 py-1 rounded text-sm"
            onClick={() => navigate(`/`)}
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="hidden md:inline">Inicio</span>
          </button>

          {/* Search Section */}
          <div className="relative flex items-center flex-1 h-7 md:h-8">
            {/* Select - Hide on mobile */}
            <select className="hidden md:block bg-[#252525] text-white px-2 py-1 text-sm rounded-l border-r border-gray-700 focus:outline-none h-full">
              <option>Todo</option>
              <option>Títulos</option>
            </select>
            
            {/* Search Input */}
            <input 
              type="search"
              placeholder="Buscar en IMDb"
              className="flex-1 px-2 md:px-3 py-1 bg-white text-black text-xs md:text-sm focus:outline-none h-full min-w-0"
              value={query}
              onChange={inputChange}
              onFocus={() => setShowDropdown(true)}
            />
            
            {/* Search Button */}
            <button className="bg-[#252525] px-2 md:px-3 h-full hover:bg-[#303030]">
              <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Dropdown Results */}
            {showDropdown && query && (
              <div 
                className="absolute top-full left-0 w-full bg-[#1f1f1f] mt-1 rounded shadow-lg z-50"
                onBlur={() => setShowDropdown(false)}
              >
                {results.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex p-2 hover:bg-[#252525] cursor-pointer border-b border-gray-700"
                    onClick={() => navigate(`/details/${movie.id}`)}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-8 h-12 md:w-12 md:h-16 rounded mr-2"
                    />
                    <div>
                      <h4 className="text-xs md:text-sm font-bold text-white">{movie.title}</h4>
                      <p className="text-xs text-gray-400 hidden md:block">"{movie.original_title || "N/A"}"</p>
                      <p className="text-xs text-gray-400">
                        {movie.release_date?.slice(0, 4) || "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Language Button */}
          <button className="hover:bg-[#252525] px-1 md:px-2 py-1 rounded text-xs md:text-sm">
            ES
          </button>
        </div>
      </div>
    </nav>
  );
  
};

export default NavBarComponent;
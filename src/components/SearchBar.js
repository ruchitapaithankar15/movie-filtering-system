// src/components/SearchBar.js
import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import MovieList from './MovieList';

const SearchBar = ({ searchTerm, onSearchChange }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('/movies.json')
            .then(response => response.json())
            .then(data => {
                setMovies(data);
            })
            .catch(error => console.error('Error fetching the movies:', error));
    }, []);

    // Filter movies based on the search term
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                className="search-bar"
                type="text"
                placeholder="Enter movie name"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchTerm && <MovieList movies={filteredMovies} />}
        </div>
    );
};

export default SearchBar;

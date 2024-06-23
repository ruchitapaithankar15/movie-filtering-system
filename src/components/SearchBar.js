// src/components/SearchBar.js
import React, { useEffect, useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch data from the JSON file
        fetch('/movies.json')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched movies:', data);
                setMovies(data);
            })
            .catch(error => console.error('Error fetching the movies:', error));
    }, []); // Empty dependency array to run only on mount

    useEffect(() => {
        if (searchTerm) {
            const filteredMovies = movies.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            console.log('Filtered movies:', filteredMovies);
        }
    }, [searchTerm, movies]);

    return (
        <input
            className="search-bar"
            type="text"
            placeholder="Enter movie name"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
        />
    );
};

export default SearchBar;

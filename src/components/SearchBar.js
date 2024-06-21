// src/components/SearchBar.js
import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange }) => {
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

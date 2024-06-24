// src/components/SearchPanel.js
import React from 'react';
import SearchBar from './SearchBar';
import Dropdown from './Dropdown';
import './SearchPanel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const SearchPanel = ({ searchTerm, onSearchChange, rating, onRatingChange, genre, onGenreChange }) => {
    return (
        <div className="search-panel">
            <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        </div>
    );
};

export default SearchPanel;

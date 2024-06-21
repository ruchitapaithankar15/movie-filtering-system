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
            <Dropdown 
                title="Rating" 
                options={[...Array(10).keys()].map(i => ({ value: i + 1, label: i + 1 }))}
                selectedOption={rating} 
                onOptionChange={onRatingChange} 
                icon={<FontAwesomeIcon icon={faCaretDown} />} 
                type="rating" 
                withCheckboxes={true} 
            />
            <Dropdown 
                title="Genre" 
                options={["Any genre", "Action", "Comedy", "Thriller", "Drama"].map(genre => ({ value: genre, label: genre }))}
                selectedOption={genre} 
                onOptionChange={onGenreChange} 
                icon={<FontAwesomeIcon icon={faCaretDown} />} 
                type="genre" 
                withCheckboxes={true} 
            />
        </div>
    );
};

export default SearchPanel;

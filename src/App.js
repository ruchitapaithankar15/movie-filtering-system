import React, { useState } from 'react';
import SearchPanel from './components/SearchPanel';
import './App.css';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [rating, setRating] = useState('Any rating');
    const [genre, setGenre] = useState('Any genre');

    return (
        <div className="app">
            <SearchPanel
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                rating={rating}
                onRatingChange={setRating}
                genre={genre}
                onGenreChange={setGenre}
            />
        </div>
    );
};

export default App;

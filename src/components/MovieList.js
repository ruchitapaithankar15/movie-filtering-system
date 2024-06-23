// src/components/MovieList.js
import React from 'react';
import './MovieList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const MovieList = ({ movies }) => {
    return (
        <ul className="movie-list">
            {movies.map((movie, index) => (
                <li key={index} className="movie-item">
                    <span className="movie-title">{movie.title}</span>
                    <span className="movie-rating">{renderStars(movie.rating)}</span>
                    <span className="movie-category">{movie.category}</span>
                </li>
            ))}
        </ul>
    );
};

// Function to render stars based on rating
const renderStars = (rating) => {
    const filledStars = Math.round(rating);
    const emptyStars = 10 - filledStars;

    return (
        <>
            {Array(filledStars).fill().map((_, i) => (
                <span key={`filled-${i}`} className="star filled">&#9733;</span>
            ))}
            {Array(emptyStars).fill().map((_, i) => (
                <span key={`empty-${i}`} className="star empty">&#9734;</span>
            ))}
        </>
    );
};

export default MovieList;

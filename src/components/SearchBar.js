import React, { useEffect, useState, useRef } from 'react';
import './SearchBar.css';
import MovieList from './MovieList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faStar } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ searchTerm, onSearchChange }) => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [isGenreOpen, setIsGenreOpen] = useState(false);
    const [isRatingOpen, setIsRatingOpen] = useState(false);

    const genreRef = useRef(null);
    const ratingRef = useRef(null);

    useEffect(() => {
        fetch('/movies.json')
            .then(response => response.json())
            .then(data => {
                setMovies(data);
                const uniqueGenres = [...new Set(data.map(movie => movie.category))];
                setGenres(uniqueGenres);
            })
            .catch(error => console.error('Error fetching the movies:', error));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (genreRef.current && !genreRef.current.contains(event.target)) {
                setIsGenreOpen(false);
            }
            if (ratingRef.current && !ratingRef.current.contains(event.target)) {
                setIsRatingOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleRating = (rating) => {
        if (rating === 'any') {
            setSelectedRatings([]);
        } else if (selectedRatings.includes(rating)) {
            setSelectedRatings(selectedRatings.filter(r => r !== rating));
        } else {
            setSelectedRatings([...selectedRatings, rating]);
        }
    };

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedGenre === '' || movie.category === selectedGenre) &&
        (selectedRatings.length === 0 || selectedRatings.includes(Math.round(movie.rating).toString()))
    );

    return (
        <div className="search-bar-container">
            <input
                className="search-bar"
                type="text"
                placeholder="Enter movie name"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <div className="dropdown rating-dropdown" ref={ratingRef}>
                <button className="dropbtn" onClick={() => setIsRatingOpen(!isRatingOpen)}>
                    <span>Rating </span>
                    <FontAwesomeIcon icon={isRatingOpen ? faCaretUp : faCaretDown} />
                </button>
                {isRatingOpen && (
                    <div className="dropdown-content fixed-length">
                        <div className="dropdown-item" onClick={() => toggleRating('any')}>
                            <input
                                type="checkbox"
                                checked={selectedRatings.length === 0}
                                onChange={() => toggleRating('any')}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <span className="item-label"> Any Rating </span>
                        </div>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rating => (
                            <div
                                key={rating}
                                className="dropdown-item"
                                onClick={() => toggleRating(rating.toString())}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedRatings.includes(rating.toString())}
                                    onChange={() => toggleRating(rating.toString())}
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <div className="stars">
                                    {Array.from({ length: 10 }, (_, i) => (
                                        <FontAwesomeIcon
                                            key={i}
                                            icon={faStar}
                                            className={i < rating ? 'filled' : ''}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="dropdown genre-dropdown" ref={genreRef}>
                <button className="dropbtn" onClick={() => setIsGenreOpen(!isGenreOpen)}>
                    <span>Genre </span>
                    <FontAwesomeIcon icon={isGenreOpen ? faCaretUp : faCaretDown} />
                </button>
                {isGenreOpen && (
                    <div className="dropdown-content">
                        <div className="dropdown-item" onClick={() => setSelectedGenre('')}>
                            <input
                                type="checkbox"
                                checked={selectedGenre === ''}
                                onChange={() => setSelectedGenre('')}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <span className="item-label"> Any Genres </span>
                        </div>
                        {genres.map(genre => (
                            <div
                                key={genre}
                                className="dropdown-item"
                                onClick={() => setSelectedGenre(genre)}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedGenre === genre}
                                    onChange={() => setSelectedGenre(genre)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <span className="item-label">{genre}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {searchTerm && <MovieList movies={filteredMovies} />}
        </div>
    );
};

export default SearchBar;

// src/components/Dropdown.js
import React, { useState } from 'react';
import './Dropdown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Dropdown = ({ title, options, selectedOption, onOptionChange, icon, withCheckboxes, maxStars = 10, type }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value) => {
        onOptionChange(value);
        setIsOpen(false);
    };

    return (
        <div className={`dropdown ${type}-dropdown`}>
            <button className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                {title} {icon}
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    {type === 'rating' && (
                        <div className="dropdown-item" onClick={() => handleSelect(null)}>
                            <input
                                type="checkbox"
                                checked={selectedOption === null}
                                onChange={() => handleSelect(null)}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <span className="checkbox-label">Any Rating</span>
                        </div>
                    )}
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleSelect(option.value)}
                        >
                            {withCheckboxes && (
                                <input
                                    type="checkbox"
                                    checked={type === 'rating' ? option.value <= selectedOption : option.value === selectedOption}
                                    onChange={() => handleSelect(option.value)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            )}
                            {type === 'rating' ? (
                                <div className="stars">
                                    {Array.from({ length: maxStars }, (_, i) => (
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            key={i}
                                            className={i < option.value ? 'shaded' : ''}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <span className="checkbox-label">{option.label}</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;

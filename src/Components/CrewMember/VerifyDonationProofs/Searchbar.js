import React from 'react';
import './Searchbar.css';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
      <div className="crew-search-bar-container">
          <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={onSearchChange}
          />
      </div>
  );
};

export default SearchBar;

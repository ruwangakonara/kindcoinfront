import React, { useState } from 'react';
import { Input } from 'semantic-ui-react';
import './CrewSearchBar.css';

const SearchBar = ({ placeholder = "Search...", onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <Input
        icon="search"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        action={{
          icon: 'search',
          onClick: handleSearch,
        }}
      />
    </div>
  );
};

export default SearchBar;

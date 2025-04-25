import React, { useState } from 'react';

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className='search-bar my-8 text-center px-2 xs:mb-10 md:mb-16' onSubmit={handleSearch}>
      <input
        type="text"
        name='search'
        className="search-box md:w-2/4 sm:p-4 xs:px-2"
        placeholder='Search News'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type='submit' className='btn'>Search</button>
    </form>
  );
}

export default Search;

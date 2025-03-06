import React from 'react';
import { SearchProps } from 'types/types';


const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <input
      name="Search"
      value={value}
      onChange={onChange}
      type="text"
      placeholder="Starship name"
    />
  );
};

export default Search;

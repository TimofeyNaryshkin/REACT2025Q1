import React from 'react';
import { SearchProps } from '../../types/types';
import useLastSearch from '../../hooks/useLastSearch';

const Search: React.FC<SearchProps> = () => {
  const [searchQuery, setSearchQuery] = useLastSearch();
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      name="Search"
      value={searchQuery}
      onChange={changeInput}
      type="text"
      placeholder="Starship name"
    />
  );
};

export default Search;

/* inputType="text"
        inputPlaceholder="Starship name"
        inputValue={searchQuery}
        onInputChange={(e) => changeInput(e)}
        onButtonClick={(e) => {
          e.preventDefault();
        }} */
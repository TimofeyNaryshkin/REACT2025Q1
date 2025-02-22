import Controls from '../components/Controls/Controls';
import ResultList from '../components/ResultList/ResultList';
import Pagination from '../components/UI/Pagination/Pagination';
import { ResultData } from '../types/types';
import React, { useState } from 'react';
import { useLastSearch } from '../hooks/useLastSearch';
import Flyout from '../components/UI/Flyout/Flyout';

const Ships: React.FC = () => {
  const [filteredResults, setFilteredResults] = useState<ResultData[]>([]);

  const [searchQuery, setSearchQuery] = useLastSearch();

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  /*  const filterResults = useCallback(() => {
    if (searchQuery) {
      const filtered = results.filter((result) =>
        result.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
      setFilteredResults(filtered);
      localStorage.setItem('lastSearch', searchQuery);
    } else {
      setFilteredResults(results);
    }
  }, [results]); */

  return (
    <div className="app">
      <Controls
        inputType="text"
        inputPlaceholder="Starship name"
        inputValue={searchQuery}
        onInputChange={(e) => changeInput(e)}
        onButtonClick={(e) => {
          e.preventDefault();
        }}
      ></Controls>
      <ResultList />
      <Pagination />
      <Flyout />
    </div>
  );
};

export default Ships;

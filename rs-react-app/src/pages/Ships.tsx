import ResultList from '../components/ResultList/ResultList';
import Pagination from '../components/UI/Pagination/Pagination';
import { ResultData } from '../types/types';
import React, { useState } from 'react';
import { useLastSearch } from '../hooks/useLastSearch';
import Flyout from '../components/UI/Flyout/Flyout';
import { useTheme } from '../hooks/useTheme';
import Header from '../components/Header/Header';

const Ships: React.FC = () => {
  const [filteredResults, setFilteredResults] = useState<ResultData[]>([]);



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
  const darkTheme = useTheme();

  return (
    <div className={`app ${darkTheme ? 'theme_dark' : ''}`.trim()}>
      <Header />
      <ResultList />
      <Pagination />
      <Flyout />
    </div>
  );
};

export default Ships;

import './App.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Controls from './components/Controls/Controls';
import ResultList from './components/ResultList/ResultList';
import Loader from './components/UI/Loader/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import { HeaderInterface, ResultData } from './types/types';
import { useFetch } from './hooks/useFetch';
import getStarships from './API/StarshipService';
import countPages from './utils/pages';
import Pagination from './components/UI/Pagination/Pagination';

const App: React.FC = () => {
  const [results, setResults] = useState<ResultData[]>([]);
  const [header, setHeader] = useState<HeaderInterface>({
    name: '',
    description: '',
    errorMessage: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<ResultData[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [fetchShips, isLoading, hasError] = useFetch(
    useCallback(
      async (page) => {
        const ships = await getStarships(page);
        setResults(ships.results);
        const totalItems = ships.count;
        setTotalPages(countPages(totalItems, limit));
      },
      []
    )
  );

  const pagesArr = useMemo(() => {
    const arr = [];
    for (let i = 0; i < totalPages; i++) {
      arr.push(i + 1);
    }
    return arr;
  }, [totalPages]);

  const changePage = (page: number) => {
    setPage(page);
    fetchShips(page);
  };

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filterResults = useCallback(() => {
    if (searchQuery) {
      const filtered = results.filter((result) =>
        result.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
      setFilteredResults(filtered);
      localStorage.setItem('lastSearch', searchQuery);
    } else {
      setFilteredResults(results);
    }
  }, [results]);

  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch') || '';
    setSearchQuery(lastSearch);
    fetchShips(page);
  }, [fetchShips]);

  useEffect(() => {
    filterResults();
  }, [filterResults]);

  useEffect(() => {
    if (filteredResults.length > 0) {
      setHeader({
        name: 'Starship name',
        description: 'Description',
        errorMessage: '',
      });
    } else {
      setHeader({
        name: '',
        description: '',
        errorMessage: 'No starships found',
      });
    }
  }, [filteredResults]);

  return (
    <ErrorBoundary>
      <div className="app">
        <Controls
          inputType="text"
          inputPlaceholder="Starship name"
          inputValue={searchQuery}
          onInputChange={(e) => changeInput(e)}
          onButtonClick={(e) => {
            e.preventDefault();
            fetchShips(page);
            filterResults();
          }}
        ></Controls>
        {hasError ? (
          <h1>Request error D: ${hasError}</h1>
        ) : isLoading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <ResultList header={header} results={filteredResults}></ResultList>
        )}
        <Pagination
          pagesArr={pagesArr}
          page={page}
          onButtonClick={(p) => changePage(p)}
        ></Pagination>
      </div>
    </ErrorBoundary>
  );
};

export default App;

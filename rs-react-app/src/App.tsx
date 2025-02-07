import './App.css';
import React, { useCallback, useEffect, useState } from 'react';
import Controls from './components/Controls/Controls';
import ResultList from './components/ResultList/ResultList';
import Loader from './components/UI/Loader/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import { HeaderInterface, ResultData } from './types/types';
import { useFetch } from './hooks/useFetch';
import getStarships from './API/StarshipService';

const App: React.FC = () => {
  const [results, setResults] = useState<ResultData[]>([]);
  const [header, setHeader] = useState<HeaderInterface>({
    name: '',
    description: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<ResultData[]>([]);

  const [fetchShips, isLoading, hasError] = useFetch(
    useCallback(async () => {
      const ships = await getStarships();
      setResults(ships);
    }, [])
  );

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
    if (filterResults.length > 0) {
      setHeader({ name: 'Starship name', description: 'Description' });
    }
  }, [results]);

  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch') || '';
    setSearchQuery(lastSearch);
    fetchShips();
  }, [fetchShips]);

  useEffect(() => {
    filterResults();
  }, [filterResults]);

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
            fetchShips();
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
      </div>
    </ErrorBoundary>
  );
};

export default App;

import { useLocation, useNavigate, useSearchParams } from 'react-router';
import getStarships from '../API/StarshipService';
import Controls from '../components/Controls/Controls';
import ResultList from '../components/ResultList/ResultList';
import Loader from '../components/UI/Loader/Loader';
import Pagination from '../components/UI/Pagination/Pagination';
import { useFetch } from '../hooks/useFetch';
import { HeaderInterface, ResultData } from '../types/types';
import countPages from '../utils/pages';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Details from './Details';

const Ships: React.FC = () => {
  const [results, setResults] = useState<ResultData[]>([]);
  const [header, setHeader] = useState<HeaderInterface>({
    name: '',
    description: '',
    errorMessage: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<ResultData[]>([]);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [fetchShips, isLoading, hasError] = useFetch(
    useCallback(async (page) => {
      const ships = await getStarships(page);
      setResults(ships.results);
      const totalItems = +ships.count;
      setTotalPages(countPages(totalItems, limit));
    }, [])
  );
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const urlPage = Number(searchParams.get('page')) || 1;
  const details = searchParams.get('details');

  const pagesArr = useMemo(() => {
    const arr = [];
    for (let i = 0; i < totalPages; i++) {
      arr.push(i + 1);
    }
    return arr;
  }, [totalPages]);

  const changePage = (p: number) => {
    setSearchParams({ page: p.toString() });
    fetchShips(p);
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
    if (!searchParams.has('page')) {
      navigate('/?page=1', { replace: true });
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch') || '';
    setSearchQuery(lastSearch);
    fetchShips(urlPage);
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

  const closeDetails = () => {
    const searchParams = new URLSearchParams(location.search).toString();
    const to = searchParams.slice(0, searchParams.indexOf('&'));
    return `?${to}`;
  };

  return (
    <div className="app">
      <Controls
        inputType="text"
        inputPlaceholder="Starship name"
        inputValue={searchQuery}
        onInputChange={(e) => changeInput(e)}
        onButtonClick={(e) => {
          e.preventDefault();
          fetchShips(urlPage);
          filterResults();
          navigate(closeDetails());
        }}
      ></Controls>
      {hasError ? (
        <h1>Request error D: ${hasError}</h1>
      ) : isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="result-container">
          <ResultList header={header} results={filteredResults}></ResultList>
          {details && <Details to={closeDetails()} />}
        </div>
      )}
      <Pagination
        pagesArr={pagesArr}
        page={urlPage}
        onButtonClick={(p) => changePage(p)}
      />
    </div>
  );
};

export default Ships;

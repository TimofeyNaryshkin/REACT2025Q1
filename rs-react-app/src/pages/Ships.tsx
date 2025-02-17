import Controls from '../components/Controls/Controls';
import ResultList from '../components/ResultList/ResultList';
import Pagination from '../components/UI/Pagination/Pagination';
import { ResultData } from '../types/types';
import React, { useState } from 'react';
import { useLastSearch } from '../hooks/useLastSearch';

const Ships: React.FC = () => {
  //const [results, setResults] = useState<ResultData[]>([]);

  const [filteredResults, setFilteredResults] = useState<ResultData[]>([]);

  /* const [fetchShips, isLoading, hasError] = useFetch(
    useCallback(async (page) => {
      const ships = await getStarships(page);
      setResults(ships.results);
      const totalItems = +ships.count;
      setTotalPages(countPages(totalItems, limit));
    }, [])
  ); */

  const [searchQuery, setSearchQuery] = useLastSearch();

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  /* const filterResults = useCallback(() => {
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

  

  /* useEffect(() => {
    filterResults();
  }, [filterResults]); */

  return (
    <div className="app">
      <Controls
        inputType="text"
        inputPlaceholder="Starship name"
        inputValue={searchQuery}
        onInputChange={(e) => changeInput(e)}
        onButtonClick={(e) => {
          e.preventDefault();
          /* fetchShips(urlPage); */
          //filterResults();
          //navigate(closeDetails());
        }}
      ></Controls>
      <ResultList></ResultList>
      <Pagination
      /* pagesArr={pagesArr}
        page={urlPage}
        onButtonClick={(p) => changePage(p)} */
      />
    </div>
  );
};

export default Ships;

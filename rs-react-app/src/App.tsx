import './App.css';
import React, { useState } from 'react';
import Controls from './components/Controls/Controls';
import axios from 'axios';
import ResultList from './components/ResultList/ResultList';
import Loader from './components/UI/Loader/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import { ResultData } from './types/types';

/* interface AppState {
  results: object[];
  header: HeaderInterface;
  searchQuery: string;
  isLoading: boolean;
  hasError: boolean;
}
 */
const App: React.FC = () => {
  const [results, setResults] = useState([]);
  const [header, setHeader] = useState({
    name: '',
    description: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const fetchItems = async () => {
    setIsLoading(true);
    const response = await axios.get('https://swapi.dev/api/starships/?page=1');

    if (
      response.status.toString().startsWith('4') ||
      response.status.toString().startsWith('5')
    ) {
      setHasError(true);
    }

    const filteredResponse = response.data.results.filter((obj: ResultData) =>
      obj.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    if (searchQuery === '') {
      setResults(response.data.results);
      setHeader({ name: 'Starship name', description: 'Description' });
    } else {
      if (filteredResponse.length > 0) {
        setResults(filteredResponse);
      } else {
        setResults([]);
        setHeader({ name: '', description: '' });
      }
      localStorage.setItem('lastSearch', searchQuery);
    }
    setIsLoading(false);
  };

  /*   componentDidMount(): void {
    if (localStorage.lastSearch) {
      this.setState({ searchQuery: localStorage.lastSearch });
    }
    this.fetchItems();
  } */

  return (
    <ErrorBoundary>
      <div className="app">
        <Controls
          inputType="text"
          inputPlaceholder="Starship name"
          inputValue={searchQuery}
          onInputChange={changeInput}
          onButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            fetchItems();
          }}
        ></Controls>
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '150px',
            }}
          >
            <Loader />
          </div>
        ) : hasError ? (
          <h1>Request error D:</h1>
        ) : results.length ? (
          <ResultList header={header} results={results}></ResultList>
        ) : (
          <div className="not-found-msg">No starships found</div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;

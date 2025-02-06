import './App.css';
import React, { Component } from 'react';
import Controls from './components/Controls/Controls';
import axios from 'axios';
import ResultList, {
  HeaderInterface,
} from './components/ResultList/ResultList';
import { ResultData } from './components/ResultItem/ResultItem';
import Loader from './components/UI/Loader/Loader';
import ErrorBoundary from './components/ErrorBoundary';

interface AppState {
  results: object[];
  header: HeaderInterface;
  searchQuery: string;
  isLoading: boolean;
  hasError: boolean;
}

class App extends Component<object, AppState> {
  state = {
    results: [],
    header: {
      name: '',
      description: '',
    },
    searchQuery: '',
    isLoading: false,
    hasError: false,
  };

  changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };

  fetchItems = async () => {
    this.setState({ isLoading: true, hasError: false });
    const response = await axios.get('https://swapi.dev/api/starships/?page=1');

    if (
      response.status.toString().startsWith('4') ||
      response.status.toString().startsWith('5')
    ) {
      this.setState({ hasError: true });
    }

    const filteredResponse = response.data.results.filter((obj: ResultData) =>
      obj.name
        .toLowerCase()
        .includes(this.state.searchQuery.trim().toLowerCase())
    );

    if (this.state.searchQuery === '') {
      this.setState({
        results: response.data.results,
        header: {
          name: 'Starship name',
          description: 'Description',
        },
      });
    } else {
      if (filteredResponse.length > 0) {
        this.setState({
          results: filteredResponse,
        });
      } else {
        this.setState({
          results: [],
          header: {
            name: '',
            description: '',
          },
        });
      }
      localStorage.setItem('lastSearch', this.state.searchQuery);
    }
    this.setState({ isLoading: false });
  };

  componentDidMount(): void {
    if (localStorage.lastSearch) {
      this.setState({ searchQuery: localStorage.lastSearch });
    }
    this.fetchItems();
  }

  render(): React.ReactNode {
    return (
      <ErrorBoundary>
        <div className="app">
          <Controls
            inputType="text"
            inputPlaceholder="Starship name"
            inputValue={this.state.searchQuery}
            onInputChange={this.changeInput}
            onButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              this.fetchItems();
            }}
          ></Controls>
          {this.state.isLoading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '150px',
              }}
            >
              <Loader />
            </div>
          ) : this.state.hasError ? (
            <h1>Request error D:</h1>
          ) : this.state.results.length ? (
            <ResultList
              header={this.state.header}
              results={this.state.results}
            ></ResultList>
          ) : (
            <div className="not-found-msg">No starships found</div>
          )}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;

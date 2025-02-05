import './App.css';
import React, { Component } from 'react';
import Controls from './components/Controls';
import axios from 'axios';
import ResultList, { HeaderInterface } from './components/ResultList';
import { ResultData } from './components/ResultItem';
import Loader from './components/UI/Loader/Loader';

interface AppState {
  results: [];
  header: HeaderInterface;
  searchQuery: string;
  isLoading: boolean;
  hasError: boolean;
}

class App extends Component<AppState> {
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
    console.log(response);
    if (
      response.status.toString().startsWith('4') ||
      response.status.toString().startsWith('5')
    ) {
      this.setState({ hasError: true });
    }
    const filteredResponse = response.data.results.filter(
      (obj: ResultData) => obj.name === this.state.searchQuery.trim()
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
      localStorage.setItem('lastSearch', this.state.searchQuery);
      if (filteredResponse.length > 0) {
        this.setState({
          results: filteredResponse,
        });
      } else {
        this.setState({
          results: [{ name: 'No starships found', url: Date.now() }],
          header: {
            name: '',
            description: '',
          },
        });
      }
    }
    this.setState({ isLoading: false });
  };

  componentDidMount(): void {
    this.fetchItems();
  }

  render(): React.ReactNode {
    return (
      <div>
        <Controls
          inputType="text"
          inputPlaceholder="Starship name"
          inputValue={this.state.searchQuery}
          onInputChange={this.changeInput}
          onButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            localStorage.setItem('last search', this.state.searchQuery);
            this.fetchItems();
          }}
        ></Controls>
        {this.state.isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <Loader />
          </div>
        ) : this.state.hasError ? (
          <h1>Request error D:</h1>
        ) : (
          <ResultList
            header={this.state.header}
            results={this.state.results}
          ></ResultList>
        )}
      </div>
    );
  }
}

export default App;

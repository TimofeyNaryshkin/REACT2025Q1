import './App.css';
import React, { Component } from 'react';
import Controls from './components/Controls';
import axios from 'axios';
import ResultList from './components/ResultList';
import { ResultData } from './components/ResultItem';

interface AppState {
  results: [];
  searchQuery: string;
}

class App extends Component<AppState> {
  state = {
    results: [],
    searchQuery: '',
  };

  changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };

  fetchItems = async () => {
    const response = await axios.get('https://swapi.dev/api/starships/?page=1');
    const filteredResponse = response.data.results.filter(
      (obj: ResultData) => obj.name === this.state.searchQuery
    );
    if (this.state.searchQuery === '') {
      this.setState({
        results: response.data.results,
      });
    } else {
      if (filteredResponse.length > 0) {
        this.setState({
          results: filteredResponse,
        });
      } else {
        this.setState({
          results: [{name: 'No starships found', url: '18'}]
        });
      }
    }
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
            localStorage.setItem('last search', this.state.searchQuery)
            this.fetchItems();
          }}
        ></Controls>
        <ResultList results={this.state.results}></ResultList>
      </div>
    );
  }
}

export default App;

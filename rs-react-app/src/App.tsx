import './App.css';
import React, { Component } from 'react';
import Controls from './components/Controls';
import Search from './components/UI/Search';
import Button from './components/UI/Button';
import axios from 'axios';
import ResultList from './components/ResultList';

class App extends Component {
  state = {
    results: []
  }
   fetchItems = async () => {
    const response = await axios.get('https://swapi.dev/api/starships/');
    console.log(response.data.results)
    this.setState({
      results: response.data.results
    })
  }
  render(): React.ReactNode {
    return (
      <div>
        <Search></Search>
        <Button onButtonClick={this.fetchItems}>Search</Button>
        <ResultList results={this.state.results}></ResultList>
      </div>
    );
  }
}

export default App;

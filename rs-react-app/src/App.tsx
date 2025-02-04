import './App.css';
import React, { Component } from 'react';
import Controls from './components/Controls';

class App extends Component {
  render(): React.ReactNode {
    return (
    <div>
      <Controls></Controls>
    </div>
    )
  }
}

export default App;

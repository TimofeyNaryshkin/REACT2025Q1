import React, { Component } from 'react';
import Search from './UI/Search';
import Button from './UI/Button';

interface ControlsProps {
  onSearchRequested: () => void;
}

export default class Controls extends Component<ControlsProps> {
  render(): React.ReactNode {
    return (
      <div>
        <Search></Search>
        <Button onButtonClick={this.props.onSearchRequested}>Search</Button>
      </div>
    );
  }
}

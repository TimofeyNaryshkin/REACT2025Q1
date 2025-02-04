import React, { Component } from 'react';
import Search from './UI/Search';
import Button from './UI/Button';

interface ControlsProps {
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  inputType: string;
  inputPlaceholder: string;
}

export default class Controls extends Component<ControlsProps> {
  render(): React.ReactNode {
    return (
      <form className="controls">
        <Search
          inputType={this.props.inputType}
          onInputChange={this.props.onInputChange}
          inputPlaceholder={this.props.inputPlaceholder}
          inputValue={this.props.inputValue}
        ></Search>
        <Button onButtonClick={this.props.onButtonClick}>Search</Button>
      </form>
    );
  }
}

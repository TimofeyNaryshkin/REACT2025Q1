import React, { Component } from 'react';
import Search from '../UI/Search';
import Button from '../UI/Button';
import classes from './Controls.module.css';

interface ControlsProps {
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  inputType: string;
  inputPlaceholder: string;
}

interface ControlsState {
  error: boolean;
}

export default class Controls extends Component<ControlsProps, ControlsState> {
  state = {
    error: false,
  };

  render(): React.ReactNode {
    if (this.state.error) {
      throw new Error('Error');
    }

    return (
      <form className={classes.controls}>
        <Search
          inputType={this.props.inputType}
          onInputChange={this.props.onInputChange}
          inputPlaceholder={this.props.inputPlaceholder}
          inputValue={this.props.inputValue}
        ></Search>
        <Button onButtonClick={this.props.onButtonClick}>Search</Button>
        <Button
          onButtonClick={(e) => {
            e.preventDefault();
            this.setState({ error: true });
          }}
        >
          Throw error
        </Button>
      </form>
    );
  }
}

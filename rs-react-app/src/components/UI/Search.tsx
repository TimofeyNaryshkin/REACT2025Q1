import React, { Component } from 'react';

interface SearchProps {
  inputType: string;
  inputPlaceholder: string;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default class Search extends Component<SearchProps> {
  render(): React.ReactNode {
    return (
      <input
        value={this.props.inputValue}
        onChange={this.props.onInputChange}
        type={this.props.inputType}
        placeholder={this.props.inputPlaceholder}
      />
    );
  }
}

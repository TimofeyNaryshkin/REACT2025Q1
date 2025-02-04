import React, { Component } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onButtonClick: () => void;
}

export default class Button extends Component<ButtonProps> {
  render(): React.ReactNode {
    return <button onClick={this.props.onButtonClick}>{this.props.children}</button>;
  }
}

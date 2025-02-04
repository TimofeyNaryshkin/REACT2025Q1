import React, { Component } from 'react'

interface ButtonProps {
  name: string
}

export default class Button extends Component<ButtonProps> {
  render(): React.ReactNode {
    return (
      <button>
        {this.props.name}
      </button>
    )
  }
}

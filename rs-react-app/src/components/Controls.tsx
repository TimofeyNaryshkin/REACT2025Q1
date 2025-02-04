import React, { Component } from 'react'
import Search from './UI/Search'
import Button from './UI/Button'
import axios from 'axios'

export default class Controls extends Component {
  
  render(): React.ReactNode {
    return (
      <div>
        <Search></Search>
        <Button onButtonClick={this.fetchItems}>Search</Button>
      </div>
    )
  }
}

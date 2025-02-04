import React, { Component } from 'react'
import Search from './UI/Search'
import Button from './UI/Button'

export default class Controls extends Component {
  render(): React.ReactNode {
    return (
      <div>
        <Search></Search>
        <Button name={'Search'}></Button>
      </div>
    )
  }
}

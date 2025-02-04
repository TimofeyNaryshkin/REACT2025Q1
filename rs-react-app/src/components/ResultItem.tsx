import React, { Component } from 'react'

interface ResultItemProps {
  resultData: ResultData
}

export interface ResultData {
  name: string
  model: string
  cost_in_credits: string
  crew: string
  length: string
  manufacturer: string
  starship_class: string
  url: string
}

export default class ResultItem extends Component<ResultItemProps> {
  render(): React.ReactNode {
    return (
      <div className='results__item'>
        <strong>{this.props.resultData.name}</strong>
        <div>{this.props.resultData.model}</div>
        <div>{this.props.resultData.cost_in_credits}</div>
        <div>{this.props.resultData.crew}</div>
        <div>{this.props.resultData.length}</div>
        <div>{this.props.resultData.manufacturer}</div>
        <div>{this.props.resultData.starship_class}</div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import ResultItem from './ResultItem'
import { ResultData } from './ResultItem';


interface ResultListProps {
  results: ResultData[];
  header: HeaderInterface
}

export interface HeaderInterface {
  name: string
  description: string
}

export default class ResultList extends Component<ResultListProps> {
  render(): React.ReactNode {
    return (
      <div className='result-list'>
        <div className='result-list__header'>
          <div>{this.props.header.name}</div>
          <div>{this.props.header.description}</div>
        </div>
        {this.props.results.map(result => 
          <ResultItem resultData={result} key={result.url}/>
        )}
      </div>
    )
  }
}

import React, { Component } from 'react'
import ResultItem from './ResultItem'
import { ResultData } from './ResultItem';


interface ResultListProps {
  results: ResultData[];
}

export default class ResultList extends Component<ResultListProps> {
  render(): React.ReactNode {
    return (
      <div className='result-list'>
        <div className='result-list__header'>
          <div>Starship name</div>
          <div>Ship description</div>
        </div>
        {this.props.results.map(result => 
          <ResultItem resultData={result} key={result.url}/>
        )}
      </div>
    )
  }
}

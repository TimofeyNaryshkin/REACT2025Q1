import React, { Component } from 'react';
import ResultItem from '../ResultItem/ResultItem';
import { ResultData } from '../ResultItem/ResultItem';
import classes from './ResultList.module.css';

interface ResultListProps {
  results: ResultData[];
  header: HeaderInterface;
}

export interface HeaderInterface {
  name: string;
  description: string;
}

export default class ResultList extends Component<ResultListProps> {
  render(): React.ReactNode {
    return (
      <div className={classes.list}>
        <div className={classes.header}>
          <div>{this.props.header.name}</div>
          <div>{this.props.header.description}</div>
        </div>
        <div className={classes.content}>
          {this.props.results.map((result) => (
            <ResultItem resultData={result} key={result.url} />
          ))}
        </div>
      </div>
    );
  }
}

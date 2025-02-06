import React, { Component } from 'react';
import classes from './ResultItem.module.css';

interface ResultItemProps {
  resultData: ResultData;
}

export interface ResultData {
  name: string;
  model: string;
  cost_in_credits: string;
  crew: string;
  length: string;
  manufacturer: string;
  starship_class: string;
  url: string;
}
export default class ResultItem extends Component<ResultItemProps> {
  render(): React.ReactNode {
    return (
      <div className={classes.item}>
        <strong>{this.props.resultData.name}</strong>
        <div>
          <div>model: {this.props.resultData.model}</div>
          <div>cost: {this.props.resultData.cost_in_credits}</div>
          <div>crew: {this.props.resultData.crew}</div>
          <div>length: {this.props.resultData.length}</div>
          <div>manufacturer: {this.props.resultData.manufacturer}</div>
          <div>class: {this.props.resultData.starship_class}</div>
        </div>
      </div>
    );
  }
}

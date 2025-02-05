import React, { Component } from 'react';
import classes from './Loader.module.css';

export default class Loader extends Component {
  render(): React.ReactNode {
    return <div className={classes.loader}></div>;
  }
}

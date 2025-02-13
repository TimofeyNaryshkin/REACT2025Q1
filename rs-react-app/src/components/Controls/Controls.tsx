import React, { useState } from 'react';
import Search from '../UI/Search';
import Button from '../UI/Button';
import classes from './Controls.module.css';
import { ControlsProps } from '../../types/types';

const Controls: React.FC<ControlsProps> = ({ onButtonClick, ...props }) => {
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('Error');
  }

  return (
    <form className={classes.controls}>
      <Search {...props}></Search>
      <Button onButtonClick={onButtonClick}>Search</Button>
      <Button
        onButtonClick={(e) => {
          e.preventDefault();
          setError(true);
        }}
      >
        Throw error
      </Button>
    </form>
  );
};

export default Controls;

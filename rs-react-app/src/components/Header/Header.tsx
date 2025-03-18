import React from 'react';
import Controls from '../Controls/Controls';
import Button from '../UI/Button';
import { useThemeUpdate } from '../../hooks/useTheme';
import classes from './Header.module.css';

const Header: React.FC = () => {
  const toggleTheme = useThemeUpdate();

  return (
    <header data-testid='header' className={classes.header}>
      <Button onButtonClick={toggleTheme}>Toggle theme</Button>
      <Controls />
    </header>
  );
};

export default Header;

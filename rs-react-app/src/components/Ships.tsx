import ResultList from '../components/ResultList/ResultList';
import Pagination from '../components/UI/Pagination/Pagination';
import React from 'react';
import Flyout from '../components/UI/Flyout/Flyout';
import { useTheme } from '../hooks/useTheme';
import Header from './Header/Header';

const Ships: React.FC = () => {
  const darkTheme = useTheme();

  return (
    <div className={`app ${darkTheme ? 'theme_dark' : ''}`.trim()}>
      <Header />
      <ResultList />
      <Pagination />
      <Flyout />
    </div>
  );
};

export default Ships;

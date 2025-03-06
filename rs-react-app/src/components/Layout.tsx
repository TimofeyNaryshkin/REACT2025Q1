'use client'

import { useTheme } from 'hooks/useTheme';
import Header from './Header/Header';
import Pagination from './UI/Pagination/Pagination';
import Flyout from './UI/Flyout/Flyout';

export default function Layout({ children }: { children: React.ReactNode }) {
  const darkTheme = useTheme();
  return (
    <div className={`app ${darkTheme ? 'theme_dark' : ''}`.trim()}>
      <Header />
      <main>{children}</main>
      <Pagination />
      <Flyout />
    </div>
  );
}

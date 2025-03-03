import Header from '@/components/Header/Header';
import ResultItem from '@/components/ResultItem/ResultItem';
import ResultList from '@/components/ResultList/ResultList';
import Flyout from '@/components/UI/Flyout/Flyout';
import Pagination from '@/components/UI/Pagination/Pagination';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { detailsSlice } from 'store/reducers/DetailsSlice';
import { IResponse, Result } from 'types/response';

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch('https://swapi.dev/api/starships/?page=1');
  const ships: IResponse = await res.json();
  // Pass data to the page via props
  return { props: { ships } };
}) satisfies GetServerSideProps<{
  ships: IResponse;
}>;

export default function Ships({
  ships,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div /* className={`app ${darkTheme ? 'theme_dark' : ''}`.trim()} */>
      <Header />
      <ResultList ships={ships} />
      <Pagination />
      <Flyout />
    </div>
  );
}
 
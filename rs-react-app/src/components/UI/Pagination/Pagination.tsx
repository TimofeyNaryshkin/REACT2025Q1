'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { starshipAPI } from '../../../services/starship';
import countPages from '../../../utils/pages';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { detailsSlice } from 'store/reducers/DetailsSlice';
import { usePathname } from 'next/navigation';

const Pagination: React.FC = () => {
  const pathname = usePathname();
  const page = '1';
  const dispatch = useDispatch();
  const { toggle } = detailsSlice.actions;

  const { data } = starshipAPI.useFetchShipsPageQuery(page);

  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  useEffect(() => {
    const totalItems = data ? +data.count : 0;
    setTotalPages(countPages(totalItems, limit));
  }, [data]);

  const pagesArr = useMemo(() => {
    const arr = [];
    for (let i = 0; i < totalPages; i++) {
      arr.push(i + 1);
    }
    return arr;
  }, [totalPages]);

  return (
    <div className="page-container">
      {pagesArr.map((number, i) => (
        <Link
          href={`/page/${number}`}
          key={i + 1}
          className={+pathname === number ? 'page page_current' : 'page'}
          onClick={() => {
            dispatch(toggle(false));
          }}
        >
          {number}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;

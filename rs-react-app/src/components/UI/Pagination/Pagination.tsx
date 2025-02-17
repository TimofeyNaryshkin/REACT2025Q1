import React, { useEffect, useMemo, useState } from 'react';
import Button from '../Button';
import { starshipAPI } from '../../../services/starship';
import countPages from '../../../utils/pages';
import { useNavigate, useSearchParams } from 'react-router';

const Pagination: React.FC /* <PaginationProps> */ = (
  {
    /* pagesArr,
  page,
  onButtonClick, */
  }
) => {
  const { data } = starshipAPI.useFetchAllShipsQuery();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [totalPages, setTotalPages] = useState(0);
  const totalItems = data ? +data.count : 0;
  const limit = 10;
  const urlPage = Number(searchParams.get('page')) || 1;
  setTotalPages(countPages(totalItems, limit));

  useEffect(() => {
    if (!searchParams.has('page')) {
      navigate('/?page=1', { replace: true });
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    setSearchParams({page: urlPage.toString()})
  }, [urlPage])

  const pagesArr = useMemo(() => {
    const arr = [];
    for (let i = 0; i < totalPages; i++) {
      arr.push(i + 1);
    }
    return arr;
  }, [totalPages]);

  /* useEffect(() => {
    fetchShips(urlPage);
  }, [urlPage, fetchShips]); */

  return (
    <div className="page-container">
      {pagesArr.map((p, i) => (
        <Button
          key={i + 1}
          className={urlPage === p ? 'page page_current' : 'page'}
          onButtonClick={() => setSearchParams({ page: p.toString() })}
        >
          {p}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;

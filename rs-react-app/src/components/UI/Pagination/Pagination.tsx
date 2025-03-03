import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '../Button';
import { starshipAPI } from '../../../services/starship';
import countPages from '../../../utils/pages';
import { useNavigate, useSearchParams } from 'react-router';
import { useAppDispatch } from '../../../hooks/redux';
import { detailsSlice } from '../../../store/reducers/DetailsSlice';

const Pagination: React.FC = () => {
  const { toggle } = detailsSlice.actions;
  const dispatch = useAppDispatch();
  //const [searchParams, setSearchParams] = useSearchParams();
  const page = '1';

  //const navigate = useNavigate();
  const { data } = starshipAPI.useFetchShipsPageQuery(page);

  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  useEffect(() => {
    const totalItems = data ? +data.count : 0;
    setTotalPages(countPages(totalItems, limit));
  }, [data]);

  /* useEffect(() => {
    if (!searchParams.has('page')) {
      navigate('/?page=1', { replace: true });
    }
  }, [navigate, searchParams]); */

  const pagesArr = useMemo(() => {
    const arr = [];
    for (let i = 0; i < totalPages; i++) {
      arr.push(i + 1);
    }
    return arr;
  }, [totalPages]);

  const changePage = useCallback(
    (p: number) => {
      //setSearchParams({ page: p.toString() });
      dispatch(toggle(false));
    },
    [dispatch, /* setSearchParams */, toggle]
  );

  return (
    <div className="page-container">
      {pagesArr.map((p, i) => (
        <Button
          key={i + 1}
          className={page && +page === p ? 'page page_current' : 'page'}
          onButtonClick={() => changePage(p)}
        >
          {p}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;

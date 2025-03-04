import React, { useEffect, useMemo, useState } from 'react';
import { starshipAPI } from '../../../services/starship';
import countPages from '../../../utils/pages';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Pagination: React.FC = () => {
  const { query } = useRouter();
  /*  const { toggle } = detailsSlice.actions;
  const dispatch = useAppDispatch(); */
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

  /* const changePage = useCallback(
    (p: number) => {
      setSearchParams({ page: p.toString() });
      dispatch(toggle(false));
    },
    [dispatch setSearchParams, , toggle]
  ); */

  return (
    <div className="page-container">
      {pagesArr.map((p, i) => (
        <Link
          href={`/page/${p}`}
          key={i + 1}
          className={query.number && +query.number === p ? 'page page_current' : 'page'}
        >
          {p}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;

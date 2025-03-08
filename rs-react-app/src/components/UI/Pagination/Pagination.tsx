import { useEffect, useMemo, useState } from 'react';
import countPages from '../../../utils/pages';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { detailsSlice } from 'store/reducers/DetailsSlice';

const Pagination = ({totalItems}: {totalItems: number}) => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { toggle } = detailsSlice.actions;

  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  useEffect(() => {
    setTotalPages(countPages(totalItems, limit));
  }, [totalItems]);

  const pagesArr = useMemo(() => {
    const arr = [];
    for (let i = 0; i < totalPages; i++) {
      arr.push(i + 1);
    }
    return arr;
  }, [totalPages]);

  return (
    <div className="page-container">
      {pagesArr.map((p, i) => (
        <Link
          href={{ pathname: '/page/[page]', query: { page: p } }}
          key={i + 1}
          className={
            query.number && +query.number === p ? 'page page_current' : 'page'
          }
          onClick={() => dispatch(toggle(false))}
        >
          {p}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;

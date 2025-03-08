import { useEffect, useMemo, useState } from 'react';
import countPages from '../../../utils/pages';
import { Link } from 'react-router';
import { useAppDispatch } from '../../../hooks/redux';
import { detailsSlice } from '../../../store/reducers/DetailsSlice';

const Pagination = ({totalItems, page}: {totalItems: number, page: string}) => {
  const { toggle } = detailsSlice.actions;
  const dispatch = useAppDispatch();

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
          to={`/page/${p}`}
          key={i + 1}
          className={page && +page === p ? 'page page_current' : 'page'}
          onClick={() => dispatch(toggle(false))}
        >
          {p}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;

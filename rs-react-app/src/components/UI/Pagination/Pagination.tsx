import React from 'react';
import Button from '../Button';
import { PaginationProps } from '../../../types/types';

const Pagination: React.FC<PaginationProps> = ({
  pagesArr,
  page,
  onButtonClick,
}) => {
  return (
    <div className="page-container">
      {pagesArr.map((p, i) => (
        <Button
          key={i + 1}
          className={page === p ? 'page page_current' : 'page'}
          onButtonClick={() => onButtonClick(p)}
        >
          {p}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;

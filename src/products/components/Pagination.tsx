import { FC } from 'react';
import { SecondaryButton } from '.';
// import { Product } from '../interfaces';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={i === currentPage ? 'active-page' : ''}>
          <SecondaryButton title={ `${i}` } action={ () => handlePageChange(i) } />
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <main className='pagination-container'>
      <ul className="pagination-ul">{renderPageNumbers()}</ul>
    </main>
  );
};
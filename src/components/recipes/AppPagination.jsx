import { Pagination } from 'react-bootstrap';
import { ELLIPSIS, getPageItems } from '@/utils/pagination.js';

/**
 * @param {{
 *   page: number,
 *   totalPages: number,
 *   onChange: (page: number) => void,
 *   disabled?: boolean,
 * }} props
 */
export default function AppPagination({ page, totalPages, onChange, disabled = false }) {
  if (totalPages <= 1) return null;

  const items = getPageItems(page, totalPages);

  return (
    <nav aria-label="Страницы списка рецептов" className="app-pagination">
      <Pagination className="justify-content-center flex-wrap mb-0">
        <Pagination.Prev
          disabled={disabled || page === 1}
          onClick={() => onChange(page - 1)}
          aria-label="Предыдущая страница"
        />
        {items.map((item, index) =>
          item === ELLIPSIS ? (
            <Pagination.Ellipsis key={`ellipsis-${index}`} disabled />
          ) : (
            <Pagination.Item
              key={item}
              active={item === page}
              disabled={disabled && item !== page}
              onClick={() => item !== page && onChange(item)}
              aria-label={`Страница ${item}`}
            >
              {item}
            </Pagination.Item>
          ),
        )}
        <Pagination.Next
          disabled={disabled || page === totalPages}
          onClick={() => onChange(page + 1)}
          aria-label="Следующая страница"
        />
      </Pagination>
    </nav>
  );
}

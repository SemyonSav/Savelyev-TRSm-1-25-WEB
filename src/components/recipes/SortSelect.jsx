import { Form, InputGroup } from 'react-bootstrap';
import { SORT_FIELDS, SORT_ORDERS } from '@/config/constants.js';

/**
 * @param {{
 *   sort: string,
 *   order: 'asc' | 'desc',
 *   onChange: (value: { sort?: string, order?: 'asc' | 'desc' }) => void,
 * }} props
 */
export default function SortSelect({ sort, order, onChange }) {
  return (
    <InputGroup size="sm">
      <InputGroup.Text as="label" htmlFor="sort-field" className="d-none d-sm-flex">
        Сортировка
      </InputGroup.Text>
      <Form.Select
        id="sort-field"
        aria-label="Поле сортировки"
        value={sort}
        onChange={(event) => onChange({ sort: event.target.value })}
      >
        {SORT_FIELDS.map((field) => (
          <option key={field.value} value={field.value}>
            {field.label}
          </option>
        ))}
      </Form.Select>
      <Form.Select
        aria-label="Направление сортировки"
        value={order}
        onChange={(event) => onChange({ order: event.target.value })}
      >
        {SORT_ORDERS.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Form.Select>
    </InputGroup>
  );
}

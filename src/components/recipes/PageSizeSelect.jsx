import { Form, InputGroup } from 'react-bootstrap';
import { PAGE_SIZES } from '@/config/constants.js';

/**
 * @param {{ value: number, onChange: (limit: number) => void }} props
 */
export default function PageSizeSelect({ value, onChange }) {
  return (
    <InputGroup size="sm">
      <InputGroup.Text as="label" htmlFor="page-size">
        На странице
      </InputGroup.Text>
      <Form.Select
        id="page-size"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      >
        {PAGE_SIZES.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </Form.Select>
    </InputGroup>
  );
}

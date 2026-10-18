import { Button, Form } from 'react-bootstrap';

/**
 * Динамический список строк: добавление и удаление элементов.
 * @param {{
 *   id: string,
 *   label: string,
 *   items: string[],
 *   onChange: (items: string[]) => void,
 *   placeholder?: string,
 *   addLabel?: string,
 *   multiline?: boolean,
 *   error?: string,
 * }} props
 */
export default function ListField({
  id,
  label,
  items,
  onChange,
  placeholder,
  addLabel = 'Добавить',
  multiline = false,
  error,
}) {
  const update = (index, value) => onChange(items.map((item, i) => (i === index ? value : item)));
  const remove = (index) => onChange(items.filter((_, i) => i !== index));
  const add = () => onChange([...items, '']);

  return (
    <fieldset className="list-field" aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="form-label fs-6 mb-2">{label}</legend>
      <ol className="list-field__items">
        {items.map((item, index) => (
          <li key={index} className="list-field__item">
            <Form.Control
              as={multiline ? 'textarea' : 'input'}
              rows={multiline ? 2 : undefined}
              value={item}
              onChange={(event) => update(index, event.target.value)}
              placeholder={placeholder}
              aria-label={`${label}: пункт ${index + 1}`}
              isInvalid={Boolean(error) && !item.trim()}
            />
            <Button
              variant="outline-secondary"
              onClick={() => remove(index)}
              disabled={items.length === 1}
              aria-label={`Удалить пункт ${index + 1}`}
            >
              ×
            </Button>
          </li>
        ))}
      </ol>
      {error && (
        <div id={`${id}-error`} className="invalid-feedback d-block mb-2">
          {error}
        </div>
      )}
      <Button variant="outline-primary" size="sm" onClick={add}>
        + {addLabel}
      </Button>
    </fieldset>
  );
}

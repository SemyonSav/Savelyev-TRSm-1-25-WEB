import { Form } from 'react-bootstrap';

/**
 * Поле формы с подписью, подсказкой и текстом ошибки.
 * @param {{
 *   name: string,
 *   label: string,
 *   value: string,
 *   onChange: (name: string, value: string) => void,
 *   error?: string,
 *   hint?: string,
 *   required?: boolean,
 * } & Record<string, unknown>} props остальные свойства передаются в Form.Control
 */
export default function FormField({
  name,
  label,
  value,
  onChange,
  error,
  hint,
  required = false,
  ...controlProps
}) {
  const id = `field-${name}`;

  return (
    <Form.Group controlId={id}>
      <Form.Label>
        {label}
        {required && (
          <span className="text-danger ms-1" aria-hidden="true">
            *
          </span>
        )}
      </Form.Label>
      <Form.Control
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        isInvalid={Boolean(error)}
        required={required}
        aria-describedby={hint ? `${id}-hint` : undefined}
        {...controlProps}
      />
      {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
      {hint && !error && (
        <Form.Text id={`${id}-hint`} muted>
          {hint}
        </Form.Text>
      )}
    </Form.Group>
  );
}

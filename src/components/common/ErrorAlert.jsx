import { Alert, Button } from 'react-bootstrap';

/**
 * Сообщение об ошибке запроса с возможностью повторить его.
 * @param {{ error: Error, title?: string, onRetry?: () => void }} props
 */
export default function ErrorAlert({ error, title = 'Не удалось загрузить данные', onRetry }) {
  return (
    <Alert
      variant="danger"
      role="alert"
      className="d-flex flex-column flex-sm-row gap-3 align-items-sm-center"
    >
      <div className="flex-grow-1">
        <p className="fw-semibold mb-1">{title}</p>
        <p className="mb-0 small">{error.message}</p>
      </div>
      {onRetry && (
        <Button variant="outline-danger" size="sm" onClick={onRetry} className="flex-shrink-0">
          Повторить
        </Button>
      )}
    </Alert>
  );
}

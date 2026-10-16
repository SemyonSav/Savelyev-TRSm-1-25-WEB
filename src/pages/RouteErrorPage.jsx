import { Alert, Container } from 'react-bootstrap';
import { isRouteErrorResponse, useRouteError } from 'react-router';

/** Последний рубеж обработки ошибок: подключается как errorElement корневого маршрута. */
export default function RouteErrorPage() {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Приложение столкнулось с непредвиденной ошибкой.';

  return (
    <Container as="main" className="py-5">
      <Alert variant="danger">
        <Alert.Heading as="h1" className="h5">
          Ошибка
        </Alert.Heading>
        <p>{message}</p>
        <a href="/" className="alert-link">
          Вернуться на главную
        </a>
      </Alert>
    </Container>
  );
}

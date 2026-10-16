import { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';

/**
 * Перехватывает ошибки рендера и синхронного кода в дочерних компонентах,
 * чтобы падение одной страницы не ломало всё приложение.
 *
 * @extends {Component<{ children: import('react').ReactNode }, { error: Error | null }>}
 */
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Ошибка в интерфейсе:', error, info.componentStack);
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;

    if (!error) {
      return this.props.children;
    }

    return (
      <Alert variant="danger" role="alert">
        <Alert.Heading as="h2" className="h5">
          Что-то пошло не так
        </Alert.Heading>
        <p className="mb-3">
          При отображении страницы произошла ошибка. Попробуйте повторить действие.
        </p>
        {import.meta.env.DEV && <pre className="small mb-3 text-wrap">{error.message}</pre>}
        <div className="d-flex gap-2">
          <Button variant="outline-danger" size="sm" onClick={this.reset}>
            Попробовать снова
          </Button>
          <Button variant="link" size="sm" href="/">
            На главную
          </Button>
        </div>
      </Alert>
    );
  }
}

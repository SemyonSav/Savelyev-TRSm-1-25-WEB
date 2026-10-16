import { Link } from 'react-router';

/**
 * @param {{ title?: string, text?: string }} props
 */
export default function NotFound({
  title = 'Страница не найдена',
  text = 'Возможно, она была удалена или вы перешли по неверной ссылке.',
}) {
  return (
    <div className="text-center py-5">
      <p className="display-4 fw-semibold text-body-tertiary mb-2">404</p>
      <h1 className="h4">{title}</h1>
      <p className="text-body-secondary">{text}</p>
      <Link to="/" className="btn btn-primary">
        К списку рецептов
      </Link>
    </div>
  );
}

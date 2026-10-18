import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { formatDifficulty, formatMinutes } from '@/utils/format.js';

/**
 * Результат успешного POST-запроса: данные, которые вернул сервер.
 * @param {{
 *   recipe: import('@/api/RecipeService.js').Recipe | null,
 *   onHide: () => void,
 * }} props
 */
export default function CreatedRecipeModal({ recipe, onHide }) {
  const navigate = useNavigate();

  const rows = recipe
    ? [
        ['ID', recipe.id],
        ['Название', recipe.name],
        ['Кухня', recipe.cuisine],
        ['Сложность', formatDifficulty(recipe.difficulty)],
        ['Время', formatMinutes(recipe.prepTimeMinutes + recipe.cookTimeMinutes)],
        ['Ингредиентов', recipe.ingredients?.length],
        ['Шагов', recipe.instructions?.length],
      ]
    : [];

  return (
    <Modal show={Boolean(recipe)} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title as="h2" className="h5">
          Рецепт создан
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Сервер принял рецепт и вернул его с новым идентификатором.</p>
        <dl className="created-recipe mb-3">
          {rows.map(([label, value]) => (
            <div key={label} className="created-recipe__row">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="small text-body-secondary mb-0">
          DummyJSON только имитирует сохранение, поэтому рецепт не появится в общем списке.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Добавить ещё
        </Button>
        <Button variant="primary" onClick={() => navigate('/')}>
          К списку рецептов
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

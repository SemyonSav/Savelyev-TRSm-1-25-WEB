import { Badge, Col, ListGroup, Row } from 'react-bootstrap';
import { formatDifficulty, formatMinutes, getDifficultyVariant } from '@/utils/format.js';

/**
 * Полная информация о рецепте.
 * @param {{ recipe: import('@/api/RecipeService.js').Recipe }} props
 */
export default function RecipeDetails({ recipe }) {
  const facts = [
    { label: 'Подготовка', value: formatMinutes(recipe.prepTimeMinutes) },
    { label: 'Приготовление', value: formatMinutes(recipe.cookTimeMinutes) },
    { label: 'Общее время', value: formatMinutes(recipe.prepTimeMinutes + recipe.cookTimeMinutes) },
    { label: 'Порций', value: recipe.servings },
    { label: 'Калорийность', value: `${recipe.caloriesPerServing} ккал / порция` },
    { label: 'Автор', value: `Пользователь #${recipe.userId}` },
  ];

  return (
    <article className="recipe-details">
      <Row className="g-4 mb-4">
        <Col lg={5}>
          <img src={recipe.image} alt={recipe.name} className="recipe-details__image" />
        </Col>
        <Col lg={7}>
          <div className="d-flex flex-wrap gap-2 align-items-center mb-2 small text-body-secondary">
            <span>{recipe.cuisine}</span>
            {recipe.mealType?.length > 0 && <span aria-hidden="true">·</span>}
            <span>{recipe.mealType?.join(', ')}</span>
          </div>

          <h1 className="h2 mb-2">{recipe.name}</h1>

          <div className="d-flex flex-wrap gap-3 align-items-center mb-4">
            <span>
              ★ <strong>{recipe.rating.toFixed(1)}</strong>{' '}
              <span className="text-body-secondary">({recipe.reviewCount} отзывов)</span>
            </span>
            <Badge bg={getDifficultyVariant(recipe.difficulty)} className="fw-normal">
              {formatDifficulty(recipe.difficulty)}
            </Badge>
          </div>

          <dl className="recipe-details__facts">
            {facts.map((fact) => (
              <div key={fact.label} className="recipe-details__fact">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          {recipe.tags?.length > 0 && (
            <ul className="list-inline mb-0" aria-label="Теги">
              {recipe.tags.map((tag) => (
                <li key={tag} className="list-inline-item mb-2">
                  <Badge bg="light" text="dark" className="border fw-normal">
                    #{tag}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={5}>
          <section aria-labelledby="ingredients-title">
            <h2 id="ingredients-title" className="h5 mb-3">
              Ингредиенты <span className="text-body-secondary">({recipe.ingredients.length})</span>
            </h2>
            <ListGroup variant="flush" className="border rounded">
              {recipe.ingredients.map((ingredient, index) => (
                <ListGroup.Item key={`${index}-${ingredient}`}>{ingredient}</ListGroup.Item>
              ))}
            </ListGroup>
          </section>
        </Col>
        <Col md={7}>
          <section aria-labelledby="instructions-title">
            <h2 id="instructions-title" className="h5 mb-3">
              Приготовление
            </h2>
            <ol className="recipe-details__steps">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </section>
        </Col>
      </Row>
    </article>
  );
}

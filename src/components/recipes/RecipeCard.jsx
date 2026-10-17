import { memo } from 'react';
import { Badge, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router';
import { formatDifficulty, formatMinutes, getDifficultyVariant } from '@/utils/format.js';

/**
 * Краткая карточка рецепта. Полная информация — на странице рецепта.
 * @param {{ recipe: import('@/api/RecipeService.js').Recipe }} props
 */
function RecipeCard({ recipe }) {
  const { search } = useLocation();
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <Card as="article" className="recipe-card h-100">
      <div className="recipe-card__image">
        <Card.Img
          variant="top"
          src={recipe.image}
          alt={recipe.name}
          loading="lazy"
          width="400"
          height="300"
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center gap-2 mb-2 small">
          <span className="text-body-secondary text-truncate">{recipe.cuisine}</span>
          <Badge bg={getDifficultyVariant(recipe.difficulty)} className="fw-normal">
            {formatDifficulty(recipe.difficulty)}
          </Badge>
        </div>
        <Card.Title as="h2" className="recipe-card__title h6">
          {/* state сохраняет параметры списка, чтобы вернуться на ту же страницу */}
          <Link to={`/recipes/${recipe.id}`} state={{ from: search }} className="stretched-link">
            {recipe.name}
          </Link>
        </Card.Title>
        <ul className="recipe-card__meta list-unstyled small text-body-secondary mt-auto mb-0">
          <li>
            ★ {recipe.rating.toFixed(1)} <span className="opacity-75">({recipe.reviewCount})</span>
          </li>
          <li>{formatMinutes(totalTime)}</li>
          <li>{recipe.caloriesPerServing} ккал</li>
        </ul>
      </Card.Body>
    </Card>
  );
}

export default memo(RecipeCard);

import { Col, Row } from 'react-bootstrap';
import RecipeCard from './RecipeCard.jsx';

/**
 * @param {{ recipes: import('@/api/RecipeService.js').Recipe[] }} props
 */
export default function RecipeGrid({ recipes }) {
  return (
    <Row xs={1} sm={2} lg={3} xl={4} className="g-3 g-md-4">
      {recipes.map((recipe) => (
        <Col key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </Col>
      ))}
    </Row>
  );
}

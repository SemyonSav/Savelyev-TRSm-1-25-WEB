import { useParams } from 'react-router';

export default function RecipeDetailsPage() {
  const { id } = useParams();

  return <h1 className="h3">Рецепт #{id}</h1>;
}

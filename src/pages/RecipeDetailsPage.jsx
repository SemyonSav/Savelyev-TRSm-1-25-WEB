import { Link, useParams } from 'react-router';
import ErrorAlert from '@/components/common/ErrorAlert.jsx';
import Loader from '@/components/common/Loader.jsx';
import RecipeDetails from '@/components/recipes/RecipeDetails.jsx';
import { APP_NAME } from '@/config/constants.js';
import { useRecipe } from '@/hooks/useRecipes.js';

export default function RecipeDetailsPage() {
  const { id } = useParams();
  const { data: recipe, error, isLoading, reload } = useRecipe(id);

  const renderContent = () => {
    if (error) {
      return <ErrorAlert error={error} title="Не удалось загрузить рецепт" onRetry={reload} />;
    }

    if (isLoading || !recipe) {
      return <Loader label="Загружаем рецепт…" />;
    }

    return <RecipeDetails recipe={recipe} />;
  };

  return (
    <>
      <title>{recipe && !isLoading ? `${recipe.name} — ${APP_NAME}` : APP_NAME}</title>
      <Link to="/" className="d-inline-block mb-3 small">
        ← Назад к списку
      </Link>
      {renderContent()}
    </>
  );
}

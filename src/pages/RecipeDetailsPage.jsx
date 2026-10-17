import { Link, useLocation, useParams } from 'react-router';
import ErrorAlert from '@/components/common/ErrorAlert.jsx';
import Loader from '@/components/common/Loader.jsx';
import NotFound from '@/components/common/NotFound.jsx';
import RecipeDetails from '@/components/recipes/RecipeDetails.jsx';
import { APP_NAME } from '@/config/constants.js';
import { useRecipe } from '@/hooks/useRecipes.js';

export default function RecipeDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const { data: recipe, error, isLoading, reload } = useRecipe(id);

  // Возврат к списку с теми же сортировкой, поиском и страницей
  const backTo = `/${location.state?.from ?? ''}`;

  if (error?.isNotFound) {
    return (
      <>
        <title>{`Рецепт не найден — ${APP_NAME}`}</title>
        <NotFound title="Рецепт не найден" text={`Рецепта с id «${id}» не существует.`} />
      </>
    );
  }

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
      <Link to={backTo} className="d-inline-block mb-3 small">
        ← Назад к списку
      </Link>
      {renderContent()}
    </>
  );
}

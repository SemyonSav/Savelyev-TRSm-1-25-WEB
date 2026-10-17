import EmptyState from '@/components/common/EmptyState.jsx';
import ErrorAlert from '@/components/common/ErrorAlert.jsx';
import Loader from '@/components/common/Loader.jsx';
import RecipeGrid from '@/components/recipes/RecipeGrid.jsx';
import { APP_NAME } from '@/config/constants.js';
import { useListParams } from '@/hooks/useListParams.js';
import { useRecipes } from '@/hooks/useRecipes.js';

export default function RecipesPage() {
  const [params] = useListParams();
  const { data, error, isLoading, reload } = useRecipes(params);

  const renderResults = () => {
    if (error) {
      return <ErrorAlert error={error} onRetry={reload} />;
    }

    if (!data) {
      return <Loader label="Загружаем рецепты…" />;
    }

    if (data.items.length === 0) {
      return <EmptyState title="Рецепты не найдены" />;
    }

    return (
      <div className={`recipes-results ${isLoading ? 'is-loading' : ''}`} aria-busy={isLoading}>
        {isLoading && <Loader className="recipes-results__loader" label="Обновляем…" />}
        <RecipeGrid recipes={data.items} />
      </div>
    );
  };

  return (
    <>
      <title>{APP_NAME}</title>
      <h1 className="h3 mb-4">Все рецепты</h1>
      {renderResults()}
    </>
  );
}

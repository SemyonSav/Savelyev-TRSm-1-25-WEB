import { Button } from 'react-bootstrap';
import EmptyState from '@/components/common/EmptyState.jsx';
import ErrorAlert from '@/components/common/ErrorAlert.jsx';
import Loader from '@/components/common/Loader.jsx';
import AppPagination from '@/components/recipes/AppPagination.jsx';
import RecipeGrid from '@/components/recipes/RecipeGrid.jsx';
import RecipesToolbar from '@/components/recipes/RecipesToolbar.jsx';
import { APP_NAME } from '@/config/constants.js';
import { useListParams } from '@/hooks/useListParams.js';
import { useRecipes } from '@/hooks/useRecipes.js';

export default function RecipesPage() {
  const [params, updateParams] = useListParams();
  const { data, error, isLoading, reload } = useRecipes(params);

  const renderResults = () => {
    if (error) {
      return <ErrorAlert error={error} onRetry={reload} />;
    }

    if (!data) {
      return <Loader label="Загружаем рецепты…" />;
    }

    if (data.items.length === 0) {
      return (
        <EmptyState
          title="Ничего не найдено"
          text={params.q ? `По запросу «${params.q}» рецептов нет` : undefined}
        >
          {params.q && (
            <Button variant="outline-primary" size="sm" onClick={() => updateParams({ q: '' })}>
              Сбросить поиск
            </Button>
          )}
        </EmptyState>
      );
    }

    return (
      <div className={`recipes-results ${isLoading ? 'is-loading' : ''}`} aria-busy={isLoading}>
        {isLoading && <Loader className="recipes-results__loader" label="Обновляем…" />}
        <RecipeGrid recipes={data.items} />
        <div className="mt-4">
          <AppPagination
            page={params.page}
            totalPages={data.totalPages}
            onChange={(page) => updateParams({ page })}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <title>{APP_NAME}</title>
      <h1 className="h3 mb-4">Все рецепты</h1>
      <RecipesToolbar params={params} onChange={updateParams} />
      {renderResults()}
    </>
  );
}

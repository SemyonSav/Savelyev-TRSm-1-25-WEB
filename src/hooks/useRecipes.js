import { recipeService } from '@/api/RecipeService.js';
import { useAsync } from './useAsync.js';

/**
 * Список рецептов для переданных параметров.
 * @param {import('@/api/queryBuilder.js').ListParams} params
 */
export function useRecipes(params) {
  return useAsync((signal) => recipeService.getList(params, { signal }), JSON.stringify(params));
}

/**
 * Один рецепт по id.
 * @param {string | number} id
 */
export function useRecipe(id) {
  return useAsync((signal) => recipeService.getById(id, { signal }), `recipe:${id}`);
}

import { ApiError, ApiErrorType } from './ApiError.js';
import { httpClient } from './HttpClient.js';
import { getTotalPages, toApiListParams } from './queryBuilder.js';

/**
 * @typedef {'Easy' | 'Medium' | 'Hard'} Difficulty
 *
 * @typedef {Object} Recipe
 * @property {number} id
 * @property {string} name
 * @property {string[]} ingredients
 * @property {string[]} instructions
 * @property {number} prepTimeMinutes
 * @property {number} cookTimeMinutes
 * @property {number} servings
 * @property {Difficulty} difficulty
 * @property {string} cuisine
 * @property {number} caloriesPerServing
 * @property {string[]} tags
 * @property {number} userId
 * @property {string} image
 * @property {number} rating
 * @property {number} reviewCount
 * @property {string[]} mealType
 *
 * @typedef {Object} RecipeList
 * @property {Recipe[]} items
 * @property {number} total
 * @property {number} page
 * @property {number} limit
 * @property {number} totalPages
 *
 * @typedef {import('./queryBuilder.js').ListParams} ListParams
 */

/** Поля, необходимые для карточки рецепта в списке. */
const CARD_FIELDS = [
  'name',
  'image',
  'cuisine',
  'difficulty',
  'rating',
  'reviewCount',
  'prepTimeMinutes',
  'cookTimeMinutes',
  'caloriesPerServing',
  'mealType',
];

/**
 * Репозиторий рецептов: единственное место, которое знает
 * адреса ресурсов и формат ответов API.
 */
export class RecipeService {
  #http;

  /** @param {import('./HttpClient.js').HttpClient} http */
  constructor(http) {
    this.#http = http;
  }

  /**
   * Список рецептов с сортировкой, поиском и пагинацией на стороне сервера.
   * @param {ListParams} params
   * @param {{ signal?: AbortSignal }} [options]
   * @returns {Promise<RecipeList>}
   */
  async getList(params, { signal } = {}) {
    const path = params.q?.trim() ? 'recipes/search' : 'recipes';
    const data = await this.#http.get(path, {
      params: toApiListParams(params, CARD_FIELDS),
      signal,
    });

    return {
      items: data.recipes,
      total: data.total,
      page: params.page,
      limit: params.limit,
      totalPages: getTotalPages(data.total, params.limit),
    };
  }

  /**
   * @param {number | string} id
   * @param {{ signal?: AbortSignal }} [options]
   * @returns {Promise<Recipe>}
   */
  getById(id, { signal } = {}) {
    const numericId = Number(id);

    if (!Number.isInteger(numericId) || numericId <= 0) {
      return Promise.reject(
        new ApiError('Рецепт не найден', { type: ApiErrorType.HTTP, status: 404 }),
      );
    }

    return this.#http.get(`recipes/${numericId}`, { signal });
  }

  /**
   * Создание рецепта. DummyJSON имитирует запись: возвращает объект с id,
   * но не сохраняет его.
   * @param {Omit<Recipe, 'id'>} recipe
   * @returns {Promise<Recipe>}
   */
  create(recipe) {
    return this.#http.post('recipes/add', recipe);
  }
}

export const recipeService = new RecipeService(httpClient);

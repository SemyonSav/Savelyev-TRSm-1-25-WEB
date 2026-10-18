/**
 * @typedef {Object} RecipeFormValues значения полей формы (как их вводит пользователь)
 * @property {string} name
 * @property {string} cuisine
 * @property {string} image
 * @property {string} difficulty
 * @property {string} prepTimeMinutes
 * @property {string} cookTimeMinutes
 * @property {string} servings
 * @property {string} caloriesPerServing
 * @property {string[]} mealType
 * @property {string[]} ingredients
 * @property {string[]} instructions
 * @property {string} tags теги через запятую
 * @property {string} rating
 * @property {string} reviewCount
 * @property {string} userId
 */

/** @type {RecipeFormValues} */
export const EMPTY_RECIPE_FORM = Object.freeze({
  name: '',
  cuisine: '',
  image: '',
  difficulty: 'Easy',
  prepTimeMinutes: '',
  cookTimeMinutes: '',
  servings: '',
  caloriesPerServing: '',
  mealType: [],
  ingredients: [''],
  instructions: [''],
  tags: '',
  rating: '',
  reviewCount: '',
  userId: '',
});

const toNumber = (value) => (value === '' ? undefined : Number(value));
const compact = (items) => items.map((item) => item.trim()).filter(Boolean);

/**
 * Адаптер: значения формы → объект рецепта в формате API.
 * @param {RecipeFormValues} values
 * @returns {Omit<import('@/api/RecipeService.js').Recipe, 'id'>}
 */
export function toRecipePayload(values) {
  return {
    name: values.name.trim(),
    cuisine: values.cuisine.trim(),
    image: values.image.trim() || undefined,
    difficulty: values.difficulty,
    prepTimeMinutes: toNumber(values.prepTimeMinutes),
    cookTimeMinutes: toNumber(values.cookTimeMinutes),
    servings: toNumber(values.servings),
    caloriesPerServing: toNumber(values.caloriesPerServing),
    mealType: values.mealType,
    ingredients: compact(values.ingredients),
    instructions: compact(values.instructions),
    tags: compact(values.tags.split(',')),
    rating: toNumber(values.rating) ?? 0,
    reviewCount: toNumber(values.reviewCount) ?? 0,
    userId: toNumber(values.userId),
  };
}

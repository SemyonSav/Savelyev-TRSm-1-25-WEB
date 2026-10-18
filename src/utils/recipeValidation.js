/** @typedef {import('./recipeForm.js').RecipeFormValues} RecipeFormValues */

const required = (value) => (value.trim() ? null : 'Обязательное поле');

const length = (min, max) => (value) => {
  const size = value.trim().length;
  if (size < min) return `Минимум ${min} символа`;
  if (size > max) return `Максимум ${max} символов`;
  return null;
};

const integer =
  (min, max, { optional = false } = {}) =>
  (value) => {
    if (value === '') return optional ? null : 'Обязательное поле';
    const number = Number(value);
    if (!Number.isInteger(number)) return 'Введите целое число';
    if (number < min || number > max) return `Допустимо от ${min} до ${max}`;
    return null;
  };

const decimal = (min, max) => (value) => {
  if (value === '') return null;
  const number = Number(value);
  if (!Number.isFinite(number) || number < min || number > max) {
    return `Допустимо от ${min} до ${max}`;
  }
  return null;
};

const url = (value) => {
  if (!value.trim()) return null;
  try {
    const { protocol } = new URL(value.trim());
    return protocol === 'http:' || protocol === 'https:'
      ? null
      : 'Ссылка должна начинаться с http(s)';
  } catch {
    return 'Некорректная ссылка';
  }
};

const nonEmptyList = (items) => {
  if (!items.some((item) => item.trim())) return 'Добавьте хотя бы один пункт';
  if (items.some((item) => !item.trim())) return 'Заполните или удалите пустые пункты';
  return null;
};

const tags = (value) => {
  const list = value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
  if (list.length > 10) return 'Не больше 10 тегов';
  if (list.some((tag) => tag.length > 30)) return 'Тег не длиннее 30 символов';
  return null;
};

/** Правила для каждого поля: список валидаторов, первая найденная ошибка выводится. */
const RULES = {
  name: [required, length(3, 100)],
  cuisine: [required, length(2, 50)],
  image: [url],
  prepTimeMinutes: [integer(0, 1440)],
  cookTimeMinutes: [integer(0, 1440)],
  servings: [integer(1, 100)],
  caloriesPerServing: [integer(0, 5000)],
  mealType: [(value) => (value.length ? null : 'Выберите хотя бы один тип')],
  ingredients: [nonEmptyList],
  instructions: [nonEmptyList],
  tags: [tags],
  rating: [decimal(0, 5)],
  reviewCount: [integer(0, 1_000_000, { optional: true })],
  userId: [integer(1, 1_000_000)],
};

/**
 * @param {RecipeFormValues} values
 * @returns {Partial<Record<keyof RecipeFormValues, string>>} пустой объект, если ошибок нет
 */
export function validateRecipe(values) {
  const errors = {};

  Object.entries(RULES).forEach(([field, validators]) => {
    for (const validate of validators) {
      const error = validate(values[field]);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  });

  return errors;
}

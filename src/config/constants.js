export const APP_NAME = 'Рецепты';

/** Варианты количества рецептов на странице. */
export const PAGE_SIZES = Object.freeze([5, 10, 15]);

/** Поля, по которым API умеет сортировать рецепты. */
export const SORT_FIELDS = Object.freeze([
  { value: 'id', label: 'По умолчанию' },
  { value: 'name', label: 'Название' },
  { value: 'rating', label: 'Рейтинг' },
  { value: 'reviewCount', label: 'Количество отзывов' },
  { value: 'caloriesPerServing', label: 'Калорийность' },
  { value: 'prepTimeMinutes', label: 'Время подготовки' },
  { value: 'cookTimeMinutes', label: 'Время приготовления' },
]);

export const SORT_ORDERS = Object.freeze([
  { value: 'asc', label: 'По возрастанию' },
  { value: 'desc', label: 'По убыванию' },
]);

/** Параметры списка при первой загрузке страницы. */
export const DEFAULT_LIST_PARAMS = Object.freeze({
  page: 1,
  limit: 10,
  sort: 'id',
  order: 'asc',
  q: '',
});

export const SEARCH_DEBOUNCE_MS = 400;

import { DEFAULT_LIST_PARAMS, PAGE_SIZES, SORT_FIELDS, SORT_ORDERS } from '@/config/constants.js';

/** @typedef {import('@/api/queryBuilder.js').ListParams} ListParams */

const SORT_VALUES = SORT_FIELDS.map((field) => field.value);
const ORDER_VALUES = SORT_ORDERS.map((order) => order.value);

function toPositiveInt(value, fallback) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

function oneOf(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

/**
 * Читает параметры списка из строки запроса. Некорректные значения
 * заменяются значениями по умолчанию.
 * @param {URLSearchParams} searchParams
 * @returns {ListParams}
 */
export function parseListParams(searchParams) {
  return {
    page: toPositiveInt(searchParams.get('page'), DEFAULT_LIST_PARAMS.page),
    limit: oneOf(
      toPositiveInt(searchParams.get('limit'), DEFAULT_LIST_PARAMS.limit),
      PAGE_SIZES,
      DEFAULT_LIST_PARAMS.limit,
    ),
    sort: oneOf(searchParams.get('sort'), SORT_VALUES, DEFAULT_LIST_PARAMS.sort),
    order: oneOf(searchParams.get('order'), ORDER_VALUES, DEFAULT_LIST_PARAMS.order),
    q: searchParams.get('q')?.trim() ?? DEFAULT_LIST_PARAMS.q,
  };
}

/**
 * Записывает параметры списка в строку запроса. Значения по умолчанию
 * не попадают в URL, чтобы он оставался коротким.
 * @param {ListParams} params
 * @returns {URLSearchParams}
 */
export function serializeListParams(params) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== DEFAULT_LIST_PARAMS[key]) {
      searchParams.set(key, String(value));
    }
  });

  return searchParams;
}

/**
 * @typedef {Object} ListParams параметры списка в терминах интерфейса
 * @property {number} page номер страницы, начиная с 1
 * @property {number} limit количество записей на странице
 * @property {string} sort поле сортировки
 * @property {'asc' | 'desc'} order направление сортировки
 * @property {string} [q] поисковый запрос
 */

/**
 * Адаптер: переводит параметры интерфейса в query-параметры DummyJSON
 * (page → skip, sort → sortBy).
 * @param {ListParams} params
 * @param {string[]} [select] поля, которые нужно вернуть
 */
export function toApiListParams({ page, limit, sort, order, q }, select) {
  return {
    q: q?.trim() || undefined,
    limit,
    skip: (page - 1) * limit,
    sortBy: sort,
    order,
    select: select?.join(','),
  };
}

/**
 * @param {number} total
 * @param {number} limit
 */
export function getTotalPages(total, limit) {
  return Math.max(1, Math.ceil(total / limit));
}

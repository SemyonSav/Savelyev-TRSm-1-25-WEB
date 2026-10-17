import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { parseListParams, serializeListParams } from '@/utils/listParams.js';

/** @typedef {import('@/api/queryBuilder.js').ListParams} ListParams */

/**
 * Состояние списка (страница, размер, сортировка, поиск) хранится в URL:
 * им можно поделиться, а кнопки браузера «Назад/Вперёд» работают как ожидается.
 *
 * @returns {[ListParams, (patch: Partial<ListParams>, options?: { replace?: boolean }) => void]}
 */
export function useListParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => parseListParams(searchParams), [searchParams]);

  const updateParams = useCallback(
    (patch, { replace = false } = {}) => {
      setSearchParams(
        (prev) => {
          const current = parseListParams(prev);
          // Любое изменение, кроме смены страницы, возвращает на первую страницу
          const page = 'page' in patch ? patch.page : 1;
          return serializeListParams({ ...current, ...patch, page });
        },
        { replace },
      );
    },
    [setSearchParams],
  );

  return [params, updateParams];
}

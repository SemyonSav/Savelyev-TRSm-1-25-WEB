export const ELLIPSIS = 'ellipsis';

function range(from, to) {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
}

/**
 * Номера страниц для отображения с сокращением длинных диапазонов:
 * getPageItems(5, 10) → [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]
 *
 * @param {number} current текущая страница
 * @param {number} total всего страниц
 * @param {number} [siblings] сколько соседних страниц показывать с каждой стороны
 * @returns {(number | typeof ELLIPSIS)[]}
 */
export function getPageItems(current, total, siblings = 1) {
  // first + last + current + siblings*2 + два многоточия
  const maxVisible = siblings * 2 + 5;

  if (total <= maxVisible) {
    return range(1, total);
  }

  const start = Math.max(current - siblings, 2);
  const end = Math.min(current + siblings, total - 1);
  const showLeftEllipsis = start > 3;
  const showRightEllipsis = end < total - 2;

  if (!showLeftEllipsis) {
    return [...range(1, siblings * 2 + 3), ELLIPSIS, total];
  }

  if (!showRightEllipsis) {
    return [1, ELLIPSIS, ...range(total - (siblings * 2 + 2), total)];
  }

  return [1, ELLIPSIS, ...range(start, end), ELLIPSIS, total];
}

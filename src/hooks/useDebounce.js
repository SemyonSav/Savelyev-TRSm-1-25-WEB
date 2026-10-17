import { useEffect, useState } from 'react';

/**
 * Возвращает значение, обновлённое только после паузы в изменениях.
 * @template T
 * @param {T} value
 * @param {number} delay задержка в мс
 * @returns {T}
 */
export function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

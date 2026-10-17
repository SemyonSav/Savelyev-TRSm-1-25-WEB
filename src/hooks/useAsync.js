import { useCallback, useEffect, useEffectEvent, useState } from 'react';

/**
 * @template T
 * @typedef {Object} AsyncState
 * @property {T | undefined} data данные последнего успешного запроса
 * @property {Error | null} error ошибка последнего запроса
 * @property {boolean} isLoading идёт ли запрос для текущего ключа
 * @property {() => void} reload повторить запрос
 */

/**
 * Выполняет асинхронную функцию при каждом изменении ключа.
 * Предыдущий запрос отменяется через AbortController, поэтому ответы
 * «устаревших» запросов не перезаписывают актуальные данные.
 *
 * @template T
 * @param {(signal: AbortSignal) => Promise<T>} asyncFn
 * @param {string} key строка, однозначно описывающая запрос
 * @returns {AsyncState<T>}
 */
export function useAsync(asyncFn, key) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({ key: null, data: undefined, error: null });
  const requestKey = `${key}#${attempt}`;

  const run = useEffectEvent((signal) => asyncFn(signal));

  useEffect(() => {
    const controller = new AbortController();

    run(controller.signal).then(
      (data) => setResult({ key: requestKey, data, error: null }),
      (error) => {
        if (controller.signal.aborted) return;
        setResult((prev) => ({ key: requestKey, data: prev.data, error }));
      },
    );

    return () => controller.abort();
  }, [requestKey]);

  const reload = useCallback(() => setAttempt((value) => value + 1), []);

  return {
    data: result.data,
    error: result.key === requestKey ? result.error : null,
    isLoading: result.key !== requestKey,
    reload,
  };
}

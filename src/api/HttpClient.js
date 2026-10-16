import { ApiError, ApiErrorType } from './ApiError.js';

const DEFAULT_TIMEOUT = 10_000;

/**
 * @typedef {Object} RequestOptions
 * @property {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'} [method]
 * @property {Record<string, string | number | undefined | null>} [params] query-параметры
 * @property {unknown} [body] тело запроса, сериализуется в JSON
 * @property {AbortSignal} [signal] сигнал отмены от вызывающего кода
 */

/**
 * Обёртка над fetch: базовый URL, JSON, таймаут, отмена запроса
 * и приведение всех ошибок к ApiError.
 */
export class HttpClient {
  #baseUrl;
  #timeout;

  /**
   * @param {{ baseUrl: string, timeout?: number }} config
   */
  constructor({ baseUrl, timeout = DEFAULT_TIMEOUT }) {
    this.#baseUrl = baseUrl.replace(/\/+$/, '');
    this.#timeout = timeout;
  }

  /**
   * @template T
   * @param {string} path
   * @param {RequestOptions} [options]
   * @returns {Promise<T>}
   */
  async request(path, { method = 'GET', params, body, signal } = {}) {
    const url = this.#buildUrl(path, params);
    const timeoutSignal = AbortSignal.timeout(this.#timeout);

    try {
      const response = await fetch(url, {
        method,
        headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal,
      });

      const data = await this.#parseBody(response);

      if (!response.ok) {
        throw ApiError.fromResponse(response, data);
      }

      return data;
    } catch (error) {
      throw ApiError.from(error);
    }
  }

  /**
   * @param {string} path
   * @param {Omit<RequestOptions, 'method' | 'body'>} [options]
   */
  get(path, options) {
    return this.request(path, { ...options, method: 'GET' });
  }

  /**
   * @param {string} path
   * @param {unknown} body
   * @param {Omit<RequestOptions, 'method' | 'body'>} [options]
   */
  post(path, body, options) {
    return this.request(path, { ...options, method: 'POST', body });
  }

  #buildUrl(path, params = {}) {
    const url = new URL(`${this.#baseUrl}/${path.replace(/^\/+/, '')}`);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });

    return url.toString();
  }

  async #parseBody(response) {
    const text = await response.text();
    if (!text) return null;

    try {
      return JSON.parse(text);
    } catch (error) {
      throw new ApiError('Сервер вернул некорректный ответ', {
        type: ApiErrorType.PARSE,
        status: response.status,
        cause: error,
      });
    }
  }
}

/** Общий экземпляр клиента для всего приложения. */
export const httpClient = new HttpClient({
  baseUrl: import.meta.env.VITE_API_URL ?? 'https://dummyjson.com',
});

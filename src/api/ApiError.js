/** @enum {string} */
export const ApiErrorType = Object.freeze({
  NETWORK: 'network',
  HTTP: 'http',
  TIMEOUT: 'timeout',
  ABORT: 'abort',
  PARSE: 'parse',
  UNKNOWN: 'unknown',
});

const HTTP_MESSAGES = {
  400: 'Некорректный запрос',
  404: 'Запрашиваемые данные не найдены',
  429: 'Слишком много запросов, попробуйте позже',
  500: 'Внутренняя ошибка сервера',
  503: 'Сервер временно недоступен',
};

/**
 * Единый тип ошибки для всех запросов к API.
 * Компоненты работают только с ним и не разбирают ошибки fetch самостоятельно.
 */
export class ApiError extends Error {
  /**
   * @param {string} message
   * @param {{ type?: string, status?: number | null, cause?: unknown }} [options]
   */
  constructor(message, { type = ApiErrorType.UNKNOWN, status = null, cause } = {}) {
    super(message, { cause });
    this.name = 'ApiError';
    this.type = type;
    this.status = status;
  }

  get isAbort() {
    return this.type === ApiErrorType.ABORT;
  }

  get isNotFound() {
    return this.status === 404;
  }

  /**
   * @param {Response} response
   * @param {unknown} [body]
   */
  static fromResponse(response, body) {
    const { status } = response;
    const message =
      HTTP_MESSAGES[status] ??
      (status >= 500 ? HTTP_MESSAGES[500] : body?.message) ??
      `Ошибка запроса (${status})`;

    return new ApiError(message, { type: ApiErrorType.HTTP, status, cause: body });
  }

  /**
   * Приводит любую ошибку, возникшую при запросе, к ApiError.
   * @param {unknown} error
   */
  static from(error) {
    if (error instanceof ApiError) return error;

    if (error?.name === 'TimeoutError') {
      return new ApiError('Сервер слишком долго не отвечает', {
        type: ApiErrorType.TIMEOUT,
        cause: error,
      });
    }

    if (error?.name === 'AbortError') {
      return new ApiError('Запрос отменён', { type: ApiErrorType.ABORT, cause: error });
    }

    if (error instanceof TypeError) {
      return new ApiError('Не удалось подключиться к серверу. Проверьте подключение к интернету', {
        type: ApiErrorType.NETWORK,
        cause: error,
      });
    }

    return new ApiError('Произошла непредвиденная ошибка', { cause: error });
  }
}

export class HttpError extends Error {
  public readonly statusCode: number;
  public readonly errorMessages?: any;

  constructor(message: string, statusCode: number, errorMessages?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errorMessages = errorMessages;
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = 'Recurso não encontrado.', errorMessages?: any) {
    super(message, 404, errorMessages);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = 'Requisição inválida.', errorMessages?: any) {
    super(message, 400, errorMessages);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Não autorizado.', errorMessages?: any) {
    super(message, 401, errorMessages);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string = 'Conflito de recursos.', errorMessages?: any) {
    super(message, 409, errorMessages);
  }
}

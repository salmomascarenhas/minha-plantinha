import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/httpErrors';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof HttpError) res.status(err.statusCode).json({ message: err.message });

  if (err.message.includes('Erro de validação.')) {
    const errorPayload = err instanceof Error ? err.message : 'Erro de validação.';
    res.status(400).json({ message: 'Requisição inválida', details: errorPayload });
  }

  res.status(500).json({ message: 'Erro interno do servidor.' });
};

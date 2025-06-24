import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { HttpError } from '../errors/httpErrors';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof ZodError) {
    const errorMap: Record<string, string[]> = {};
    err.errors.forEach((issue) => {
      const path = issue.path.join('.');
      if (!errorMap[path]) errorMap[path] = [];
      errorMap[path].push(issue.message);
    });
    res.status(400).json({ message: 'Erro de validação.', details: errorMap });
  }

  if (err instanceof HttpError)
    res.status(err.statusCode).json({ message: err.message, details: err.errorMessages });

  res.status(500).json({ message: 'Erro interno do servidor.' });
};

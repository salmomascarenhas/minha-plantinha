import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { UnauthorizedError } from '../errors/httpErrors';

const prisma = new PrismaClient();

export const deviceAuthMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || typeof apiKey !== 'string')
      throw new UnauthorizedError('Chave de API (X-API-Key) não fornecida.');

    const plant = await prisma.plant.findUnique({
      where: { apiKey },
    });

    if (!plant) throw new UnauthorizedError('Chave de API inválida.');

    req.plant = plant;
    next();
  },
);

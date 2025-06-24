import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/httpErrors';
import { UserData } from '../services/userService';

const prisma = new PrismaClient();

export const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) throw new Error('A chave secreta JWT não está definida.');

      const decoded = jwt.verify(token, jwtSecret) as UserData & { id: string };

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) throw new UnauthorizedError('Usuário não encontrado, autorização negada.');

      req.user = user;
      next();
    } else {
      throw new UnauthorizedError('Token não fornecido ou mal formatado, autorização negada.');
    }
  },
);

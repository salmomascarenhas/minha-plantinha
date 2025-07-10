import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { UnauthorizedError } from '../errors/httpErrors';
import * as userService from '../services/userService';

const prisma = new PrismaClient();

export const register = asyncHandler(async (req: Request, res: Response) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json(newUser);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.loginUser(req.body);
  res.status(200).json(result);
});

/**
 * @desc    Busca os dados do usuário autenticado.
 * @route   GET /api/users/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new UnauthorizedError('Usuário não autenticado.');
  }

  const { password, ...userData } = await prisma.user.findUniqueOrThrow({
    where: { id: req.user.id },
  });

  res.status(200).json(userData);
});

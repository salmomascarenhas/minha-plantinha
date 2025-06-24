import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { UnauthorizedError } from '../errors/httpErrors';
import * as plantService from '../services/plantService';

export const create = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new UnauthorizedError('Ação permitida apenas para usuários autenticados.');

  const plantData = req.body;
  const userId = req.user.id;

  const newPlant = await plantService.createPlant(plantData, userId);

  res.status(201).json(newPlant);
});

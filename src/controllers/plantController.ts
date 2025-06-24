import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { NotFoundError, UnauthorizedError } from '../errors/httpErrors';
import * as plantService from '../services/plantService';

const prisma = new PrismaClient();

export const create = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new UnauthorizedError('Ação permitida apenas para usuários autenticados.');

  const plantData = req.body;
  const userId = req.user.id;

  const { plant, apiKey } = await plantService.createPlant(plantData, userId);

  res.status(201).json({ plant, apiKey });
});

export const issueCommand = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new UnauthorizedError('Ação permitida apenas para usuários autenticados.');

  const { plantId } = req.params;
  const command = req.body;

  const plant = await prisma.plant.findFirst({ where: { id: plantId, userId: req.user.id } });
  if (!plant) throw new NotFoundError('Planta não encontrada ou não pertence a este usuário.');

  await plantService.setPendingCommand(plantId, command);
  res.status(200).json({ message: 'Comando enviado para a fila do dispositivo.' });
});

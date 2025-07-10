import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { NotFoundError, UnauthorizedError } from '../errors/httpErrors';
import * as dataService from '../services/dataService';
import * as gamificationService from '../services/gamificationService';
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

  if (command.action === 'WATER_PUMP') {
    await gamificationService.unlockAchievement(req.user.id, 'FIRST_WATER');
  }

  await plantService.setPendingCommand(plantId, command);
  res.status(200).json({ message: 'Comando enviado para a fila do dispositivo.' });
});

export const getPlantHistory = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new UnauthorizedError('Ação permitida apenas para usuários autenticados.');

  const { plantId } = req.params;
  const { period } = req.query as { period: '7d' | '30d' | 'all' };

  const plant = await prisma.plant.findFirst({
    where: { id: plantId, userId: req.user.id },
  });

  if (!plant) throw new NotFoundError('Planta não encontrada ou não pertence a este usuário.');

  const historyData = await dataService.getHistoryForPlant(plantId, period);

  res.status(200).json(historyData);
});

export const getMyPlantData = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new UnauthorizedError('Usuário não autenticado.');

  const plant = await prisma.plant.findFirst({
    where: { userId: req.user.id },
    include: {
      SensorData: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
    },
  });

  if (!plant)
    throw new NotFoundError('Nenhuma planta encontrada para este usuário. Cadastre uma primeiro.');

  const { apiKey, ...plantWithoutApi } = plant;

  res.status(200).json({ plant: plantWithoutApi, user: req.user });
});

import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/httpErrors';
import * as llmService from '../services/llmService';

const prisma = new PrismaClient();

/**
 * @desc    Gera um novo relatório de saúde/dica para uma planta usando IA.
 * @route   POST /api/ai/generate-report
 * @access  Private
 */
export const generateAiReport = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new UnauthorizedError('Usuário não autenticado.');
  }

  const { plantId } = req.body;
  if (!plantId) throw new BadRequestError('O ID da planta (plantId) é obrigatório.');

  const plant = await prisma.plant.findFirst({
    where: { id: plantId, userId: req.user.id },
    include: {
      SensorData: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  if (!plant) throw new NotFoundError('Planta não encontrada ou não pertence a este usuário.');

  const latestReading = plant.SensorData[0] || null;

  const insightContent = await llmService.generatePlantInsight(plant, latestReading);

  const newInsight = await prisma.aiInsight.create({
    data: {
      plantId: plant.id,
      type: 'HEALTH_REPORT',
      content: insightContent,
    },
  });

  res.status(201).json(newInsight);
});

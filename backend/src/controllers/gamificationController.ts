import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { UnauthorizedError } from '../errors/httpErrors';

const prisma = new PrismaClient();

/**
 * @desc    Busca o status de gamificação do usuário logado (pontos e conquistas).
 * @route   GET /api/gamification/status
 * @access  Private
 */
export const getGamificationStatus = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new UnauthorizedError('Usuário não autenticado.');

  const userWithPoints = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { points: true },
  });

  const unlockedAchievements = await prisma.userAchievement.findMany({
    where: { userId: req.user.id },
    include: {
      achievement: true,
    },
    orderBy: {
      unlockedAt: 'desc',
    },
  });

  res.status(200).json({
    points: userWithPoints?.points ?? 0,
    achievements: unlockedAchievements,
  });
});

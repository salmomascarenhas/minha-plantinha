import { PrismaClient, UserAchievement } from '@prisma/client';
import { NotFoundError } from '../errors/httpErrors';

const prisma = new PrismaClient();

/**
 * Adiciona uma quantidade de pontos a um usuário.
 * @param userId - O ID do usuário que receberá os pontos.
 * @param pointsToAdd - A quantidade de pontos a serem adicionados.
 * @param reason - Um motivo textual para a pontuação (útil para logs futuros).
 * @returns O usuário atualizado.
 */
export const addPoints = async (userId: string, pointsToAdd: number, reason: string) => {
  console.log(`Adicionando ${pointsToAdd} pontos para o usuário ${userId}. Motivo: ${reason}`);

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      points: {
        increment: pointsToAdd,
      },
    },
  });

  return updatedUser;
};

/**
 * Desbloqueia uma conquista para um usuário, se ele ainda não a tiver.
 * @param userId - O ID do usuário.
 * @param achievementCode - O código único da conquista (ex: 'FIRST_PLANT').
 * @returns O registro da conquista desbloqueada ou null se já a possuía.
 */
export const unlockAchievement = async (
  userId: string,
  achievementCode: string,
): Promise<UserAchievement | null> => {
  const achievement = await prisma.achievement.findUnique({
    where: { code: achievementCode },
  });

  if (!achievement) {
    console.error(`Tentativa de desbloquear conquista inexistente com código: ${achievementCode}`);
    throw new NotFoundError('Conquista não encontrada no sistema.');
  }

  const existingRecord = await prisma.userAchievement.findUnique({
    where: {
      userId_achievementId: {
        userId: userId,
        achievementId: achievement.id,
      },
    },
  });

  if (!existingRecord) {
    console.log(`Desbloqueando a conquista "${achievement.name}" para o usuário ${userId}.`);
    const newAchievement = await prisma.userAchievement.create({
      data: {
        userId: userId,
        achievementId: achievement.id,
      },
    });
    await addPoints(userId, 50, `Desbloqueio da conquista: ${achievement.name}`);

    return newAchievement;
  }

  console.log(`Usuário ${userId} já possui a conquista "${achievement.name}".`);
  return null;
};

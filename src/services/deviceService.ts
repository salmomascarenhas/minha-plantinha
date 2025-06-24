import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAndClearPendingCommand = async (
  plantId: string,
): Promise<Prisma.JsonValue | null> => {
  const [plant] = await prisma.$transaction([
    prisma.plant.findUniqueOrThrow({ where: { id: plantId } }),
    prisma.plant.update({
      where: { id: plantId },
      data: { pendingCommand: Prisma.JsonNull },
    }),
  ]);
  return plant.pendingCommand;
};

import { Plant, Prisma, PrismaClient } from '@prisma/client';
import crypto from 'crypto'; // 1. Importar o módulo 'crypto'
import { ConflictError } from '../errors/httpErrors';

const prisma = new PrismaClient();

type PlantCreateData = Omit<Plant, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;

export const createPlant = async (
  data: PlantCreateData,
  userId: string,
): Promise<{ plant: Omit<Plant, 'apiKey'>; apiKey: string }> => {
  const existingDevice = await prisma.plant.findUnique({
    where: { deviceId: data.deviceId },
  });

  if (existingDevice) throw new ConflictError('Este dispositivo já está pareado com outra planta.');

  const apiKey = crypto.randomBytes(32).toString('hex');

  const { pendingCommand, ...rest } = data;

  const newPlant = await prisma.plant.create({
    data: {
      ...rest,
      userId: userId,
      apiKey: apiKey,
      ...(pendingCommand !== undefined
        ? { pendingCommand: pendingCommand === null ? Prisma.JsonNull : pendingCommand }
        : {}),
    },
  });

  const { apiKey: plantApiKe, ...plantWithoutApiKey } = newPlant;

  return { plant: plantWithoutApiKey, apiKey };
};

export const setPendingCommand = async (
  plantId: string,
  command: Prisma.JsonValue,
): Promise<Plant> => {
  const value = command === null ? Prisma.JsonNull : command;
  const updatedPlant = await prisma.plant.update({
    where: { id: plantId },
    data: { pendingCommand: value },
  });
  return updatedPlant;
};

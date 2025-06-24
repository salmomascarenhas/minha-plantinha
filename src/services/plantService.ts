import { Plant, PrismaClient } from '@prisma/client';
import { ConflictError } from '../errors/httpErrors';

const prisma = new PrismaClient();

type PlantCreateData = Omit<Plant, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;

export const createPlant = async (data: PlantCreateData, userId: string): Promise<Plant> => {
  const existingDevice = await prisma.plant.findUnique({
    where: { deviceId: data.deviceId },
  });

  if (existingDevice) throw new ConflictError('Este dispositivo já está pareado com outra planta.');

  const newPlant = await prisma.plant.create({
    data: {
      ...data,
      userId: userId,
    },
  });

  return newPlant;
};

import { PrismaClient, SensorData } from '@prisma/client';

const prisma = new PrismaClient();

type SensorDataInput = Omit<SensorData, 'id' | 'createdAt' | 'plantId'>;

export const saveSensorData = async (
  plantId: string,
  data: SensorDataInput,
): Promise<SensorData> => {
  const newReading = await prisma.sensorData.create({
    data: {
      ...data,
      plantId: plantId,
    },
  });
  return newReading;
};

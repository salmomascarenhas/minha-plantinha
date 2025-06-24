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

export const getHistoryForPlant = async (
  plantId: string,
  period: '7d' | '30d' | 'all',
): Promise<SensorData[]> => {
  const whereClause: { plantId: string; createdAt?: { gte: Date } } = {
    plantId: plantId,
  };

  if (period !== 'all') {
    const days = period === '7d' ? 7 : 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    whereClause.createdAt = { gte: startDate };
  }

  const history = await prisma.sensorData.findMany({
    where: whereClause,
    orderBy: {
      createdAt: 'asc',
    },
  });

  return history;
};

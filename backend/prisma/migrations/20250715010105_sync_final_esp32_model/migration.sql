-- AlterTable
ALTER TABLE "SensorData" ADD COLUMN     "coverStatus" BOOLEAN,
ADD COLUMN     "pumpStatus" BOOLEAN,
ADD COLUMN     "rainDetected" BOOLEAN,
ADD COLUMN     "soilStatus" INTEGER,
ADD COLUMN     "waterLevel" DOUBLE PRECISION,
ADD COLUMN     "wifiSignal" INTEGER,
ALTER COLUMN "temperature" DROP NOT NULL,
ALTER COLUMN "humidity" DROP NOT NULL,
ALTER COLUMN "luminosity" DROP NOT NULL;

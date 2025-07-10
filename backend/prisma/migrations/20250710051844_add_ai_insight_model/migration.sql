-- CreateEnum
CREATE TYPE "InsightType" AS ENUM ('HEALTH_REPORT', 'DAILY_TIP');

-- CreateTable
CREATE TABLE "AiInsight" (
    "id" TEXT NOT NULL,
    "type" "InsightType" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plantId" TEXT NOT NULL,

    CONSTRAINT "AiInsight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AiInsight" ADD CONSTRAINT "AiInsight_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

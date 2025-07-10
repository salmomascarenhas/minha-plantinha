/*
  Warnings:

  - A unique constraint covering the columns `[apiKey]` on the table `Plant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apiKey` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "apiKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Plant_apiKey_key" ON "Plant"("apiKey");

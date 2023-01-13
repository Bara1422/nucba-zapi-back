/*
  Warnings:

  - A unique constraint covering the columns `[state]` on the table `States` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "paymentId" DROP NOT NULL,
ALTER COLUMN "merchanOrderId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "States_state_key" ON "States"("state");

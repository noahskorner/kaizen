/*
  Warnings:

  - You are about to drop the `ExchangeRateRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ExchangeRateRecord";

-- CreateTable
CREATE TABLE "exchange_rate" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "base" TEXT NOT NULL,
    "rates" JSONB NOT NULL,

    CONSTRAINT "exchange_rate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exchange_rate_base_key" ON "exchange_rate"("base");

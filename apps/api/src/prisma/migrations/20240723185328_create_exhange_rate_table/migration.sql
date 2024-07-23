-- CreateTable
CREATE TABLE "ExchangeRateRecord" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "base" TEXT NOT NULL,
    "rates" JSONB NOT NULL,

    CONSTRAINT "ExchangeRateRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExchangeRateRecord_base_key" ON "ExchangeRateRecord"("base");

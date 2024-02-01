/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[externalId]` on the table `transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "institution" ADD COLUMN     "plaidTransactionCursor" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "account_externalId_key" ON "account"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_externalId_key" ON "transaction"("externalId");

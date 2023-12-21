/*
  Warnings:

  - Added the required column `amount` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalAccountId` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pending` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "externalAccountId" TEXT NOT NULL,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "merchantName" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "pending" BOOLEAN NOT NULL;

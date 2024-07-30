/*
  Warnings:

  - You are about to drop the column `amount` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `merchant_name` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `original_amount` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "amount",
DROP COLUMN "merchant_name",
DROP COLUMN "name",
ADD COLUMN     "original_amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "original_merchant_name" TEXT,
ADD COLUMN     "original_name" TEXT;

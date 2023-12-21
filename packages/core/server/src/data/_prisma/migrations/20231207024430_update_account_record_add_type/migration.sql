-- CreateEnum
CREATE TYPE "AccountRecordType" AS ENUM ('investment', 'credit', 'depository', 'loan', 'brokerage', 'other');

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "type" "AccountRecordType" NOT NULL DEFAULT 'other';

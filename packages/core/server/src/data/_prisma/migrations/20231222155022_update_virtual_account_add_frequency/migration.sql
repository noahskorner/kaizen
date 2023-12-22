-- CreateEnum
CREATE TYPE "VirtualAccountRecordFrequency" AS ENUM ('Weekly', 'Biweekly', 'Monthly');

-- AlterTable
ALTER TABLE "virtual_account" ADD COLUMN     "frequency" "VirtualAccountRecordFrequency" NOT NULL DEFAULT 'Monthly';

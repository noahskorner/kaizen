/*
  Warnings:

  - The values [investment,credit,depository,loan,brokerage,other] on the enum `AccountRecordType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccountRecordType_new" AS ENUM ('Investment', 'Credit', 'Depository', 'Loan', 'Brokerage', 'Other');
ALTER TABLE "account" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "account" ALTER COLUMN "type" TYPE "AccountRecordType_new" USING ("type"::text::"AccountRecordType_new");
ALTER TYPE "AccountRecordType" RENAME TO "AccountRecordType_old";
ALTER TYPE "AccountRecordType_new" RENAME TO "AccountRecordType";
DROP TYPE "AccountRecordType_old";
ALTER TABLE "account" ALTER COLUMN "type" SET DEFAULT 'Other';
COMMIT;

-- AlterTable
ALTER TABLE "account" ALTER COLUMN "type" SET DEFAULT 'Other';

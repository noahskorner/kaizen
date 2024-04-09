/*
  Warnings:

  - Added the required column `snapshot_id` to the `account_snapshot` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "account_snapshot_external_id_key";

-- AlterTable
ALTER TABLE "account_snapshot" ADD COLUMN     "snapshot_id" TEXT NOT NULL;

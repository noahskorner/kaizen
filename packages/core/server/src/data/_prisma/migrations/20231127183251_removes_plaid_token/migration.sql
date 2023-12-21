/*
  Warnings:

  - You are about to drop the column `plaidToken` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_plaidToken_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "plaidToken";

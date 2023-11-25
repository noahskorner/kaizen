/*
  Warnings:

  - You are about to drop the column `token` on the `link_token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[plaidToken]` on the table `link_token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `plaidToken` to the `link_token` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "link_token_token_key";

-- AlterTable
ALTER TABLE "link_token" DROP COLUMN "token",
ADD COLUMN     "plaidToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "link_token_plaidToken_key" ON "link_token"("plaidToken");

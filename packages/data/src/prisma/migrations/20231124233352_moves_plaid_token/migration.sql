/*
  Warnings:

  - You are about to drop the `link_token` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[plaidToken]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `plaidToken` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "plaidToken" TEXT NOT NULL;

-- DropTable
DROP TABLE "link_token";

-- CreateIndex
CREATE UNIQUE INDEX "user_plaidToken_key" ON "user"("plaidToken");

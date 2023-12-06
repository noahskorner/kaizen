/*
  Warnings:

  - Added the required column `userId` to the `institution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institution" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "institution" ADD CONSTRAINT "institution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

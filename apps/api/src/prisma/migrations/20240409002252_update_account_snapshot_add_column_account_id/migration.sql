/*
  Warnings:

  - You are about to drop the column `updated_at` on the `account_snapshot` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `account_snapshot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account_snapshot" DROP COLUMN "updated_at",
ADD COLUMN     "account_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "account_snapshot" ADD CONSTRAINT "account_snapshot_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

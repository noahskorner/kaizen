/*
  Warnings:

  - You are about to drop the `account_snapshot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "account_snapshot" DROP CONSTRAINT "account_snapshot_account_id_fkey";

-- DropTable
DROP TABLE "account_snapshot";

-- CreateTable
CREATE TABLE "account_history" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "snapshot_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "available" DOUBLE PRECISION,
    "current" DOUBLE PRECISION,
    "limit" DOUBLE PRECISION,
    "iso_currency_code" TEXT,
    "unofficial_currency_code" TEXT,
    "mask" TEXT,
    "name" TEXT NOT NULL,
    "official_name" TEXT,
    "type" "AccountRecordType" NOT NULL DEFAULT 'Other',
    "subtype" "AccountRecordSubtype",
    "verification_status" "AccountRecordVerificationStatus",

    CONSTRAINT "account_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "account_history" ADD CONSTRAINT "account_history_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

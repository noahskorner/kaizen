-- CreateTable
CREATE TABLE "account_snapshot" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

    CONSTRAINT "account_snapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_snapshot_external_id_key" ON "account_snapshot"("external_id");

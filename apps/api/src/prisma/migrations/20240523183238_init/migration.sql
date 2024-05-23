-- CreateEnum
CREATE TYPE "AccountRecordType" AS ENUM ('Investment', 'Credit', 'Depository', 'Loan', 'Brokerage', 'Other');

-- CreateEnum
CREATE TYPE "AccountRecordSubtype" AS ENUM ('Plan401a', 'Plan401k', 'Plan403B', 'Plan457b', 'Plan529', 'Brokerage', 'CashIsa', 'CryptoExchange', 'EducationSavingsAccount', 'Ebt', 'FixedAnnuity', 'Gic', 'HealthReimbursementArrangement', 'Hsa', 'Isa', 'Ira', 'Lif', 'LifeInsurance', 'Lira', 'Lrif', 'Lrsp', 'NonCustodialWallet', 'NonTaxableBrokerageAccount', 'Other', 'OtherInsurance', 'OtherAnnuity', 'Prif', 'Rdsp', 'Resp', 'Rlif', 'Rrif', 'Pension', 'ProfitSharingPlan', 'Retirement', 'Roth', 'Roth401k', 'Rrsp', 'SepIra', 'SimpleIra', 'Sipp', 'StockPlan', 'ThriftSavingsPlan', 'Tfsa', 'Trust', 'Ugma', 'Utma', 'VariableAnnuity', 'CreditCard', 'Paypal', 'Cd', 'Checking', 'Savings', 'MoneyMarket', 'Prepaid', 'Auto', 'Business', 'Commercial', 'Construction', 'Consumer', 'HomeEquity', 'Loan', 'Mortgage', 'Overdraft', 'LineOfCredit', 'Student', 'CashManagement', 'Keogh', 'MutualFund', 'Recurring', 'Rewards', 'SafeDeposit', 'Sarsep', 'Payroll', 'Null');

-- CreateEnum
CREATE TYPE "AccountRecordVerificationStatus" AS ENUM ('AutomaticallyVerified', 'PendingAutomaticVerification', 'PendingManualVerification', 'ManuallyVerified', 'VerificationExpired', 'VerificationFailed', 'DatabaseMatched');

-- CreateEnum
CREATE TYPE "TransactionPaymentChannelRecord" AS ENUM ('Online', 'InStore', 'Other');

-- CreateEnum
CREATE TYPE "TransactionCodeRecord" AS ENUM ('Adjustment', 'Atm', 'BankCharge', 'BillPayment', 'Cash', 'Cashback', 'Cheque', 'DirectDebit', 'Interest', 'Purchase', 'StandingOrder', 'Transfer', 'Null');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institution" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plaidAccessToken" TEXT NOT NULL,
    "plaidCursor" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "institution_id" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "available" DOUBLE PRECISION,
    "current" DOUBLE PRECISION,
    "limit" DOUBLE PRECISION,
    "iso_currency_code" TEXT,
    "unofficial_currency_code" TEXT,
    "external_updated_at" TIMESTAMP(3),
    "mask" TEXT,
    "name" TEXT NOT NULL,
    "official_name" TEXT,
    "type" "AccountRecordType" NOT NULL DEFAULT 'Other',
    "subtype" "AccountRecordSubtype",
    "verification_status" "AccountRecordVerificationStatus",

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_snapshot" (
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

    CONSTRAINT "account_snapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "category_id" TEXT,
    "location_id" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "external_account_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "iso_currency_code" TEXT,
    "unofficial_currency_code" TEXT,
    "check_number" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "merchant_name" TEXT,
    "original_description" TEXT,
    "pending" BOOLEAN NOT NULL DEFAULT false,
    "pending_transaction_id" TEXT,
    "account_owner" TEXT,
    "logo_url" TEXT,
    "website" TEXT,
    "authorized_date" TIMESTAMP(3),
    "authorized_datetime" TIMESTAMP(3),
    "datetime" TIMESTAMP(3),
    "payment_channel" "TransactionPaymentChannelRecord" NOT NULL DEFAULT 'Other',
    "code" "TransactionCodeRecord" DEFAULT 'Null',
    "merchant_entity_id" TEXT,
    "original_category" TEXT,
    "detailed_category" TEXT,
    "original_confidence_level" TEXT,
    "original_icon_url" TEXT,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT,
    "city" TEXT,
    "region" TEXT,
    "postal_code" TEXT,
    "country" TEXT,
    "lat" DOUBLE PRECISION,
    "lon" DOUBLE PRECISION,
    "store_number" TEXT,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallet" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallet_transaction" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transaction_id" TEXT NOT NULL,
    "wallet_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "wallet_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_external_id_key" ON "account"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_category_id_key" ON "transaction"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_location_id_key" ON "transaction"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_external_id_key" ON "transaction"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "wallet_user_id_key" ON "wallet"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "wallet_transaction_transaction_id_key" ON "wallet_transaction"("transaction_id");

-- AddForeignKey
ALTER TABLE "institution" ADD CONSTRAINT "institution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_snapshot" ADD CONSTRAINT "account_snapshot_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet_transaction" ADD CONSTRAINT "wallet_transaction_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

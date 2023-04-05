/*
  Warnings:

  - A unique constraint covering the columns `[stripe_price_id]` on the table `provider_profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripe_connect_account_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SessionInvoiceStatus" AS ENUM ('draft', 'open', 'void', 'paid', 'uncollectible');

-- AlterTable
ALTER TABLE "billing_provider_invoices" ADD COLUMN     "hosted_invoice_url" TEXT,
ADD COLUMN     "invoice_number" TEXT;

-- AlterTable
ALTER TABLE "provider_profiles" ADD COLUMN     "stripe_price_id" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "stripe_connect_account_id" TEXT;

-- CreateTable
CREATE TABLE "session_invoices" (
    "id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "status" "SessionInvoiceStatus" NOT NULL,
    "date_of_session" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "provider_id" TEXT NOT NULL,
    "member_id" TEXT NOT NULL,

    CONSTRAINT "session_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "session_invoices_invoice_id_key" ON "session_invoices"("invoice_id");

-- CreateIndex
CREATE UNIQUE INDEX "provider_profiles_stripe_price_id_key" ON "provider_profiles"("stripe_price_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_connect_account_id_key" ON "users"("stripe_connect_account_id");

-- AddForeignKey
ALTER TABLE "session_invoices" ADD CONSTRAINT "session_invoices_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "billing_provider_invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_invoices" ADD CONSTRAINT "session_invoices_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_invoices" ADD CONSTRAINT "session_invoices_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

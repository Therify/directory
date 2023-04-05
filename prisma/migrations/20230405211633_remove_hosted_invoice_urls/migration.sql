/*
  Warnings:

  - You are about to drop the column `hosted_invoice_url` on the `billing_provider_invoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "billing_provider_invoices" DROP COLUMN "hosted_invoice_url";

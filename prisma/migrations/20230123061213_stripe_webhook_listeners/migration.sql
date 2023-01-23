/*
  Warnings:

  - The primary key for the `billing_provider_invoices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `stripe_invoice_id` on the `billing_provider_invoices` table. All the data in the column will be lost.
  - The primary key for the `plans` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `plan_id` on the `plans` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `plans` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripe_customer_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `plans` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterEnum
ALTER TYPE "PlanStatus" ADD VALUE 'invalidated';

-- DropForeignKey
ALTER TABLE "billing_provider_invoices" DROP CONSTRAINT "billing_provider_invoices_plan_id_fkey";

-- DropIndex
DROP INDEX "billing_provider_invoices_user_id_key";

-- DropIndex
DROP INDEX "plans_stripe_subscription_id_key";

-- DropIndex
DROP INDEX "plans_user_id_key";

-- AlterTable
ALTER TABLE "billing_provider_invoices" DROP CONSTRAINT "billing_provider_invoices_pkey",
DROP COLUMN "stripe_invoice_id",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "plan_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "billing_provider_invoices_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "billing_provider_invoices_id_seq";

-- AlterTable
ALTER TABLE "plans" DROP CONSTRAINT "plans_pkey",
DROP COLUMN "plan_id",
DROP COLUMN "product",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "renews" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "stripe_price_id" TEXT,
ADD CONSTRAINT "plans_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_customer_id_key" ON "users"("stripe_customer_id");

-- AddForeignKey
ALTER TABLE "billing_provider_invoices" ADD CONSTRAINT "billing_provider_invoices_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

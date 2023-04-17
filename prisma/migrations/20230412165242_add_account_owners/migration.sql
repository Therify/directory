/*
  Warnings:

  - A unique constraint covering the columns `[account_owner_id]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "account_owner_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_account_owner_id_key" ON "accounts"("account_owner_id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_account_owner_id_fkey" FOREIGN KEY ("account_owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `user_id` on the `plans` table. All the data in the column will be lost.
  - You are about to drop the column `account_id` on the `practices` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `practices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `practice_providers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[practice_owner_id]` on the table `practices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `practice_owner_id` to the `practices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "plans" DROP CONSTRAINT "plans_user_id_fkey";

-- DropForeignKey
ALTER TABLE "practices" DROP CONSTRAINT "practices_account_id_fkey";

-- DropForeignKey
ALTER TABLE "practices" DROP CONSTRAINT "practices_user_id_fkey";

-- DropIndex
DROP INDEX "practices_user_id_key";

-- AlterTable
ALTER TABLE "plans" DROP COLUMN "user_id",
ADD COLUMN     "practiceId" TEXT;

-- AlterTable
ALTER TABLE "practices" DROP COLUMN "account_id",
DROP COLUMN "user_id",
ADD COLUMN     "practice_owner_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "practice_providers_user_id_key" ON "practice_providers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "practices_practice_owner_id_key" ON "practices"("practice_owner_id");

-- AddForeignKey
ALTER TABLE "plans" ADD CONSTRAINT "plans_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "practices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practices" ADD CONSTRAINT "practices_practice_owner_id_fkey" FOREIGN KEY ("practice_owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

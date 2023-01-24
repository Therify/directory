/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `practices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `practices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "practices" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "practices_user_id_key" ON "practices"("user_id");

-- AddForeignKey
ALTER TABLE "practices" ADD CONSTRAINT "practices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

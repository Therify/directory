/*
  Warnings:

  - You are about to drop the column `goals` on the `self_assessments` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `self_assessments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "self_assessments" DROP CONSTRAINT "self_assessments_user_id_fkey";

-- AlterTable
ALTER TABLE "self_assessments" DROP COLUMN "goals",
DROP COLUMN "notes",
ADD COLUMN     "has_suicidal_ideation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_caregiver" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_in_crisis" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_lgbtq" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phq9_score" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "preferences" SET DATA TYPE JSONB;

-- AddForeignKey
ALTER TABLE "self_assessments" ADD CONSTRAINT "self_assessments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

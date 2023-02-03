/*
  Warnings:

  - The primary key for the `directory_listings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `directory_listings` table. All the data in the column will be lost.
  - You are about to drop the column `profile_id` on the `directory_listings` table. All the data in the column will be lost.
  - You are about to drop the column `providerProfileId` on the `directory_listings` table. All the data in the column will be lost.
  - You are about to drop the column `auth0_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider_profile_id]` on the table `directory_listings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `plans` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider_profile_id` to the `directory_listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `directory_listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `provider_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `npi_number` to the `provider_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offers_in_person` to the `provider_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offers_medication_management` to the `provider_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offers_phone_consultations` to the `provider_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offers_sliding_scale` to the `provider_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_type` to the `provider_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pronouns` to the `provider_profiles` table without a default value. This is not possible if the table is not empty.
  - Made the column `updated_at` on table `provider_profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('coach', 'therapist');

-- DropForeignKey
ALTER TABLE "directory_listings" DROP CONSTRAINT "directory_listings_profile_id_fkey";

-- DropIndex
DROP INDEX "users_auth0_id_key";

-- AlterTable
ALTER TABLE "directory_listings" DROP CONSTRAINT "directory_listings_pkey",
DROP COLUMN "id",
DROP COLUMN "profile_id",
DROP COLUMN "providerProfileId",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "provider_profile_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "provider_profiles" ADD COLUMN     "accepted_insurances" TEXT[],
ADD COLUMN     "age_groups" TEXT[],
ADD COLUMN     "communities_served" TEXT[],
ADD COLUMN     "ethnicity" TEXT[],
ADD COLUMN     "evidence_based_practices" TEXT[],
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "languages_spoken" TEXT[],
ADD COLUMN     "licensed_states" TEXT[],
ADD COLUMN     "licenses" TEXT[],
ADD COLUMN     "modalities" TEXT[],
ADD COLUMN     "npi_number" TEXT NOT NULL,
ADD COLUMN     "offers_in_person" BOOLEAN NOT NULL,
ADD COLUMN     "offers_medication_management" BOOLEAN NOT NULL,
ADD COLUMN     "offers_phone_consultations" BOOLEAN NOT NULL,
ADD COLUMN     "offers_sliding_scale" BOOLEAN NOT NULL,
ADD COLUMN     "offers_virtual" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "profile_type" "ProfileType" NOT NULL,
ADD COLUMN     "pronouns" TEXT NOT NULL,
ADD COLUMN     "religions" TEXT[],
ADD COLUMN     "specialties" TEXT[],
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "auth0_id";

-- CreateIndex
CREATE UNIQUE INDEX "directory_listings_provider_profile_id_key" ON "directory_listings"("provider_profile_id");

-- CreateIndex
CREATE INDEX "directory_listings_practice_id_provider_profile_id_idx" ON "directory_listings"("practice_id", "provider_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "plans_user_id_key" ON "plans"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- AddForeignKey
ALTER TABLE "directory_listings" ADD CONSTRAINT "directory_listings_provider_profile_id_fkey" FOREIGN KEY ("provider_profile_id") REFERENCES "provider_profiles"("provider_profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

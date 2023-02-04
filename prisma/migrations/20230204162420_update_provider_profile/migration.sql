/*
  Warnings:

  - Added the required column `contact_email` to the `provider_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `given_name` to the `provider_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `provider_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "provider_profiles" ADD COLUMN     "contact_email" TEXT NOT NULL,
ADD COLUMN     "given_name" TEXT NOT NULL,
ADD COLUMN     "practice_start_date" TIMESTAMP(6),
ADD COLUMN     "surname" TEXT NOT NULL,
ALTER COLUMN "years_of_experience" DROP NOT NULL,
ALTER COLUMN "npi_number" DROP NOT NULL,
ALTER COLUMN "offers_in_person" SET DEFAULT false,
ALTER COLUMN "offers_medication_management" SET DEFAULT false,
ALTER COLUMN "offers_phone_consultations" SET DEFAULT false,
ALTER COLUMN "offers_sliding_scale" SET DEFAULT false;

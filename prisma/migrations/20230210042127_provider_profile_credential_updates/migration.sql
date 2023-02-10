/*
  Warnings:

  - You are about to drop the column `licensed_states` on the `provider_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `licenses` on the `provider_profiles` table. All the data in the column will be lost.
  - The `accepted_insurances` column on the `provider_profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "provider_profiles" DROP COLUMN "licensed_states",
DROP COLUMN "licenses",
ADD COLUMN     "credentials" JSONB[],
ADD COLUMN     "supervisor" JSONB,
DROP COLUMN "accepted_insurances",
ADD COLUMN     "accepted_insurances" JSONB[];

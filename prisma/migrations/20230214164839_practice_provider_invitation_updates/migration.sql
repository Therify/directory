/*
  Warnings:

  - Added the required column `designation` to the `practice_provider_invitations` table without a default value. This is not possible if the table is not empty.
  - Made the column `new_client_status` on table `provider_profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "practice_provider_invitations" ADD COLUMN     "designation" "ProfileType" NOT NULL,
ADD COLUMN     "expires_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "provider_profiles" ALTER COLUMN "new_client_status" SET NOT NULL;

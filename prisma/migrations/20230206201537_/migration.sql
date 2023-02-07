/*
  Warnings:

  - You are about to drop the `directory_listing_invitations` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "ListingStatus" ADD VALUE 'pending';

-- DropForeignKey
ALTER TABLE "directory_listing_invitations" DROP CONSTRAINT "directory_listing_invitations_practice_id_fkey";

-- DropForeignKey
ALTER TABLE "directory_listing_invitations" DROP CONSTRAINT "directory_listing_invitations_sender_id_fkey";

-- DropTable
DROP TABLE "directory_listing_invitations";

-- CreateTable
CREATE TABLE "practice_provider_invitations" (
    "id" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL,
    "practice_id" TEXT NOT NULL,
    "recipient_email" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "profile_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "practice_provider_invitations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "practice_provider_invitations" ADD CONSTRAINT "practice_provider_invitations_practice_id_fkey" FOREIGN KEY ("practice_id") REFERENCES "practices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_provider_invitations" ADD CONSTRAINT "practice_provider_invitations_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_provider_invitations" ADD CONSTRAINT "practice_provider_invitations_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "provider_profiles"("provider_profile_id") ON DELETE SET NULL ON UPDATE CASCADE;

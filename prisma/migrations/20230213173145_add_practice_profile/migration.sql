-- DropForeignKey
ALTER TABLE "directory_listings" DROP CONSTRAINT "directory_listings_provider_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "practice_provider_invitations" DROP CONSTRAINT "practice_provider_invitations_profile_id_fkey";

-- DropIndex
DROP INDEX "plans_user_id_key";

-- CreateEnum
CREATE TYPE "NewClientStatus" AS ENUM ('accepting', 'waitlist', 'not_accepting');

-- AlterTable
ALTER TABLE "provider_profiles" ADD COLUMN  "new_client_status" "NewClientStatus" DEFAULT 'not_accepting';

-- CreateTable
CREATE TABLE "practice_profiles" (
    "practice_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "practice_profiles_pkey" PRIMARY KEY ("practice_id","profile_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "practice_profiles_profile_id_key" ON "practice_profiles"("profile_id");

-- AddForeignKey
ALTER TABLE "directory_listings" ADD CONSTRAINT "directory_listings_provider_profile_id_fkey" FOREIGN KEY ("provider_profile_id") REFERENCES "provider_profiles"("provider_profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_profiles" ADD CONSTRAINT "practice_profiles_practice_id_fkey" FOREIGN KEY ("practice_id") REFERENCES "practices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_profiles" ADD CONSTRAINT "practice_profiles_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "provider_profiles"("provider_profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_provider_invitations" ADD CONSTRAINT "practice_provider_invitations_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "provider_profiles"("provider_profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

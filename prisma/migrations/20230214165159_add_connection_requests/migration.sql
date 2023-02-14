/*
  Warnings:

  - Made the column `new_client_status` on table `provider_profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ConnectionStatus" AS ENUM ('pending', 'accepted', 'declined');

-- AlterTable
ALTER TABLE "plans" ADD COLUMN     "covered_sessions" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "provider_profiles" ALTER COLUMN "new_client_status" SET NOT NULL;

-- CreateTable
CREATE TABLE "connection_requests" (
    "member_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "connection_message" TEXT,
    "connection_status" "ConnectionStatus" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "connection_requests_pkey" PRIMARY KEY ("member_id","profile_id")
);

-- AddForeignKey
ALTER TABLE "connection_requests" ADD CONSTRAINT "connection_requests_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "provider_profiles"("provider_profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection_requests" ADD CONSTRAINT "connection_requests_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

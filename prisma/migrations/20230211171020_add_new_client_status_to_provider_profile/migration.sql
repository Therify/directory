/*
  Warnings:

  - Added the required column `new_client_status` to the `provider_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NewClientStatus" AS ENUM ('accepting', 'waitlist', 'not_accepting');

-- AlterTable
ALTER TABLE "provider_profiles" ADD COLUMN     "new_client_status" "NewClientStatus" NOT NULL;

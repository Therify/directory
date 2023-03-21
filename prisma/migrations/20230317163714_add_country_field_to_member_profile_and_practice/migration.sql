-- AlterTable
ALTER TABLE "member_profiles" ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'US';

-- AlterTable
ALTER TABLE "practices" ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'US';

-- AlterTable
ALTER TABLE "redeemed_sessions" ADD COLUMN     "practice_id" TEXT,
ALTER COLUMN "profile_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "redeemed_sessions" ADD CONSTRAINT "redeemed_sessions_practice_id_fkey" FOREIGN KEY ("practice_id") REFERENCES "practices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

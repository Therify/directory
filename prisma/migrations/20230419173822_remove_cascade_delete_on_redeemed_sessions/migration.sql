-- DropForeignKey
ALTER TABLE "redeemed_sessions" DROP CONSTRAINT "redeemed_sessions_member_id_fkey";

-- DropForeignKey
ALTER TABLE "redeemed_sessions" DROP CONSTRAINT "redeemed_sessions_practice_id_fkey";

-- DropForeignKey
ALTER TABLE "redeemed_sessions" DROP CONSTRAINT "redeemed_sessions_profile_id_fkey";

-- AddForeignKey
ALTER TABLE "redeemed_sessions" ADD CONSTRAINT "redeemed_sessions_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "provider_profiles"("provider_profile_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "redeemed_sessions" ADD CONSTRAINT "redeemed_sessions_practice_id_fkey" FOREIGN KEY ("practice_id") REFERENCES "practices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "redeemed_sessions" ADD CONSTRAINT "redeemed_sessions_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

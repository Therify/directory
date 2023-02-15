-- DropForeignKey
ALTER TABLE "billing_provider_invoices" DROP CONSTRAINT "billing_provider_invoices_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "connection_requests" DROP CONSTRAINT "connection_requests_member_id_fkey";

-- DropForeignKey
ALTER TABLE "connection_requests" DROP CONSTRAINT "connection_requests_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "directory_listings" DROP CONSTRAINT "directory_listings_practice_id_fkey";

-- DropForeignKey
ALTER TABLE "member_favorites" DROP CONSTRAINT "member_favorites_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "practice_profiles" DROP CONSTRAINT "practice_profiles_practice_id_fkey";

-- DropForeignKey
ALTER TABLE "practice_provider_invitations" DROP CONSTRAINT "practice_provider_invitations_practice_id_fkey";

-- DropForeignKey
ALTER TABLE "practice_provider_invitations" DROP CONSTRAINT "practice_provider_invitations_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "practice_providers" DROP CONSTRAINT "practice_providers_practice_id_fkey";

-- DropForeignKey
ALTER TABLE "registration_codes" DROP CONSTRAINT "registration_codes_account_id_fkey";

-- AddForeignKey
ALTER TABLE "registration_codes" ADD CONSTRAINT "registration_codes_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "directory_listings" ADD CONSTRAINT "directory_listings_practice_id_fkey" FOREIGN KEY ("practice_id") REFERENCES "practices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_provider_invoices" ADD CONSTRAINT "billing_provider_invoices_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_providers" ADD CONSTRAINT "practice_providers_practice_id_fkey" FOREIGN KEY ("practice_id") REFERENCES "practices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_profiles" ADD CONSTRAINT "practice_profiles_practice_id_fkey" FOREIGN KEY ("practice_id") REFERENCES "practices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_provider_invitations" ADD CONSTRAINT "practice_provider_invitations_practice_id_fkey" FOREIGN KEY ("practice_id") REFERENCES "practices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_provider_invitations" ADD CONSTRAINT "practice_provider_invitations_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_favorites" ADD CONSTRAINT "member_favorites_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "provider_profiles"("provider_profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection_requests" ADD CONSTRAINT "connection_requests_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "provider_profiles"("provider_profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection_requests" ADD CONSTRAINT "connection_requests_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

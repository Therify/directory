-- CreateEnum
CREATE TYPE "RedeemedSessionStatus" AS ENUM ('claimed', 'available', 'voided');

-- CreateTable
CREATE TABLE "redeemed_sessions" (
    "id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "member_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "status" "RedeemedSessionStatus" NOT NULL,
    "date_of_session" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "jotform_submission_id" TEXT,

    CONSTRAINT "redeemed_sessions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "redeemed_sessions" ADD CONSTRAINT "redeemed_sessions_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "redeemed_sessions" ADD CONSTRAINT "redeemed_sessions_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "provider_profiles"("provider_profile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "redeemed_sessions" ADD CONSTRAINT "redeemed_sessions_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

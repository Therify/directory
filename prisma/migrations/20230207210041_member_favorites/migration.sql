-- CreateTable
CREATE TABLE IF NOT EXISTS "member_favorites" (
    "member_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "member_favorites_pkey" PRIMARY KEY ("member_id","profile_id")
);

-- AddForeignKey
ALTER TABLE "member_favorites" ADD CONSTRAINT "member_favorites_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "provider_profiles"("provider_profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

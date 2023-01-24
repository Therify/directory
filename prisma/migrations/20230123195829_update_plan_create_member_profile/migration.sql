-- DropForeignKey
ALTER TABLE "plans" DROP CONSTRAINT "plans_user_id_fkey";

-- CreateTable
CREATE TABLE "member_profiles" (
    "member_profile_id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "insurance" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "member_profiles_pkey" PRIMARY KEY ("member_profile_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "member_profiles_user_id_key" ON "member_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "plans" ADD CONSTRAINT "plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_profiles" ADD CONSTRAINT "member_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

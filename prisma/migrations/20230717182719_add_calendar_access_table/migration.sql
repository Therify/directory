-- CreateTable
CREATE TABLE "calendar_access" (
    "user_id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "is_valid" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "calendar_access_pkey" PRIMARY KEY ("user_id","email_address")
);

-- CreateIndex
CREATE UNIQUE INDEX "calendar_access_email_address_key" ON "calendar_access"("email_address");

-- AddForeignKey
ALTER TABLE "calendar_access" ADD CONSTRAINT "calendar_access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

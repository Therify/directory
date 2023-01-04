-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "given_name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_address_key" ON "User"("email_address");

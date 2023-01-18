-- CreateEnum
CREATE TYPE "Role" AS ENUM ('provider_coach', 'provider_therapist', 'member');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('listed', 'unlisted');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('subscription_provider', 'subscription_member', 'session');

-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid');

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('pending', 'accepted', 'declined', 'expired');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "given_name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "has_accepted_terms_and_conditions" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roles" "Role"[],
    "stripe_customer_id" TEXT,
    "auth0_id" TEXT NOT NULL,
    "accountId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "account_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "registration_code_id" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "registration_codes" (
    "id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,

    CONSTRAINT "registration_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directory_listings" (
    "id" SERIAL NOT NULL,
    "practice_id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "status" "ListingStatus" NOT NULL,
    "providerProfileId" INTEGER NOT NULL,

    CONSTRAINT "directory_listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "plan_id" SERIAL NOT NULL,
    "seats" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "account_id" TEXT,
    "user_id" TEXT NOT NULL,
    "billing_user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "PlanStatus" NOT NULL,
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "product" "ProductType" NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("plan_id")
);

-- CreateTable
CREATE TABLE "billing_provider_invoices" (
    "id" SERIAL NOT NULL,
    "stripe_invoice_id" TEXT NOT NULL,
    "plan_id" INTEGER,
    "invoice_id" VARCHAR(255) NOT NULL,
    "user_id" TEXT NOT NULL,
    "account_id" TEXT,
    "status" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "amount_due" INTEGER NOT NULL,
    "amoint_paid" INTEGER NOT NULL,
    "amount_remaining" INTEGER NOT NULL,
    "invoice_pdf" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "billing_provider_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "practices" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "address_2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "account_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "practices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "practice_providers" (
    "practice_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "practice_providers_pkey" PRIMARY KEY ("practice_id","user_id")
);

-- CreateTable
CREATE TABLE "directory_listing_invitations" (
    "id" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL,
    "practice_id" TEXT NOT NULL,
    "recipient_email" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "directory_listing_invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider_profiles" (
    "provider_profile_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" TEXT,
    "bio" TEXT,
    "profile_image_url" TEXT,
    "years_of_experience" TEXT NOT NULL,
    "minimum_rate" INTEGER NOT NULL,
    "maximum_rate" INTEGER,
    "ideal_client_description" TEXT,
    "practice_notes" TEXT,

    CONSTRAINT "provider_profiles_pkey" PRIMARY KEY ("provider_profile_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_address_key" ON "users"("email_address");

-- CreateIndex
CREATE UNIQUE INDEX "users_auth0_id_key" ON "users"("auth0_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_accountId_key" ON "users"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "plans_user_id_key" ON "plans"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "plans_stripe_subscription_id_key" ON "plans"("stripe_subscription_id");

-- CreateIndex
CREATE INDEX "plans_stripe_customer_id_stripe_subscription_id_idx" ON "plans"("stripe_customer_id", "stripe_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "billing_provider_invoices_user_id_key" ON "billing_provider_invoices"("user_id");

-- CreateIndex
CREATE INDEX "billing_provider_invoices_invoice_id_user_id_idx" ON "billing_provider_invoices"("invoice_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "provider_profiles_user_id_key" ON "provider_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration_codes" ADD CONSTRAINT "registration_codes_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "directory_listings" ADD CONSTRAINT "directory_listings_practice_id_fkey" FOREIGN KEY ("practice_id") REFERENCES "practices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "directory_listings" ADD CONSTRAINT "directory_listings_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "provider_profiles"("provider_profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plans" ADD CONSTRAINT "plans_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plans" ADD CONSTRAINT "plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_provider_invoices" ADD CONSTRAINT "billing_provider_invoices_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("plan_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_provider_invoices" ADD CONSTRAINT "billing_provider_invoices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_provider_invoices" ADD CONSTRAINT "billing_provider_invoices_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practices" ADD CONSTRAINT "practices_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_providers" ADD CONSTRAINT "practice_providers_practice_id_fkey" FOREIGN KEY ("practice_id") REFERENCES "practices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_providers" ADD CONSTRAINT "practice_providers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "directory_listing_invitations" ADD CONSTRAINT "directory_listing_invitations_practice_id_fkey" FOREIGN KEY ("practice_id") REFERENCES "practices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "directory_listing_invitations" ADD CONSTRAINT "directory_listing_invitations_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_profiles" ADD CONSTRAINT "provider_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

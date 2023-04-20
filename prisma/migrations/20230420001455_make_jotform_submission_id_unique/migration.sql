/*
  Warnings:

  - A unique constraint covering the columns `[jotform_submission_id]` on the table `redeemed_sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "redeemed_sessions_jotform_submission_id_key" ON "redeemed_sessions"("jotform_submission_id");

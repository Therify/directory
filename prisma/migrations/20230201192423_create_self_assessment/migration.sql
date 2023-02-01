-- CreateTable
CREATE TABLE "self_assessments" (
    "self_assessment_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "concerns" TEXT[],
    "goals" TEXT[],
    "notes" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "preferences" JSON NOT NULL DEFAULT '{}',

    CONSTRAINT "self_assessments_pkey" PRIMARY KEY ("self_assessment_id")
);

-- AddForeignKey
ALTER TABLE "self_assessments" ADD CONSTRAINT "self_assessments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

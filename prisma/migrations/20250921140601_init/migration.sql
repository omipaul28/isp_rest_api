/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isp_id` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isp_id` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Client" ADD COLUMN     "isp_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Package" ADD COLUMN     "isp_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."Isp" (
    "isp_id" SERIAL NOT NULL,
    "ispName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "ispLogo" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Isp_pkey" PRIMARY KEY ("isp_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Isp_phone_key" ON "public"."Isp"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Isp_email_key" ON "public"."Isp"("email");

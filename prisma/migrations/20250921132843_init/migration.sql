/*
  Warnings:

  - You are about to drop the column `userAddedDate` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Client" DROP COLUMN "userAddedDate",
ADD COLUMN     "clientAddedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."User" (
    "user_id" SERIAL NOT NULL,
    "localid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_localid_key" ON "public"."User"("localid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

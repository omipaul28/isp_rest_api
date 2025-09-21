/*
  Warnings:

  - A unique constraint covering the columns `[isp_id_firebase]` on the table `Isp` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isp_id_firebase` to the `Isp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Isp" ADD COLUMN     "isp_id_firebase" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Isp_isp_id_firebase_key" ON "public"."Isp"("isp_id_firebase");

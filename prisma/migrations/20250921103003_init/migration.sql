-- CreateTable
CREATE TABLE "public"."Package" (
    "package_id" SERIAL NOT NULL,
    "name" TEXT,
    "bandwidth" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("package_id")
);

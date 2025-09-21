-- CreateTable
CREATE TABLE "public"."Client" (
    "customer_id" SERIAL NOT NULL,
    "autoName" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "gMapLattitude" DOUBLE PRECISION,
    "gMapLongitude" DOUBLE PRECISION,
    "manualLocation" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "note" TEXT,
    "package_id" INTEGER NOT NULL,
    "userAddedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "isDue" BOOLEAN NOT NULL DEFAULT false,
    "isOff" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("customer_id")
);

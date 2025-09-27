-- CreateTable
CREATE TABLE "public"."ClientBillTable" (
    "bill_id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "isp_id" INTEGER NOT NULL,
    "billMonth" TEXT NOT NULL,
    "billYear" TEXT NOT NULL,
    "billAmount" DOUBLE PRECISION NOT NULL,
    "dueAmount" DOUBLE PRECISION,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "paidDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientBillTable_pkey" PRIMARY KEY ("bill_id")
);

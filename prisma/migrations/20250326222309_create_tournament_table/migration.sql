-- CreateTable
CREATE TABLE "Tournament" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "creator" VARCHAR(50) NOT NULL,
    "location" VARCHAR(50) NOT NULL,
    "prize" VARCHAR(50),
    "startDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateEnum
CREATE TYPE "FightStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'FINISHED');

-- CreateTable
CREATE TABLE "Fight" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "warrior1Id" TEXT,
    "warrior2Id" TEXT,
    "winnerId" TEXT,
    "description" VARCHAR(255),
    "creator" VARCHAR(50),
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "status" "FightStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_warrior1Id_fkey" FOREIGN KEY ("warrior1Id") REFERENCES "Warrior"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_warrior2Id_fkey" FOREIGN KEY ("warrior2Id") REFERENCES "Warrior"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fight" ADD CONSTRAINT "Fight_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Warrior"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Warrior` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Warrior` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Warrior" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Warrior_userId_key" ON "Warrior"("userId");

-- AddForeignKey
ALTER TABLE "Warrior" ADD CONSTRAINT "Warrior_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

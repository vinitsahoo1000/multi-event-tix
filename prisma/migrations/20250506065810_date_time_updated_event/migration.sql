/*
  Warnings:

  - Added the required column `Time` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "Time" TEXT NOT NULL,
ALTER COLUMN "Date" SET DATA TYPE TEXT;

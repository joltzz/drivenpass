/*
  Warnings:

  - Added the required column `isVirtual` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "isVirtual" BOOLEAN NOT NULL,
ALTER COLUMN "cardNumber" SET DATA TYPE TEXT,
ALTER COLUMN "cvv" SET DATA TYPE TEXT,
ALTER COLUMN "expirationDate" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT;

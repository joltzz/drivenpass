/*
  Warnings:

  - You are about to drop the `cardType` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `type` on the `cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('credit', 'debit', 'both');

-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_fk1";

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "type",
ADD COLUMN     "type" "CardType" NOT NULL;

-- DropTable
DROP TABLE "cardType";

/*
  Warnings:

  - You are about to drop the column `statusMotosita` on the `motorista` table. All the data in the column will be lost.
  - Added the required column `statusMotorista` to the `Motorista` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `motorista` DROP COLUMN `statusMotosita`,
    ADD COLUMN `statusMotorista` VARCHAR(191) NOT NULL;

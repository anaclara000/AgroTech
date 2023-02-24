/*
  Warnings:

  - You are about to drop the column `idMotorista` on the `veiculos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `veiculos` DROP FOREIGN KEY `Veiculos_idMotorista_fkey`;

-- AlterTable
ALTER TABLE `veiculos` DROP COLUMN `idMotorista`;

/*
  Warnings:

  - Added the required column `statusMotosita` to the `Motorista` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ativoUser` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `motorista` ADD COLUMN `statusMotosita` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `ativoUser` VARCHAR(191) NOT NULL;

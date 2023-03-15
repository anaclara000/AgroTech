/*
  Warnings:

  - Added the required column `status` to the `Operacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `operacao` ADD COLUMN `status` VARCHAR(191) NOT NULL;

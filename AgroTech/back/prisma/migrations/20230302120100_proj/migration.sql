/*
  Warnings:

  - A unique constraint covering the columns `[CNH]` on the table `Motorista` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[CPF]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[placa]` on the table `Veiculos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Motorista_CNH_key` ON `Motorista`(`CNH`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_email_key` ON `Usuario`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_CPF_key` ON `Usuario`(`CPF`);

-- CreateIndex
CREATE UNIQUE INDEX `Veiculos_placa_key` ON `Veiculos`(`placa`);

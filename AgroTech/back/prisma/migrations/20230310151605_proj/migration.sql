-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `CPF` VARCHAR(191) NOT NULL,
    `nivel` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    UNIQUE INDEX `Usuario_CPF_key`(`CPF`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Motorista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `CNH` INTEGER NOT NULL,
    `disponivel` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Veiculos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `placa` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Veiculos_placa_key`(`placa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Manutencao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_inicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_fim` DATETIME(3) NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `id_Veiculo` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Operacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataInicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataFim` DATETIME(3) NULL,
    `id_Motorista` INTEGER NOT NULL,
    `idVeiculo` INTEGER NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Manutencao` ADD CONSTRAINT `Manutencao_id_Veiculo_fkey` FOREIGN KEY (`id_Veiculo`) REFERENCES `Veiculos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operacao` ADD CONSTRAINT `Operacao_id_Motorista_fkey` FOREIGN KEY (`id_Motorista`) REFERENCES `Motorista`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operacao` ADD CONSTRAINT `Operacao_idVeiculo_fkey` FOREIGN KEY (`idVeiculo`) REFERENCES `Veiculos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

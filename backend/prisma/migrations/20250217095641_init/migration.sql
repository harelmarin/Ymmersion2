/*
  Warnings:

  - You are about to drop the column `dateAction` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `utilisateurId` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `dateTransaction` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `employeId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `montant` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `utilisateurId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `vehiculeId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `facture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `statistiques` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `utilisateur` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicule` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionType` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `facture` DROP FOREIGN KEY `Facture_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `logs` DROP FOREIGN KEY `Logs_utilisateurId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_employeId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_utilisateurId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_vehiculeId_fkey`;

-- DropIndex
DROP INDEX `Logs_utilisateurId_fkey` ON `logs`;

-- DropIndex
DROP INDEX `Transactions_employeId_fkey` ON `transactions`;

-- DropIndex
DROP INDEX `Transactions_utilisateurId_fkey` ON `transactions`;

-- DropIndex
DROP INDEX `Transactions_vehiculeId_fkey` ON `transactions`;

-- AlterTable
ALTER TABLE `logs` DROP COLUMN `dateAction`,
    DROP COLUMN `utilisateurId`,
    ADD COLUMN `actionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `dateTransaction`,
    DROP COLUMN `employeId`,
    DROP COLUMN `montant`,
    DROP COLUMN `type`,
    DROP COLUMN `utilisateurId`,
    DROP COLUMN `vehiculeId`,
    ADD COLUMN `amount` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `employeeId` INTEGER NOT NULL,
    ADD COLUMN `transactionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `transactionType` ENUM('purchase', 'sale') NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD COLUMN `vehicleId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `facture`;

-- DropTable
DROP TABLE `statistiques`;

-- DropTable
DROP TABLE `utilisateur`;

-- DropTable
DROP TABLE `vehicule`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `role` ENUM('client', 'employee', 'admin') NOT NULL DEFAULT 'client',
    `active` BOOLEAN NOT NULL DEFAULT true,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brand` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `mileage` INTEGER NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `condition` ENUM('new', 'used') NOT NULL,
    `available` BOOLEAN NOT NULL DEFAULT true,
    `addedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` INTEGER NOT NULL,
    `invoiceNumber` VARCHAR(191) NOT NULL,
    `details` VARCHAR(191) NOT NULL,
    `totalAmount` DECIMAL(65, 30) NOT NULL,
    `invoiceDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Invoice_transactionId_key`(`transactionId`),
    UNIQUE INDEX `Invoice_invoiceNumber_key`(`invoiceNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Statistics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `month` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `totalSales` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `totalPurchases` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `vehiclesSold` INTEGER NOT NULL DEFAULT 0,
    `vehiclesPurchased` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Logs` ADD CONSTRAINT `Logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

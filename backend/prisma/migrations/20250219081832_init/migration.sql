/*
  Warnings:

  - You are about to drop the column `purchasePrice` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Vehicle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vin]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[internalId]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[licensePlate]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `color` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fees` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `internalId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licensePlate` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vin` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Vehicle` DROP COLUMN `purchasePrice`,
    DROP COLUMN `year`,
    ADD COLUMN `color` VARCHAR(191) NOT NULL,
    ADD COLUMN `fees` DOUBLE NOT NULL,
    ADD COLUMN `internalId` VARCHAR(191) NOT NULL,
    ADD COLUMN `isRental` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `licensePlate` VARCHAR(191) NOT NULL,
    ADD COLUMN `version` VARCHAR(191) NOT NULL,
    ADD COLUMN `vin` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `VehicleOption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `vehicleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Vehicle_vin_key` ON `Vehicle`(`vin`);

-- CreateIndex
CREATE UNIQUE INDEX `Vehicle_internalId_key` ON `Vehicle`(`internalId`);

-- CreateIndex
CREATE UNIQUE INDEX `Vehicle_licensePlate_key` ON `Vehicle`(`licensePlate`);

-- AddForeignKey
ALTER TABLE `VehicleOption` ADD CONSTRAINT `VehicleOption_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

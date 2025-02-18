/*
  Warnings:

  - Added the required column `purchasePrice` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vehicle` ADD COLUMN `purchasePrice` DECIMAL(65, 30) NOT NULL;

/*
  Warnings:

  - You are about to alter the column `price` on the `Vehicle` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to alter the column `img` on the `Vehicle` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Vehicle` MODIFY `price` INTEGER NOT NULL,
    ALTER COLUMN `purchasePrice` DROP DEFAULT,
    MODIFY `img` VARCHAR(191) NULL;

/*
  Warnings:

  - The primary key for the `disease_history` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `disease_history` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `disease_category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `disease_history` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `disease_history` DROP FOREIGN KEY `disease_history_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `disease_history` DROP FOREIGN KEY `disease_history_periksa_id_fkey`;

-- AlterTable
ALTER TABLE `disease_history` DROP PRIMARY KEY,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `periksaId` INTEGER NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ALTER COLUMN `date` DROP DEFAULT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `disease_category`;

-- CreateTable
CREATE TABLE `diseaseCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `disease_history` ADD CONSTRAINT `disease_history_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `diseaseCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `disease_history` ADD CONSTRAINT `disease_history_periksaId_fkey` FOREIGN KEY (`periksaId`) REFERENCES `periksa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[idempotencyKeyid]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idempotencyKeyid` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `idempotencyKeyid` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `IdempotencyKey` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `IdempotencyKey_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Booking_idempotencyKeyid_key` ON `Booking`(`idempotencyKeyid`);

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_idempotencyKeyid_fkey` FOREIGN KEY (`idempotencyKeyid`) REFERENCES `IdempotencyKey`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

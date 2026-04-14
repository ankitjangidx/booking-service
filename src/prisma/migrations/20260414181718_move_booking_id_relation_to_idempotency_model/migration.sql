/*
  Warnings:

  - You are about to drop the column `idempotencyKeyid` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookingId]` on the table `IdempotencyKey` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingId` to the `IdempotencyKey` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_idempotencyKeyid_fkey`;

-- DropIndex
DROP INDEX `Booking_idempotencyKeyid_key` ON `Booking`;

-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `idempotencyKeyid`;

-- AlterTable
ALTER TABLE `IdempotencyKey` ADD COLUMN `bookingId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `IdempotencyKey_bookingId_key` ON `IdempotencyKey`(`bookingId`);

-- AddForeignKey
ALTER TABLE `IdempotencyKey` ADD CONSTRAINT `IdempotencyKey_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

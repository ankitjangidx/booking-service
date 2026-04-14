-- AlterTable
ALTER TABLE `IdempotencyKey` ADD COLUMN `finalize` BOOLEAN NOT NULL DEFAULT false;

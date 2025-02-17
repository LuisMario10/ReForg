/*
  Warnings:

  - You are about to drop the column `addressId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_addressId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `addressId`;

-- CreateTable
CREATE TABLE `_AddressToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AddressToUser_AB_unique`(`A`, `B`),
    INDEX `_AddressToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AddressToUser` ADD CONSTRAINT `_AddressToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AddressToUser` ADD CONSTRAINT `_AddressToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

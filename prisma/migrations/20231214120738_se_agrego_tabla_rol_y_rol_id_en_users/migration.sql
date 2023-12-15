/*
  Warnings:

  - Added the required column `Rol_ID` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `Rol_ID` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `rol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Rol` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_Rol_ID_fkey` FOREIGN KEY (`Rol_ID`) REFERENCES `rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

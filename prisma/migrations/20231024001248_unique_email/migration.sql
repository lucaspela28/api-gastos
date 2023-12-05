/*
  Warnings:

  - A unique constraint covering the columns `[Email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `gastos` DROP FOREIGN KEY `gastos_Categoria_ID_fkey`;

-- DropForeignKey
ALTER TABLE `gastos` DROP FOREIGN KEY `gastos_User_ID_fkey`;

-- DropForeignKey
ALTER TABLE `gastos_detalle` DROP FOREIGN KEY `gastos_detalle_Categoria_ID_fkey`;

-- DropForeignKey
ALTER TABLE `gastos_detalle` DROP FOREIGN KEY `gastos_detalle_User_ID_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `users_Email_key` ON `users`(`Email`);

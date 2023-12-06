/*
  Warnings:

  - Added the required column `Detalle` to the `gastos` table without a default value. This is not possible if the table is not empty.
  - Made the column `Password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `gastos` ADD COLUMN `Detalle` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `Password` VARCHAR(191) NOT NULL;

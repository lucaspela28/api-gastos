/*
  Warnings:

  - Added the required column `Gasto_ID` to the `gastos_detalle` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `gastos_Categoria_ID_fkey` ON `gastos`;

-- DropIndex
DROP INDEX `gastos_User_ID_fkey` ON `gastos`;

-- DropIndex
DROP INDEX `gastos_detalle_Categoria_ID_fkey` ON `gastos_detalle`;

-- DropIndex
DROP INDEX `gastos_detalle_User_ID_fkey` ON `gastos_detalle`;

-- AlterTable
ALTER TABLE `gastos_detalle` ADD COLUMN `Gasto_ID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `gastos` ADD CONSTRAINT `gastos_User_ID_fkey` FOREIGN KEY (`User_ID`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gastos` ADD CONSTRAINT `gastos_Categoria_ID_fkey` FOREIGN KEY (`Categoria_ID`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gastos_detalle` ADD CONSTRAINT `gastos_detalle_Gasto_ID_fkey` FOREIGN KEY (`Gasto_ID`) REFERENCES `gastos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gastos_detalle` ADD CONSTRAINT `gastos_detalle_User_ID_fkey` FOREIGN KEY (`User_ID`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gastos_detalle` ADD CONSTRAINT `gastos_detalle_Categoria_ID_fkey` FOREIGN KEY (`Categoria_ID`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

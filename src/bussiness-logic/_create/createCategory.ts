import { prisma } from "../../repository/prisma";
import { Category } from "../types/category";

export async function createCategory(categoria: Category) {
	try {
		const newCategory = await prisma.categorias.create({
			data: {
				Categoria: categoria.categoria,
			},
		});
		return newCategory;
	} catch (err: any) {
		console.error("Error al crear la categoria:", err);
		throw err;
	}
}

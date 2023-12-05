import { prisma } from "../../repository/prisma";

export async function searchExpenseByCategory(id: number) {
	try {
		const db = prisma;
		const expense = await db.gastos.findMany({ where: { Categoria_ID: id } });
		if (!expense) {
			throw new Error("El gasto con el ID proporcionado no existe.");
		}
		// Mapear las categorías y agregar el nombre de la categoría a cada gasto
		const expensesWithCategoryNames = await Promise.all(
			expense.map(async (expense) => {
				const category = await db.categorias.findUnique({
					where: { id: expense.Categoria_ID },
				});
				return {
					...expense,
					Categoria: category?.Categoria || null,
				};
			})
		);

		return expensesWithCategoryNames;
	} catch (err: any) {
		console.error("Error buscar el gasto:", err);
		throw err;
	}
}

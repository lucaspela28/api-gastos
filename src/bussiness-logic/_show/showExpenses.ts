import { prisma } from "../../repository/prisma";

export async function showExpenses() {
	try {
		const db = prisma;
		const expenses = await db.gastos_detalle.findMany({});
		// Mapear las categorías y agregar el nombre de la categoría a cada gasto
		const expensesWithCategoryNames = await Promise.all(
			expenses.map(async (expense) => {
				const category = await db.categorias.findUnique({
					where: { id: expense.Categoria_ID },
				});
				const formattedDate = expense.created_at.toISOString().split("T")[0];
				return {
					...expense,
					Categoria: category?.Categoria || null,
					Fecha: formattedDate,
				};
			})
		);

		return expensesWithCategoryNames;
	} catch (err: any) {
		console.log(err);
		throw err;
	}
}

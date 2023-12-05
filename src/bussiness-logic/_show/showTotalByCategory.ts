import { prisma } from "../../repository/prisma";

export async function showTotalByCategory(categoryId: number) {
	try {
		const db = prisma;

		// Encuentra todos los gastos que pertenecen a la categoría específica
		const expensesInCategory = await db.gastos_detalle.findMany({
			where: {
				Categoria_ID: categoryId,
			},
		});

		// Calcula la suma de los montos de los gastos en esa categoría
		const totalExpense = expensesInCategory.reduce(
			(total, expense) => total + expense.Monto,
			0
		);
		const category = await db.categorias.findUnique({
			where: { id: categoryId },
		});

		// Agregar el nombre de la categoría al JSON de respuesta
		const result = {
			TotalExpense: totalExpense,
			Categoria: category?.Categoria || null,
		};

		return result;
	} catch (err: any) {
		console.error("Error al calcular la suma de gastos por categoría:", err);
		throw err;
	}
}

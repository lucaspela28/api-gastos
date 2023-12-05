import { prisma } from "../../repository/prisma";

export async function searchExpenseByID(id: number) {
	try {
		const db = prisma;
		const expense = await db.gastos.findUnique({ where: { id: id } });
		if (!expense) {
			throw new Error("El gasto con el ID proporcionado no existe.");
		}
		const category = await db.categorias.findUnique({
			where: { id: expense.Categoria_ID },
		});
		const gastoDetalle = await db.gastos_detalle.findFirst({
			where: { Gasto_ID: id },
		});

		if (!gastoDetalle) {
			throw new Error(
				"No se encontró un detalle de gasto para el ID de gasto proporcionado."
			);
		}

		// Agregar el nombre de la categoría al JSON de respuesta
		const expenseWithCategoryName = {
			...expense,
			Monto: gastoDetalle.Monto,
			Categoria: category?.Categoria || null,
		};
		return expenseWithCategoryName;
	} catch (err: any) {
		console.error("Error buscar el gasto:", err);
		throw err;
	}
}

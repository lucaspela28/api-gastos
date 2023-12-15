import { prisma } from "../../repository/prisma";
import { Expense } from "../types/expense";

export async function createExpenses(expense: Expense) {
	const db = prisma;

	try {
		return await db.$transaction(async (tx) => {
			// Crear el gasto sin incluir el Monto
			const gastoData = {
				User_ID: expense.user_id,
				Categoria_ID: expense.categoria_id,
				Detalle: expense.detalle,
			};

			const createExpense = await tx.gastos.create({
				data: gastoData,
			});

			// Obtener el nombre de la categoría
			const categoria = await tx.categorias.findUnique({
				where: {
					id: expense.categoria_id,
				},
			});

			// Crear el detalle del gasto y asignar el ID de gasto a Gasto_ID, incluyendo el Monto
			const detalleData = {
				Detalle: `${expense.detalle} - ${categoria?.Categoria || "Sin categoría"}`,
				User_ID: expense.user_id,
				Categoria_ID: expense.categoria_id,
				Monto: expense.monto,
				Gasto_ID: createExpense.id,
			};

			const createExpenseDetail = await tx.gastos_detalle.create({
				data: detalleData,
			});

			return createExpenseDetail;
		});
	} catch (err: any) {
		console.error("Error al crear el gasto:", err);
		throw err;
	}
}

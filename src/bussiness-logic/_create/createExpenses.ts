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
			};

			const createExpense = await tx.gastos.create({
				data: gastoData,
			});

			// Crear el detalle del gasto y asignar el ID de gasto a Gasto_ID, incluyendo el Monto
			const detalleData = {
				Detalle: expense.detalle,
				User_ID: expense.user_id,
				Categoria_ID: expense.categoria_id,
				Monto: expense.monto, // Incluye el Monto solo aquí
				Gasto_ID: createExpense.id, // Asigna el ID del gasto
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

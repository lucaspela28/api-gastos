import { prisma } from "../../repository/prisma";
import { Expense } from "../types/expense";

export async function updateExpense(id: number, expense: Expense) {
	try {
		const db = prisma;
		const currentDate = new Date();
		const updateExpense = await db.gastos_detalle.update({
			where: {
				id: id,
			},
			data: {
				Categoria_ID: expense.categoria_id,
				Monto: expense.monto,
				updated_at: currentDate,
			},
		});

		return updateExpense;
	} catch (err: any) {
		console.error("Error al actualizar el gasto:", err);
		throw err;
	}
}

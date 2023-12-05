import { prisma } from "../../repository/prisma";

export async function showTotalExpense() {
	try {
		const db = prisma;
		const allExpenses = await db.gastos_detalle.findMany();

		// Calcula la suma de los montos de todos los gastos
		const totalExpense = allExpenses.reduce((total, expense) => total + expense.Monto, 0);

		return `La suma total de gastos, hasta el momento es: $${totalExpense}`;
	} catch (err: any) {
		console.error("Error al calcular la suma de gastos:", err);
		throw err;
	}
}

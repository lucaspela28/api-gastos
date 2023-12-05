import { prisma } from "../../repository/prisma";

export async function deleteExpense(id: number) {
	try {
		const db = prisma;
		const expense = await db.gastos.findUnique({ where: { id: id } });

		if (!expense) {
			throw new Error("El gasto con el ID proporcionado no existe.");
		}
		await db.gastos_detalle.deleteMany({ where: { Gasto_ID: id } });
		await db.gastos.delete({ where: { id: id } });

		return "Gasto eliminado con éxito";
	} catch (err: any) {
		console.error("Error al borrar los gastos:", err);
		throw err;
	}
}

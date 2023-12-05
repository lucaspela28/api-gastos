import { prisma } from "../../repository/prisma";

export async function searchExpenseByUser(user_id: number) {
	try {
		const db = prisma;
		// Buscar el usuario por su ID
		const user = await db.users.findUnique({
			where: { id: user_id },
		});

		if (!user) {
			throw new Error("El usuario con el ID proporcionado no existe.");
		}
		const allExpenses = await db.gastos.findMany({
			where: { User_ID: user_id },
		});
		// Mapear las categorías y agregar el nombre de la categoría a cada gasto
		const expensesWithCategoryNames = await Promise.all(
			allExpenses.map(async (expense) => {
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

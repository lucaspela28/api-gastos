import { Request, Response, NextFunction } from "express";
import { createExpenses } from "../bussiness-logic/_create/createExpenses";
import { showTotalExpense } from "../bussiness-logic/_show/showTotalExpense";
import { showTotalByCategory } from "../bussiness-logic/_show/showTotalByCategory";
import { searchExpenseByCategory } from "../bussiness-logic/_search/searchExpenseByCategory";
import { showExpenses } from "../bussiness-logic/_show/showExpenses";
import { updateExpense } from "../bussiness-logic/_update/updateExpense";
import { searchExpenseByID } from "../bussiness-logic/_search/searchExpenseByID";
import { searchExpenseByUser } from "../bussiness-logic/_search/searchExpenseByUser";
import { deleteExpense } from "../bussiness-logic/_delete/deleteExpense";
import { createCategory } from "../bussiness-logic/_create/createCategory";
import { createUser } from "../bussiness-logic/_create/createUser";
import { showUsers } from "../bussiness-logic/_show/showUsers";

export const createExpenseController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const expenseInput = req.body;
		const result = await createExpenses(expenseInput);
		res.json(result);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const createCategoryController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const categoryInput = req.body;
		const result = await createCategory(categoryInput);
		res.json(result);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const createUserController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userInput = req.body;
		const result = await createUser(userInput);
		res.json(result);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const showExpensesController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await showExpenses();
		res.json(result);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const showTotalExpenseController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await showTotalExpense();
		res.json(result);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const showTotalByCategoryController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = parseInt(req.params.id);
		const result = await showTotalByCategory(id);
		res.json(result);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const showUsersController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await showUsers();
		res.json(result);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const searchExpenseByCategoryController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = parseInt(req.params.id);
		const result = await searchExpenseByCategory(id);

		return res.json(result);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const searchExpenseByIDController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = parseInt(req.params.id);
		const result = await searchExpenseByID(id);
		res.json(result);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const searchExpenseByUserController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = parseInt(req.params.id);
		const result = await searchExpenseByUser(id);
		res.json(result);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const updateExpenseController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const expenseInput = req.body;
		const id = parseInt(req.params.id);
		const result = await updateExpense(id, expenseInput);
		res.json({ message: "Gasto actualizado con éxito", data: result });
	} catch (error: any) {
		console.error("Error al actualizar el gasto:", error);
		res.status(500).json({ message: error.message });
	}
};

export const deleteExpenseController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = parseInt(req.params.id);
		await deleteExpense(id);
		res.status(204).json({ message: "Gasto eliminado con éxito" });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

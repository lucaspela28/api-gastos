import { Router } from "express";
import * as controllers from "./controllers";

export const expensesRouter = Router();

//POSTS
expensesRouter.post("/createExpenses", controllers.createExpenseController);
expensesRouter.post("/createCategory", controllers.createCategoryController);
expensesRouter.post("/createUser", controllers.createUserController);

//GETS
expensesRouter.get("/showExpenses", controllers.showExpensesController);
expensesRouter.get("/showTotal", controllers.showTotalExpenseController);
expensesRouter.get("/showUsers", controllers.showUsersController);
expensesRouter.get("/categoriaTotal/:id", controllers.showTotalByCategoryController);
expensesRouter.get("/expenseByID/:id", controllers.searchExpenseByIDController);
expensesRouter.get("/expenseByUser/:id", controllers.searchExpenseByUserController);
expensesRouter.get("/categoria/:id", controllers.searchExpenseByCategoryController);

//PUTS
expensesRouter.put("/updateExpense/:id", controllers.updateExpenseController);

//DELETES
expensesRouter.delete("/delete/:id", controllers.deleteExpenseController);

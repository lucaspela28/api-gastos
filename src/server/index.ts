import express from "express";
import { expensesRouter } from "./expensesRouter";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/api/expenses/", expensesRouter);

//Le doy la orden al puerto, para q empiece a escuchar

app.listen(PORT, () => {
	console.log("Server running on port " + PORT);
});

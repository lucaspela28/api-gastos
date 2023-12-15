import express from "express";
import { expensesRouter } from "./expensesRouter";
import { authRouter } from "./authRouter";

const PORT = process.env.PORT || 3000;
const app = express();

if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
	throw new Error("ACCESS TOKEN SECRET NOT PRESENT");
}

export const access_token_secret: string = process.env.ACCESS_TOKEN_SECRET;
export const refresh_token_secret: string = process.env.REFRESH_TOKEN_SECRET;

app.use(express.json());

app.use("/api/expenses/", expensesRouter);
app.use("/api/auth/", authRouter);

//Le doy la orden al puerto, para q empiece a escuchar

app.listen(PORT, () => {
	console.log("Server running on port " + PORT);
});

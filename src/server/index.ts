import express from "express";
import { expensesRouter } from "./expensesRouter";
import jwt from "jsonwebtoken";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/api/expenses/", expensesRouter);

//Si no existe el SECRET TOKEN, me da un error

if (!process.env.ACCESS_TOKEN_SECRET) {
	throw new Error("ACCESS TOKEN SECRET NOT PRESENT");
}

//Si existe, le cargo en una variable

const secret: string = process.env.ACCESS_TOKEN_SECRET;

//En base a los datos del Login, genero un nuevo TOKEN

app.post("/login", (req: express.Request, res: express.Response) => {
	try {
		// CHECK LOS DATOS DE LOGIN
		const { user } = req.body;
		const accessToken = jwt.sign({ user: user, role: "ADMIN" }, secret, {
			expiresIn: 60 * 60,
		});
		res.json({ access_token: accessToken });
	} catch (error) {
		console.error("Error al crear el token:", error);
		res.status(500).json({ error: "Error al generar el token" });
	}
});

//Utilizo el TOKEN, para dar accesos y autorizaciones, según corresponda el rol

app.get("/login", (req: express.Request, res: express.Response) => {
	//Solo para usuarios logueados

	//1. Que este el header de autorizacion

	const header = req.headers.authorization;
	if (!header) {
		res.status(401).json({ message: "NOT AUTHORIZED: TOKEN NOT PRESENT" });
		return;
	}

	//Hago un spit, para quedarme solo con el TOKEN

	const token = header.split(" ")[1];

	//2. Verifico que sea un Token válido

	try {
		const data = jwt.verify(token, secret);
		if (data) {
			const name = (data as any).user;
			const role = (data as any).role;
			if (role === "ADMIN") {
				res.json({ message: `Hola Admin ${name}!!` });
				return;
			}
			res.json({ message: `Hola ${name}!! No sos admin` });
			return;
		}
	} catch (err: any) {
		if (err.name === "TokenExpiredError") {
			res.status(401).json({ message: "NOT AUTHORIZED: TOKEN EXPIRED" });
			return;
		}
		res.status(401).json({ message: "Unauthorized" });
		return;
	}
	res.status(401).json({ message: "NOT AUTHORIZED: TOKEN NOT VALID" });
});

//Le doy la orden al puerto, para q empiece a escuchar

app.listen(PORT, () => {
	console.log("Server running on port " + PORT);
});

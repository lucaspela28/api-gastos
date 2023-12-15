import { Request, Response, NextFunction } from "express";
import { registerUser } from "../auth-logic/registerUser";
import { loginUser, loginResponse } from "../auth-logic/loginUser";
import { refreshToken } from "../auth-logic/refreshToken";

export const registerUserController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userInput = req.body;
		const result = await registerUser(userInput);
		res.json(result);
		return;
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const loginController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = req.body;
		const result: loginResponse = await loginUser(email, password);

		if (result.accessToken) {
			res.status(200).json({
				success: "Inicio de sesión exitoso",
				token: result.accessToken,
				refreshToken: result.refreshToken,
			});
			return;
		} else {
			res.status(401).json({ error: "Correo electrónico o contraseña incorrectos." });
			return;
		}
	} catch (error: any) {
		res.status(500).json({ error: error.message });
		return;
	}
};

export const refreshTokenController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const header = req.headers.authorization;

	if (!header) {
		res.status(401).json({ message: "NOT AUTHORIZED: Token Not Present" });
		return;
	}
	const token = header.split(" ")[1];

	try {
		const result = await refreshToken(token);
		res.json(result);
		return;
	} catch (err) {
		res.status(500);
		return;
	}
};

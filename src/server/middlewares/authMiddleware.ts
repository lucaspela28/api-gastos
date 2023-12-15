import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { access_token_secret } from "../";

//AUTENTICACION

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const header = req.headers.authorization;

	if (!header) {
		res.status(401).json({ message: "NOT AUTHORIZED: Token Not Present" });
		return;
	}
	const token = header.split(" ")[1];
	try {
		const data = jwt.verify(token, access_token_secret);
		if (data) {
			res.locals.email = (data as any).email;
			res.locals.userRole = (data as any).userRol;
			return next();
		}
	} catch (err: any) {
		if (err.name === "TokenExpiredError") {
			return res.status(401).json({ message: "NOT AUTHORIZED: Token Expired" });
		}
		return res.status(401).json({ message: " NOT AUTHORIZED:  Token Not Valid" });
	}
	// Esta línea nunca debería alcanzarse, pero se incluye por claridad
	res.status(500).json({ message: "Internal Server Error" });
};

//AUTORIZACION

export const authAdminMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if ((res.locals.userRole && res.locals.userRole === 1) || res.locals.userRole === 5) {
		next();
		return;
	}
	res.status(403).json({ message: "NOT AUTHORIZED: Need Admin Role" });
};

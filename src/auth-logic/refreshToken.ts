import { prisma } from "../repository/prisma";
import jwt from "jsonwebtoken";
import { users } from "@prisma/client";
import { access_token_secret, refresh_token_secret } from "../server";
import { loginResponse } from "./loginUser";

export const refreshToken = async (token: string): Promise<loginResponse> => {
	try {
		const data = jwt.verify(token, refresh_token_secret);
		if (data) {
			const dataparsed = data as unknown as users;

			const user = await prisma.users.findUnique({
				where: { Email: dataparsed.Email },
			});
			if (user !== null) {
				const accessToken = jwt.sign(
					{ email: user.Email, role: "ADMIN" },
					access_token_secret,
					{
						expiresIn: "1h",
					}
				);
				const refreshToken = jwt.sign(
					{ email: user.Email, role: "ADMIN" },
					refresh_token_secret,
					{
						expiresIn: "72h",
					}
				);

				return { accessToken, refreshToken };
			}
		}
	} catch (err: any) {
		if (err.name === "TokenExpiredError") {
			throw new Error("NOT AUTHORIZAED: Expired Token");
		}
		throw new Error("NOT AUTHORIZED: Token Not Valid");
	}

	throw new Error("NOT AUTHORIZED: Token Not Valid");
};

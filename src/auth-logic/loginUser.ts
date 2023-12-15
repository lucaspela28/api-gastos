import bcrypt from "bcrypt";
import { prisma } from "../repository/prisma";
import jwt from "jsonwebtoken";
import { access_token_secret } from "../server/index";

export type loginResponse = { accessToken: string; refreshToken: string };

export const loginUser = async (
	email: string,
	password: string
): Promise<loginResponse> => {
	try {
		// Buscar al usuario por su dirección de correo electrónico
		const user = await prisma.users.findUnique({
			where: {
				Email: email,
			},
		});

		if (!user) {
			// El usuario no existe
			throw new Error("User not found");
		}

		// Comparar la contraseña proporcionada con el hash almacenado en la base de datos
		const passwordMatch = await bcrypt.compare(password, user.Password);

		if (passwordMatch) {
			// Contraseña correcta, generamos un token JWT y le decimos la info que queremos q contenga

			const accessToken = jwt.sign(
				{ userID: user.id, userEmail: user.Email, userRol: user.Rol_ID },
				access_token_secret,
				{
					expiresIn: 60 * 60,
				}
			);

			const refreshToken = jwt.sign({ userID: user.id }, access_token_secret, {
				expiresIn: "72h",
			});

			// Contraseña correcta, puedes considerar el usuario como autenticado
			return { accessToken, refreshToken };
		}
		throw new Error("Invalid password");
	} catch (err) {
		throw err;
	}
};

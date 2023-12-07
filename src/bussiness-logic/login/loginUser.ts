import bcrypt from "bcrypt";
import { prisma } from "../../repository/prisma";
import jwt from "jsonwebtoken";

if (!process.env.ACCESS_TOKEN_SECRET) {
	throw new Error("ACCESS TOKEN SECRET NOT PRESENT");
}

//Si existe, lo cargo en una variable

const secret: string = process.env.ACCESS_TOKEN_SECRET;

export async function loginUser(email: string, password: string) {
	try {
		// Buscar al usuario por su dirección de correo electrónico
		const user = await prisma.users.findUnique({
			where: {
				Email: email,
			},
		});

		if (!user) {
			// El usuario no existe
			return {
				error: "Correo electrónico o contraseña incorrectos.",
			};
		}

		// Comparar la contraseña proporcionada con el hash almacenado en la base de datos
		const passwordMatch = await bcrypt.compare(password, user.Password);

		if (passwordMatch) {
			// Contraseña correcta, generamos un token JWT

			const token = jwt.sign({ userID: user.id }, secret, { expiresIn: 60 * 60 });

			// Contraseña correcta, puedes considerar el usuario como autenticado
			return {
				success: "Inicio de sesión exitoso.",
				user: user,
				token: token,
			};
		} else {
			// Contraseña incorrecta
			return {
				error: "Correo electrónico o contraseña incorrectos.",
			};
		}
	} catch (err: any) {
		console.error("Error al iniciar sesión:", err);
		throw err;
	}
}

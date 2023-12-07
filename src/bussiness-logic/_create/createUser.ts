import { prisma } from "../../repository/prisma";
import { User } from "../types/user";
import bcrypt from "bcrypt";

export async function createUser(user: User) {
	try {
		// Verificar si ya existe un usuario con el mismo correo electrónico
		const existingUser = await prisma.users.findUnique({
			where: {
				Email: user.email,
			},
		});

		if (existingUser) {
			// Usuario con el mismo correo electrónico ya existe
			return {
				error: "El correo electrónico ya está en uso. No se puede crear el usuario.",
			};
		}

		//Genero un hash para almacenar la contraseña
		const hashedPassword = await bcrypt.hash(user.password, 10);

		const newUser = await prisma.users.create({
			data: {
				Nombre: user.nombre,
				Apellido: user.apellido,
				Email: user.email,
				Password: hashedPassword,
			},
		});
		return newUser;
	} catch (err: any) {
		console.error("Error al crear el usuario:", err);
		throw err;
	}
}

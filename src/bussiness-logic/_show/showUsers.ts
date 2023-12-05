import { prisma } from "../../repository/prisma";

export async function showUsers() {
	try {
		const db = prisma;
		const users = await db.users.findMany({});

		return users;
	} catch (err: any) {
		console.log(err);
		throw err;
	}
}

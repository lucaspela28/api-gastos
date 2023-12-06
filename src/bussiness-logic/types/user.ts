export type User = {
	nombre: string;
	apellido: string;
	email: string;
	created_at: Date;
	updated_at: Date;
	deleted_at?: Date;
	password: string;
};

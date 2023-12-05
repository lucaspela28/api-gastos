export type Expense = {
	id: number;
	detalle: string;
	user_id: number;
	categoria_id: number;
	monto: number;
	created_at: Date;
	updated_at: Date;
};

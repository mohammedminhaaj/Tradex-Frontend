export type ServerResponse = {
	message: string;
};

export type Stock = {
	id: number;
	name: string;
	price: string;
	created_at: string;
};

export type UserStock = {
	id: number;
	latest_price: string;
	stock: Stock;
	quantity: number;
	invested_amount: string;
};

export type UserStockData = ServerResponse & {
	data: UserStock[];
	count: number;
};

export type StockData = ServerResponse & {
	data: Stock[];
	count: number;
};

export type PortfolioProps = {
	data: UserStock[] | undefined;
	isLoading: boolean;
	isError: boolean;
};

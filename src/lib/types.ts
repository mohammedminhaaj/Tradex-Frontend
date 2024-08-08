export type ServerResponse = {
	message: string;
};

export type Stock = {
	name: string;
	price: string;
	created_at: string;
};

export type UserStock = {
	id: number;
	latest_price: string;
	stock: Stock;
	quantity: number;
};

export type UserStockData = ServerResponse & {
	data: UserStock[];
};

export type StockData = ServerResponse & {
	data: Stock[]
}

export type PortfolioProps = {
	data: UserStock[] | undefined;
	isLoading: boolean;
	isError: boolean;
};

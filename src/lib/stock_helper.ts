import { UserStockData, StockData } from './types';
import { constructedQuery } from './utils';

export const getUserStocks = async (token: string) => {
	const response = await constructedQuery(
		'/api/stock/user-stocks/?limit=5',
		'GET',
		token
	);

	if (response.status >= 400) {
		const data = (await response.json()) as UserStockData;
		throw new Error(data.message);
	}

	return (await response.json()) as UserStockData;
};

export const getStocks = async (token: string) => {
	const response = await constructedQuery(
		'/api/stock/all/?limit=5',
		'GET',
		token
	);

	if (response.status >= 400) {
		const data = (await response.json()) as StockData;
		throw new Error(data.message);
	}

	return (await response.json()) as StockData;
};

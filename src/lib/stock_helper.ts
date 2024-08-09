import { ActionMode } from '../components/forms/ActionForm';
import { UserStockData, StockData } from './types';
import { constructedQuery } from './utils';

export const getUserStocks = async (token: string) => {
	const response = await constructedQuery(
		'/api/stock/user-stocks/',
		'GET',
		token
	);

	if (response.status >= 400) {
		const data = (await response.json()) as UserStockData;
		throw new Error(data.message);
	}

	return (await response.json()) as UserStockData;
};

export const getStocks = async (token: string, url: string) => {
	const response = await constructedQuery(url, 'GET', token);

	if (response.status >= 400) {
		const data = (await response.json()) as StockData;
		throw new Error(data.message);
	}

	return (await response.json()) as StockData;
};

export const modifyUserStock = async (data: {
	quantity: number;
	name: string;
	token: string;
	mode: ActionMode;
}) => {
	const response = await constructedQuery(
		`/api/stock/user-stocks/${data.mode}/`,
		'POST',
		data.token,
		{
			quantity: data.quantity.toString(),
			name: data.name,
		}
	);

	return response;
};

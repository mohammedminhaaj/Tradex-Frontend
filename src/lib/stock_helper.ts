import { ActionMode } from '../components/forms/ActionForm';
import { UserStockData, StockData } from './types';
import { constructedQuery } from './utils';

export const getUserStocks = async (
	token: string,
	search: string | null | undefined = undefined,
	page: string | null | undefined = undefined,
	limit: string | null | undefined = undefined
) => {
	let baseUrl = '/api/stock/user-stocks/?';
	const queryList: string[] = [];

	if (search) queryList.push(`search=${encodeURIComponent(search)}`);
	if (page) queryList.push(`page=${page}`);
	if (limit) queryList.push(`limit=${limit}`);

	const queryString = queryList.length > 0 ? queryList.join('&') : '';
	const fullUrl = `${baseUrl}${queryString}`;
	const response = await constructedQuery(fullUrl, 'GET', token);

	if (response.status >= 400) {
		const data = (await response.json()) as UserStockData;
		throw new Error(data.message);
	}

	return (await response.json()) as UserStockData;
};

export const getStocks = async (
	token: string,
	url: string,
	search: string | null | undefined = undefined,
	page: string | null | undefined = undefined,
	limit: string | null | undefined = undefined
) => {
	const queryList: string[] = [];

	if (search) queryList.push(`search=${encodeURIComponent(search)}`);
	if (page) queryList.push(`page=${page}`);
	if (limit) queryList.push(`limit=${limit}`);

	const queryString = queryList.length > 0 ? queryList.join('&') : '';
	const fullUrl = `${url}${queryString}`;
	const response = await constructedQuery(fullUrl, 'GET', token);

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

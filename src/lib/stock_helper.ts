import { ActionMode } from '../components/forms/ActionForm';
import { UserStockData, StockData } from './types';
import { constructedQuery } from './utils';

export const getUserStocks = async (
	token: string,
	search: string | null | undefined = undefined,
	page: string | null | undefined = undefined,
	limit: string | null | undefined = undefined
) => {
	/*
		Helper function to get user stocks
	*/
	// Defining base URL
	let baseUrl = '/api/stock/user-stocks/?';
	const queryList: string[] = [];

	// Check if the search has any value
	if (search) queryList.push(`search=${encodeURIComponent(search)}`);
	// Check if the page has any value
	if (page) queryList.push(`page=${page}`);
	// Check if the limit has any value
	if (limit) queryList.push(`limit=${limit}`);

	// Construct the query string
	const queryString = queryList.length > 0 ? queryList.join('&') : '';
	// Append the query string
	const fullUrl = `${baseUrl}${queryString}`;
	// Call the helper function which returns a fetch object
	const response = await constructedQuery(fullUrl, 'GET', token);

	// Handle response errors
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
	/*
		Helper function to get all stocks as well as 
		stocks belonging to a single domain
		Both of them has the same structure
	*/
	// Define empty list to store query params
	const queryList: string[] = [];

	// Check if search has any values
	if (search) queryList.push(`search=${encodeURIComponent(search)}`);
	// Check if page has any values
	if (page) queryList.push(`page=${page}`);
	// Check if limit has any values
	if (limit) queryList.push(`limit=${limit}`);

	// Construct the query string
	const queryString = queryList.length > 0 ? queryList.join('&') : '';
	// Append the query string
	const fullUrl = `${url}${queryString}`;
	// Call the helper function which returns a fetch object
	const response = await constructedQuery(fullUrl, 'GET', token);

	// Check if response has any erros, throw a new exception if it does
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
	/*
		Helper function to modify user stocks
		Used for buying and selling
	*/
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

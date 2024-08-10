import DashboardCard from './DashboardCard';
import { useAuthContext } from '../../store/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { getStocks } from '../../lib/stock_helper';
import { memo } from 'react';
import { Stock } from '../../lib/types';
import { Loader2 } from 'lucide-react';
import StockRecord from './StockRecord';
import ErrorText from '../ErrorText';

type AllStocksContentType = {
	data: Stock[] | undefined;
	isLoading: boolean;
	isError: boolean;
};

export const AllStocksContent: React.FC<AllStocksContentType> = ({
	data,
	isLoading,
	isError,
}: AllStocksContentType) => {
	// Handle the data loading state
	if (isLoading)
		return <Loader2 className='mx-auto animate-spin text-purple-500' />;

	// Handle the error state
	if (isError) return <ErrorText />;

	// Handle the empty data state
	if (!data)
		return (
			<div className='w-full flex flex-col gap-3 justify-center items-center mx-auto'>
				<h3 className='text-sm md:text-md'>
					No stocks have been added yet
				</h3>
			</div>
		);

	return (
		<table className='table-auto border-separate border-spacing-y-5 w-full text-xs md:text-sm'>
			<thead className='text-left uppercase'>
				<tr className='text-violet-500'>
					<th>Name</th>
					<th>Date Added</th>
					<th>Price</th>
				</tr>
			</thead>

			<tbody className='text-gray-500'>
				{data!.map((stock) => (
					<StockRecord
						key={stock.id}
						name={stock.name}
						dateCreated={stock.created_at}
						price={stock.price}
					/>
				))}
			</tbody>
		</table>
	);
};

const AllStocks: React.FC = () => {
	const { userToken } = useAuthContext(); // Get the current auth token

	const {
		data: response,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['stocks'],
		queryFn: () => getStocks(userToken!, '/api/stock/all/?limit=5'),
		retry: 1,
		staleTime: 3000,
	});

	return (
		<DashboardCard
			viewAllowed={
				// Check if the user is allowed to click on the 'View All' button
				!isLoading && !isError && !!response && !!response.data
			}
			link='/dashboard/browse'
			title='Browse'>
			<AllStocksContent
				data={response?.data}
				isLoading={isLoading}
				isError={isError || !response}
			/>
		</DashboardCard>
	);
};
//memoizing AllStocks in order to avoid re-render due to other state changes in the parent
export default memo(AllStocks);

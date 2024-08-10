import DashboardCard from './DashboardCard';
import { useAuthContext } from '../../store/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { getStocks } from '../../lib/stock_helper';
import { memo } from 'react';
import { Stock } from '../../lib/types';
import { Loader2 } from 'lucide-react';
import StockRecord from './StockRecord';
import ErrorText from '../ErrorText';

export const AllStocksContent: React.FC<{
	data: Stock[] | undefined;
	isLoading: boolean;
	isError: boolean;
}> = ({
	data,
	isLoading,
	isError,
}: {
	data: Stock[] | undefined;
	isLoading: boolean;
	isError: boolean;
}) => {
	if (isLoading)
		return <Loader2 className='mx-auto animate-spin text-purple-500' />;
	if (isError) return <ErrorText />;

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
	const { userToken } = useAuthContext();

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

export default memo(AllStocks);

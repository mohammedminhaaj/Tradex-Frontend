import { Loader2, TrendingUp, XCircle } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { PortfolioProps } from '../../lib/types';
import PortfolioRecord from './PortfolioRecord';
import { Link } from 'react-router-dom';

const WalletContent: React.FC<PortfolioProps> = ({
	data,
	isLoading,
	isError,
}: PortfolioProps) => {
	if (isLoading)
		return <Loader2 className='mx-auto animate-spin text-purple-500' />;
	if (isError)
		return (
			<p className='text-xs md:text-sm text-red-500'>
				<XCircle className='size-4 inline' /> Something went wrong
			</p>
		);
	if (!data)
		return (
			<div className='w-full flex flex-col gap-3 justify-center items-center mx-auto'>
				<h3 className='text-lg md:text-xl'>Wallet Empty</h3>
				<Link
					to={'stocks/all'}
					className='primary-button text-xs md:text-sm'>
					<TrendingUp className='size-4 inline' /> Start Trading
				</Link>
			</div>
		);

	return (
		<table className='table-auto border-separate border-spacing-y-5 w-full text-xs md:text-sm'>
			<thead className='text-left uppercase'>
				<tr className='text-violet-500'>
					<th>Name</th>
					<th>Amount</th>
					<th>Total Value</th>
					<th>Profit</th>
				</tr>
			</thead>

			<tbody className='text-gray-500'>
				{data!.map((userStock) => (
					<PortfolioRecord
						key={userStock.id}
						name={userStock.stock.name}
						quantity={userStock.quantity}
						latestPrice={userStock.latest_price}
						ownedPrice={userStock.stock.price}
					/>
				))}
			</tbody>
		</table>
	);
};

const Wallet: React.FC<PortfolioProps> = ({
	data,
	isLoading,
	isError,
}: PortfolioProps) => {
	return (
		<DashboardCard
			title='Wallet'
			viewAllowed={!isLoading && !isError && !!data}>
			<WalletContent
				data={data}
				isError={isError}
				isLoading={isLoading}
			/>
		</DashboardCard>
	);
};

export default Wallet;

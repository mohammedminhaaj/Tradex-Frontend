import { Loader2 } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { PortfolioProps } from '../../lib/types';
import PortfolioRecord from './PortfolioRecord';
import WalletEmpty from './WalletEmpty';
import ErrorText from '../ErrorText';

export const WalletContent: React.FC<PortfolioProps> = ({
	data,
	isLoading,
	isError,
}: PortfolioProps) => {
	// Handle the data loading state
	if (isLoading)
		return <Loader2 className='mx-auto animate-spin text-purple-500' />;

	// Handle the error state
	if (isError) return <ErrorText />;

	// Handle the empty data state
	if (!data) return <WalletEmpty />;

	// Get only the top 5 records to display in this section
	const slicedData = data.slice(0, 5);

	return (
		<table className='table-auto border-separate border-spacing-y-5 w-full text-xs md:text-sm'>
			<thead className='text-left uppercase'>
				<tr className='text-violet-500'>
					<th>Name</th>
					<th>Current Price</th>
					<th>Total Value</th>
					<th>Invested Value</th>
					<th>Profit</th>
				</tr>
			</thead>

			<tbody className='text-gray-500'>
				{slicedData.map((userStock) => (
					<PortfolioRecord
						key={userStock.id}
						name={userStock.stock.name}
						quantity={userStock.quantity}
						latestPrice={userStock.latest_price}
						investedAmount={userStock.invested_amount}
					/>
				))}
			</tbody>
		</table>
	);
};

const WalletSection: React.FC<PortfolioProps> = ({
	data,
	isLoading,
	isError,
}: PortfolioProps) => {
	return (
		<DashboardCard
			title='Wallet'
			link='/dashboard/wallet'
			// Check if user is allowed to click on the View All link
			viewAllowed={!isLoading && !isError && !!data}>
			<WalletContent
				data={data}
				isError={isError}
				isLoading={isLoading}
			/>
		</DashboardCard>
	);
};

export default WalletSection;

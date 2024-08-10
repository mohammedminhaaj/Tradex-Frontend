import { Loader2 } from 'lucide-react';
import { PortfolioProps } from '../../lib/types';
import DonutChart from '../charts/DonutChart';
import DashboardCard from './DashboardCard';
import WalletEmpty from './WalletEmpty';
import ColoredValue from '../ColoredValue';
import ErrorText from '../ErrorText';

const AccountBalanceContent: React.FC<PortfolioProps> = ({
	data,
	isLoading,
	isError,
}: PortfolioProps) => {
	if (isLoading)
		return <Loader2 className='mx-auto animate-spin text-purple-500' />;
	if (isError) return <ErrorText />;
	if (!data) return <WalletEmpty />;
	const overallInvestment = data.reduce(
		(prev, curr) => prev + parseFloat(curr.invested_amount),
		0
	);
	const overallReturn =
		data.reduce(
			(prev, curr) =>
				prev + parseFloat(curr.latest_price) * curr.quantity,
			0
		) - overallInvestment;

	return (
		<>
			<DonutChart data={data} />
			<section className='w-full space-y-5 text-center'>
				<div>
					<h2 className='text-gray-500 text-sm'>Available Balance</h2>
					<h3 className='text-3xl md:text-4xl font-bold text-gray-800'>
						&pound; {(overallInvestment + overallReturn).toFixed(2)}
					</h3>
				</div>
				<div>
					<h2 className='text-gray-500 text-sm'>Total Gain/Loss</h2>
					<h3 className='text-3xl md:text-4xl font-bold text-gray-800'>
						<ColoredValue value={overallReturn} />
					</h3>
				</div>
				<div>
					<h2 className='text-gray-500 text-sm'>Total Investment</h2>
					<h3 className='text-3xl md:text-4xl font-bold text-gray-800'>
						&pound; {overallInvestment.toFixed(2)}
					</h3>
				</div>
			</section>
		</>
	);
};

const AccountBalance: React.FC<PortfolioProps> = ({
	data,
	isLoading,
	isError,
}: PortfolioProps) => {
	return (
		<DashboardCard
			title='Account Balance'
			viewAllowed={false}
			className='h-full'>
			<AccountBalanceContent
				data={data}
				isError={isError}
				isLoading={isLoading}
			/>
		</DashboardCard>
	);
};

export default AccountBalance;

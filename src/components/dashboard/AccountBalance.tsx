import { PortfolioProps } from '../../lib/types';
import DashboardCard from './DashboardCard';

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
			This is the account balance
		</DashboardCard>
	);
};

export default AccountBalance;

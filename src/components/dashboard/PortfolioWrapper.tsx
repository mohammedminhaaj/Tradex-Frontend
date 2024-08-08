import { useQuery } from '@tanstack/react-query';
import AccountBalance from './AccountBalance';
import Wallet from './Wallet';
import { getUserStocks } from '../../lib/stock_helper';
import { useAuthContext } from '../../store/AuthProvider';
import { UserStock } from '../../lib/types';

const PortfolioWrapper: React.FC<{ children: React.ReactNode }> = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { userToken } = useAuthContext();

	const {
		data: response,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['userStocks'],
		queryFn: () => getUserStocks(userToken!),
		retry: 1,
		staleTime: 3000,
	});
	return (
		<>
			<div className='md:col-span-2 space-y-5 md:row-span-4'>
				<Wallet
					data={response?.data as UserStock[] | undefined}
					isLoading={isLoading}
					isError={isError || !response}
				/>
				{/* Placeholder to display all stocks card */}
				{children}
			</div>
			<div className='order-first md:order-last md:col-span-1 md:row-span-4 row-span-1'>
				<AccountBalance
					data={response?.data as UserStock[] | undefined}
					isLoading={isLoading}
					isError={isError || !response}
				/>
			</div>
		</>
	);
};

export default PortfolioWrapper;

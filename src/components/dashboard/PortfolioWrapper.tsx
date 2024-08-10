import { useQuery } from '@tanstack/react-query';
import AccountBalance from './AccountBalance';
import WalletSection from './WalletSection';
import { getUserStocks } from '../../lib/stock_helper';
import { useAuthContext } from '../../store/AuthProvider';

const PortfolioWrapper: React.FC<{ children: React.ReactNode }> = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	/*
		A wrapper function which supplies data to both account details as well
		as wallet section. This is done so that the api call is triggered only 
		once.
	*/
	const { userToken } = useAuthContext(); // Get current auth token
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
				<WalletSection
					data={response?.data}
					isLoading={isLoading}
					isError={isError || !response}
				/>
				{/* Placeholder to display all stocks */}
				{children}
			</div>
			<div className='order-first md:order-last md:col-span-1 md:row-span-4'>
				<AccountBalance
					data={response?.data}
					isLoading={isLoading}
					isError={isError || !response}
				/>
			</div>
		</>
	);
};

export default PortfolioWrapper;

import DashboardCard from './DashboardCard';
import { useAuthContext } from '../../store/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { getStocks } from '../../lib/stock_helper';
import { memo } from 'react';

const AllStocks = () => {
	const { userToken } = useAuthContext();

	const {
		data: response,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['stocks'],
		queryFn: () => getStocks(userToken!),
		retry: 1,
		staleTime: 3000,
	});
	console.log('Getting executed');
	return (
		<DashboardCard
			viewAllowed={
				!isLoading && !isError && !!response && !!response.data
			}
			title='Browse'>
			<p>Area</p>
		</DashboardCard>
	);
};

export default memo(AllStocks);

import DashboardLayout from '../layout/DashboardLayout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getStocks } from '../lib/stock_helper';
import { useAuthContext } from '../store/AuthProvider';
import SearchBar from '../components/Searchbar';
import Pagination from '../components/Pagination';
import BreadCrumbs from '../components/Breadcrumbs';
import { AllStocksContent } from '../components/dashboard/AllStocks';
import { useEffect } from 'react';

const Browse: React.FC = () => {
	const { userToken } = useAuthContext(); // Get current user token
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	useEffect(() => {
		document.title = 'Browse Stocks | TradeX';
		if (!userToken)
			// Redirect the user if the token isn't available
			navigate('/login', { replace: true });
	}); // Set the title of the page

	const {
		data: response,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['browse', { page: searchParams.get('page') }],
		queryFn: () =>
			getStocks(
				userToken!,
				'/api/stock/all/?',
				searchParams.get('search'),
				searchParams.get('page'),
				'10'
			),
		retry: 1,
		staleTime: 3000,
	});
	return (
		<DashboardLayout>
			<BreadCrumbs currentPage='Browse' />
			<section className='space-y-5'>
				<SearchBar />
				<AllStocksContent
					data={response?.data}
					isLoading={isLoading}
					isError={isError || !response}
				/>
				{response && <Pagination totalRecords={response.count} />}
			</section>
		</DashboardLayout>
	);
};

export default Browse;

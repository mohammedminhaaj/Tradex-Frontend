import { WalletContent } from '../components/dashboard/WalletSection';
import DashboardLayout from '../layout/DashboardLayout';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserStocks } from '../lib/stock_helper';
import { useAuthContext } from '../store/AuthProvider';
import SearchBar from '../components/Searchbar';
import Pagination from '../components/Pagination';
import BreadCrumbs from '../components/Breadcrumbs';

const Wallet: React.FC = () => {
	const { userToken } = useAuthContext();
	const [searchParams] = useSearchParams();
	const {
		data: response,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['wallet', { page: searchParams.get('page') }],
		queryFn: () =>
			getUserStocks(
				userToken!,
				searchParams.get('search'),
				searchParams.get('page'),
				'10'
			),
		retry: 1,
		staleTime: 3000,
	});
	return (
		<DashboardLayout>
			<BreadCrumbs currentPage='Wallet' />
			<section className='space-y-5'>
				<SearchBar />
				<WalletContent
					data={response?.data}
					isError={isError}
					isLoading={isLoading || !response}
				/>
				{response && <Pagination totalRecords={response.count} />}
			</section>
		</DashboardLayout>
	);
};

export default Wallet;

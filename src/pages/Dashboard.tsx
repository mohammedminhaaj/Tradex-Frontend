import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../store/AuthProvider';
import { useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import PortfolioWrapper from '../components/dashboard/PortfolioWrapper';
import AllStocks from '../components/dashboard/AllStocks';

const Dashboard: React.FC = () => {
	const { userToken } = useAuthContext(); // Get user token
	useEffect(() => {
		document.title = 'Dashboard | TradeX';
	}, []); // Set page title
	if (!userToken) {
		// Redirect if the user is not available
		return <Navigate to='/login' replace={true} />;
	}

	return (
		<DashboardLayout>
			<div className='grid grid-cols-1 grid-rows-2 gap-5 md:grid-cols-3 md:grid-rows-4'>
				{/* Passing AllStocks as child to maintain the grid order */}
				<PortfolioWrapper>
					<AllStocks />
				</PortfolioWrapper>
			</div>
		</DashboardLayout>
	);
};

export default Dashboard;

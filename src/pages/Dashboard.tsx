import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../store/AuthProvider';
import { useEffect } from 'react';

const Dashboard: React.FC = () => {
	const { userToken } = useAuthContext();
	useEffect(() => {
		document.title = 'Dashboard | TradeX';
	}, []);
	if (!userToken) {
		return <Navigate to='/login' replace={true} />;
	}

	return <h2>This is a dashboard screen</h2>;
};

export default Dashboard;

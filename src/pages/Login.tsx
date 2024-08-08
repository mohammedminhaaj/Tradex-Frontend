import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../store/AuthProvider';
import { useEffect } from 'react';
import LoginLayout from '../layout/LoginLayout';
import LoginForm from '../components/forms/LoginForm';

const Login: React.FC = () => {
	const { userToken } = useAuthContext();
	useEffect(() => {
		document.title = 'Login | TradeX';
	}, []);

	if (userToken) {
		return <Navigate to='/dashboard' replace={true} />;
	}

	return (
		<LoginLayout>
			<h1 className='text-center text-3xl font-extrabold text-secondary'>
				Login
			</h1>
			<h2 className='text-center text-sm font-extralight'>
				Please login using your credentials
			</h2>
			<LoginForm />
		</LoginLayout>
	);
};

export default Login;

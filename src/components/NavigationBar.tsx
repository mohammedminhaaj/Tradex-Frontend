import { LogOut } from 'lucide-react';
import Logo from './Logo';
import { useAuthContext } from '../store/AuthProvider';

const LogoutButton: React.FC = () => {
	const { logout } = useAuthContext();
	return (
		<button
			onClick={logout}
			type='button'
			title='logout'
			className='primary-button text-xs md:text-sm'>
			<LogOut size={15} className='inline' /> Logout
		</button>
	);
};

const NavigationBar: React.FC = () => {
	return (
		<header className='w-full fixed top-0 z-10 shadow-sm'>
			<nav className='bg-white backdrop-blur-sm bg-opacity-10 flex justify-between items-center p-3 md:p-5'>
				<Logo />
				<LogoutButton />
			</nav>
		</header>
	);
};

export default NavigationBar;

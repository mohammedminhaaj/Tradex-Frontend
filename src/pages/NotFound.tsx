import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
	return (
		<div className='flex flex-col gap-5 items-center justify-center h-screen w-full'>
			<h2 className='text-5xl font-bold text-violet-500'>Not Found!</h2>
			<h3>The page you are looking for cannot be located</h3>
			<Link
				to={'/'}
				className='primary-button'>
				<Home className='inline' /> Home
			</Link>
		</div>
	);
};

export default NotFound;

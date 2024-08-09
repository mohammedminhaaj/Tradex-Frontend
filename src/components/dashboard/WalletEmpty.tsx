import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const WalletEmpty: React.FC = () => {
	return (
		<div className='w-full flex flex-col gap-3 justify-center items-center mx-auto'>
			<h3 className='text-lg md:text-xl'>Wallet Empty</h3>
			<Link
				to={'dashboard/browse'}
				className='primary-button text-xs md:text-sm'>
				<TrendingUp className='size-4 inline' /> Start Trading
			</Link>
		</div>
	);
};

export default WalletEmpty;

import { XCircle } from 'lucide-react';

const ErrorText: React.FC = () => {
	return (
		<p className='text-xs md:text-sm text-red-500'>
			<XCircle className='size-4 inline' /> Something went wrong
		</p>
	);
};

export default ErrorText;

import { Loader2 } from 'lucide-react';
import Modal from '../Modal';
import { useQuery } from '@tanstack/react-query';
import { getStocks } from '../../lib/stock_helper';
import { useAuthContext } from '../../store/AuthProvider';
import LineChart from '../charts/LineChart';
import ActionGroup from './ActionGroup';
import ColoredValue from '../ColoredValue';

type StockDetailsType = {
	name: string;
	latestPrice: number;
	quantity?: number | undefined;
	disableSell?: boolean | undefined;
	toggleDetailsModal: () => void;
};

const StockDetails: React.FC<StockDetailsType> = ({
	name,
	latestPrice,
	quantity,
	disableSell,
	toggleDetailsModal,
}: StockDetailsType) => {
	const { userToken } = useAuthContext(); // Get the user auth token
	const {
		data: response,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['stockDetails', { name }], // We don't want to cache results if the name changes
		queryFn: () =>
			getStocks(userToken!, `/api/stock/details/?name=${name}`),
		retry: 1,
		staleTime: 3000,
	});

	// Helper function to get the previous price of the stock
	// This is useful to display the increase or decrease percentage right next to the stock price
	const getPreviousPrice: () => string | undefined = () => {
		if (response && response.data) {
			if (response.data.length >= 2) {
				return response.data[response.data.length - 2].price;
			}
		}
	};

	// Using the helper function to calculate the percentage gain/loss
	const calculatePercentage = () => {
		const previousPrice = getPreviousPrice();
		if (previousPrice) {
			const formattedPreviousPrice = parseFloat(previousPrice);
			const percentage =
				((latestPrice - formattedPreviousPrice) /
					formattedPreviousPrice) *
				100;
			return percentage;
		}
		return 0;
	};

	// Get the percentage
	const percentage = calculatePercentage();

	return (
		<Modal title={name} onClose={toggleDetailsModal}>
			<LineChart
				data={response?.data}
				isLoading={isLoading}
				isError={isError}
			/>
			<h2 className='text-gray-500 text-lg'>{name}</h2>
			<h4
				title='Current Price'
				className='text-3xl font-bold text-violet-500'>
				&pound; {latestPrice.toFixed(2)}{' '}
				{isLoading ? (
					<Loader2 className='animate-spin size-4' />
				) : (
					!!percentage && (
						<span className='text-xs'>
							<ColoredValue
								value={percentage}
								includePercentage
							/>
						</span>
					)
				)}
			</h4>
			{/* Only display the quantity if its available */}
			{quantity && (
				<h4 className='text-xs'>
					Available Quantity:{' '}
					<span className='text-violet-500 font-bold'>
						{quantity}
					</span>
				</h4>
			)}

			<footer className='mt-5 flex gap-5 justify-between items-center'>
				<ActionGroup
					isLoading={isLoading}
					name={name}
					quantity={quantity}
					disableSell={disableSell}
					toggleDetailsModal={toggleDetailsModal}
				/>
			</footer>
		</Modal>
	);
};

export default StockDetails;

import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import StockDetails from './StockDetails';
import ColoredValue from '../ColoredValue';

type PortfolioRecordType = {
	latestPrice: string;
	investedAmount: string;
	name: string;
	quantity: number;
};

const PortfolioRecord: React.FC<PortfolioRecordType> = ({
	name,
	latestPrice,
	investedAmount,
	quantity,
}: PortfolioRecordType) => {
	// State management to handle stock details modal
	const [toggleModal, setToggleModal] = useState<boolean>(false);
	// Converting the latest price to floating point value
	const formattedLatestPrice: number = parseFloat(latestPrice);
	// Converting the invested amount to floating point value
	const formattedInvestedAmount: number = parseFloat(investedAmount);
	// Calculating the total value for the current stock
	const totalValue: number = formattedLatestPrice * quantity;
	// Calculating the gain/loss for the current stock 
	const profitPercentage =
		((formattedLatestPrice * quantity - formattedInvestedAmount) /
			formattedInvestedAmount) *
		100;

	// Helper function to handle the modal state
	const toggleDetailsModal = () => {
		setToggleModal((prev: boolean) => !prev);
	};

	return (
		<>
			<tr
				tabIndex={0}
				role='button'
				onClick={toggleDetailsModal}
				title='Open Portfolio Details'
				className='font-light group cursor-pointer'>
				<td className='font-bold p-2 rounded-tl-xl rounded-bl-xl bg-violet-50 group-hover:bg-violet-100 transition-colors duration-300'>
					{name}
				</td>
				<td className='bg-violet-50 group-hover:bg-violet-100 transition-colors duration-300'>
					&pound; {formattedLatestPrice.toFixed(2)}
				</td>
				<td className='bg-violet-50 group-hover:bg-violet-100 transition-colors duration-300'>
					&pound; {totalValue.toFixed(2)}
				</td>
				<td className='bg-violet-50 group-hover:bg-violet-100 transition-colors duration-300'>
					&pound; {formattedInvestedAmount.toFixed(2)}
				</td>
				<td className='bg-violet-50 rounded-tr-xl rounded-br-xl group-hover:bg-violet-100 transition-colors duration-300'>
					<ColoredValue value={profitPercentage} includePercentage />
				</td>
			</tr>
			{/* Render modal if toggleModal is set to true */}
			<AnimatePresence>
				{toggleModal && (
					<StockDetails
						name={name}
						toggleDetailsModal={toggleDetailsModal}
						latestPrice={formattedLatestPrice}
						quantity={quantity}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default PortfolioRecord;

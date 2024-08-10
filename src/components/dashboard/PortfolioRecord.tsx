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
	const [toggleModal, setToggleModal] = useState<boolean>(false);
	const formattedLatestPrice: number = parseFloat(latestPrice);
	const formattedInvestedAmount: number = parseFloat(investedAmount);
	const totalValue: number = formattedLatestPrice * quantity;
	const profitPercentage =
		((formattedLatestPrice * quantity - formattedInvestedAmount) /
			formattedInvestedAmount) *
		100;

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
				<td className='bg-violet-50 rounded-tr-xl rounded-br-xl group-hover:bg-violet-100 transition-colors duration-300'>
					<ColoredValue value={profitPercentage} includePercentage />
				</td>
			</tr>
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

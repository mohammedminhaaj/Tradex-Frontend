import { AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useState } from 'react';
import StockDetails from './StockDetails';

type PortfolioRecordType = {
	latestPrice: string;
	ownedPrice: string;
	name: string;
	quantity: number;
};

const PortfolioRecord: React.FC<PortfolioRecordType> = ({
	name,
	latestPrice,
	ownedPrice,
	quantity,
}: PortfolioRecordType) => {
	const [toggleModal, setToggleModal] = useState<boolean>(false);
	const formattedLatestPrice: number = parseFloat(latestPrice);
	const formattedOwnedPrice: number = parseFloat(ownedPrice);
	const totalValue: number = formattedLatestPrice * quantity;
	const profitPercentage =
		((formattedLatestPrice - formattedOwnedPrice) / formattedOwnedPrice) *
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
					&pound; {formattedLatestPrice}
				</td>
				<td className='bg-violet-50 group-hover:bg-violet-100 transition-colors duration-300'>
					&pound; {totalValue}
				</td>
				<td
					className={`bg-violet-50 rounded-tr-xl rounded-br-xl group-hover:bg-violet-100 transition-colors duration-300 ${
						profitPercentage < 0
							? 'text-red-500'
							: profitPercentage > 0
							? 'text-green-500'
							: ''
					}`}>
					{profitPercentage.toFixed(2)}%{' '}
					{profitPercentage < 0 ? (
						<ArrowDown className='size-4 inline' />
					) : profitPercentage > 0 ? (
						<ArrowUp className='size-4 inline' />
					) : (
						<></>
					)}
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

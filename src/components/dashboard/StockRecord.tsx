import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import StockDetails from './StockDetails';

type StockRecordType = {
	name: string;
	dateCreated: string;
	price: string;
};

const StockRecord: React.FC<StockRecordType> = ({
	name,
	dateCreated,
	price,
}: StockRecordType) => {
	// Manage state for the stock details modal
	const [toggleModal, setToggleModal] = useState<boolean>(false);
	// Convert the price to floating point
	const formattedPrice = parseFloat(price);
	// Convert the date to Date object
	const formattedDate = new Date(dateCreated);

	// Helper function to toggle the details modal
	const toggleDetailsModal = () => {
		setToggleModal((prev: boolean) => !prev);
	};

	return (
		<>
			<tr
				tabIndex={0}
				role='button'
				onClick={toggleDetailsModal}
				title='Open Stock Details'
				className='font-light group'>
				<td className='font-bold p-2 rounded-tl-xl rounded-bl-xl bg-violet-50 group-hover:bg-violet-100 transition-colors duration-300'>
					{name}
				</td>
				<td className='bg-violet-50 group-hover:bg-violet-100 transition-colors duration-300'>
					{formattedDate.toLocaleString()}
				</td>
				<td className='bg-violet-50 rounded-tr-xl rounded-br-xl group-hover:bg-violet-100 transition-colors duration-300'>
					&pound; {formattedPrice.toFixed(2)}
				</td>
			</tr>
			<AnimatePresence>
				{toggleModal && (
					<StockDetails
						name={name}
						toggleDetailsModal={toggleDetailsModal}
						latestPrice={formattedPrice}
						disableSell // Disable the sell button in the stock details section
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default StockRecord;

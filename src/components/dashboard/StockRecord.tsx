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
	const [toggleModal, setToggleModal] = useState<boolean>(false);
	const formattedPrice = parseFloat(price);
	const formattedDate = new Date(dateCreated);

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
					&pound; {formattedPrice}
				</td>
			</tr>
			<AnimatePresence>
				{toggleModal && (
					<StockDetails
						name={name}
						toggleDetailsModal={toggleDetailsModal}
						latestPrice={formattedPrice}
						disableSell
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default StockRecord;

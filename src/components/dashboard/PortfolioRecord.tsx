import { ArrowDown, ArrowUp } from 'lucide-react';

const PortfolioRecord: React.FC<{
	latestPrice: string;
	ownedPrice: string;
	name: string;
	quantity: number;
}> = ({
	name,
	latestPrice,
	ownedPrice,
	quantity,
}: {
	latestPrice: string;
	ownedPrice: string;
	name: string;
	quantity: number;
}) => {
	const formattedLatestPrice: number = parseFloat(latestPrice);
	const formattedOwnedPrice: number = parseFloat(ownedPrice);
	const totalValue: number = formattedLatestPrice * quantity;
	const profitPercentage =
		((formattedLatestPrice - formattedOwnedPrice) / formattedOwnedPrice) *
		100;

	return (
		<tr className='font-light group'>
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
	);
};

export default PortfolioRecord;

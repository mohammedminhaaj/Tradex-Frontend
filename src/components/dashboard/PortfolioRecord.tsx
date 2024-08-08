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
	const getTotalValue: () => number = () => formattedLatestPrice * quantity;
	const getProfitPercentage: () => number = () => {
		const profit = formattedLatestPrice - formattedOwnedPrice;
		return (profit / formattedOwnedPrice) * 100;
	};
	const profitPercentage = getProfitPercentage();
	return (
		<tr className='transition-colors duration-300 hover:bg-violet-100 font-light'>
			<td className='font-bold'>{name}</td>
			<td>&pound; {formattedLatestPrice}</td>
			<td>&pound; {getTotalValue()}</td>
			<td
				className={
					profitPercentage < 0
						? 'text-red-500'
						: profitPercentage > 0
						? 'text-green-500'
						: ''
				}>
				{profitPercentage}%{' '}
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

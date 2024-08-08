const StockRecord: React.FC<{
	name: string;
	dateCreated: string;
	price: string;
}> = ({
	name,
	dateCreated,
	price,
}: {
	name: string;
	dateCreated: string;
	price: string;
}) => {
	const formattedPrice = parseFloat(price);
	const formattedDate = new Date(dateCreated);
	return (
		<tr className='font-light group'>
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
	);
};

export default StockRecord;

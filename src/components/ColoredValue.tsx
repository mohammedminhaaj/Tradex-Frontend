import { ChevronDown, ChevronUp } from 'lucide-react';

type ColoredValueType = {
	value: number;
	includePercentage?: boolean | undefined;
};

const ColoredValue: React.FC<ColoredValueType> = ({
	value,
	includePercentage,
}: ColoredValueType) => {
	/*
		Component to display colored value along with the icons
	*/
	return (
		<span
			className={`${
				value < 0 ? 'text-red-500' : value > 0 ? 'text-green-500' : ''
			}`}>
			{value.toFixed(2)}
			{includePercentage && '%'}
			{value < 0 ? (
				<ChevronDown className='size-4 inline' />
			) : value > 0 ? (
				<ChevronUp className='size-4 inline' />
			) : (
				<></>
			)}
		</span>
	);
};

export default ColoredValue;

import {
	ResponsiveContainer,
	LineChart as LC,
	XAxis,
	YAxis,
	Tooltip,
	Line,
} from 'recharts';
import { Stock } from '../../lib/types';
import { Loader2 } from 'lucide-react';
import ErrorText from '../ErrorText';

type LineChartType = {
	data: Stock[] | undefined;
	isLoading: boolean;
	isError: boolean;
};

const LineChart: React.FC<LineChartType> = ({
	data,
	isLoading,
	isError,
}: LineChartType) => {
	// Check if the data is still loading
	if (isLoading)
		return <Loader2 className='mx-auto animate-spin text-purple-500' />;

	// Check if the data fetching resulted in any errors
	if (isError) return <ErrorText />;

	// Handle empty data state
	if (!data) return <p className='text-center'>No Data to Load</p>;

	// Format the data
	const formattedData = data.map((stock) => ({
		created_at: new Date(stock.created_at).toLocaleDateString(),
		price: parseFloat(stock.price),
	}));

	return (
		<ResponsiveContainer height={250} width={'90%'} className='text-xs'>
			<LC data={formattedData} tabIndex={-1}>
				<XAxis dataKey='created_at' />
				<YAxis />
				{/* Including tool tip */}
				<Tooltip /> 
				<Line
					type='monotone'
					dataKey='price'
					stroke='rgb(139 92 246)' // Primary color
					strokeWidth={2}
				/>
			</LC>
		</ResponsiveContainer>
	);
};

export default LineChart;

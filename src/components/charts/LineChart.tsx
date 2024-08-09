import {
	ResponsiveContainer,
	LineChart as LC,
	XAxis,
	YAxis,
	Tooltip,
	Line,
} from 'recharts';
import { Stock } from '../../lib/types';
import { Loader2, XCircle } from 'lucide-react';

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
	if (isLoading)
		return <Loader2 className='mx-auto animate-spin text-purple-500' />;
	if (isError)
		return (
			<p className='text-xs md:text-sm text-red-500'>
				<XCircle className='size-4 inline' /> Something went wrong
			</p>
		);
	if (!data) return <p className='text-center'>No Data to Load</p>;

	const formattedData = data.map((stock) => ({
		created_at: new Date(stock.created_at).toLocaleDateString(),
		price: parseFloat(stock.price),
	}));

	return (
		<ResponsiveContainer height={250} width={'90%'} className='text-xs'>
			<LC data={formattedData} tabIndex={-1}>
				<XAxis dataKey='created_at' className='' />
				<YAxis className='' />
				<Tooltip />
				<Line
					type='monotone'
					dataKey='price'
					stroke='rgb(139 92 246)'
					strokeWidth={2}
				/>
			</LC>
		</ResponsiveContainer>
	);
};

export default LineChart;

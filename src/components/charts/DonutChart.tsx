import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { UserStock } from '../../lib/types';

type DonutChartType = {
	data: UserStock[] | undefined;
};

const DonutChart: React.FC<DonutChartType> = ({ data }: DonutChartType) => {
	// Formatting the received data to only have name and value
	const formattedData = data?.map((userStock) => ({
		name: userStock.stock.name,
		value: parseFloat(userStock.latest_price) * userStock.quantity,
	}));

	return (
		<ResponsiveContainer width={'100%'} height={'40%'}>
			<PieChart tabIndex={-1}>
				<Tooltip />
				<Pie
					data={formattedData}
					dataKey='value'
					nameKey='name'
					cx='50%' // Position
					cy='50%'
					innerRadius={60}
					outerRadius={100}
					fill='rgb(139 92 246)' // Primary color
				/>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default DonutChart;

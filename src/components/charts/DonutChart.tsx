import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { UserStock } from '../../lib/types';

const DonutChart: React.FC<{ data: UserStock[] | undefined }> = ({
	data,
}: {
	data: UserStock[] | undefined;
}) => {
	const formattedData = data?.map((userStock) => ({
		name: userStock.stock.name,
		value: parseFloat(userStock.latest_price) * userStock.quantity,
	}));

	return (
		<ResponsiveContainer width={'100%'} height={'40%'}>
			<PieChart>
				<Tooltip />
				<Pie
					data={formattedData}
					dataKey='value'
					nameKey='name'
					cx='50%'
					cy='50%'
					innerRadius={60}
					outerRadius={100}
					fill='rgb(139 92 246)'
				/>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default DonutChart;

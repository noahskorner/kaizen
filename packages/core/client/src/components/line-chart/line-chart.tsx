import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Define the data structure
interface DataPoint {
  date: string;
  value: number;
}

export const LineChart = ({ data }: { data: DataPoint[] }) => {
  return (
    <div className="w-full rounded-lg bg-black p-4 text-white">
      <h2 className="mb-1 text-2xl font-bold">Lululemon</h2>
      <p className="mb-1 text-4xl font-bold">$425.56</p>
      <div className="mb-4 flex items-center">
        <span className="mr-4 text-green-500">+$4.87 (+1.16%) Today</span>
        <span className="text-gray-400">-$0.02 (-0.00%) After Hours</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <RechartsLineChart data={data}>
          <XAxis
            dataKey="date"
            axisLine={false}
            tick={{ fill: '#fff' }}
            className="text-xs"
          />
          <YAxis hide={true} domain={['auto', 'auto']} />
          <Tooltip
            content={<>Hello world</>}
            contentStyle={{ backgroundColor: '#333', border: 'none' }}
            itemStyle={{ color: '#fff' }}></Tooltip>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
      <div className="mt-2 flex justify-between">
        {data.map((point) => (
          <button
            key={point.date}
            className="text-xs text-gray-400 hover:text-white">
            {point.date}
          </button>
        ))}
        <button className="text-xs text-gray-400 hover:text-white">
          Expand
        </button>
      </div>
    </div>
  );
};

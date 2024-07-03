import {
  LineChart as RechartsLineChart,
  Line,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface DataPoint {
  date: string;
  value: number;
}

interface LineChartProps {
  stroke: string;
  data: DataPoint[];
}

export const SimpleLineChart = ({ stroke, data }: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
        <Line
          type="linear"
          dataKey="value"
          stroke={stroke}
          strokeWidth={1}
          dot={false}
          activeDot={false}
        />
        <ReferenceLine
          y={Math.max(...data.map((item) => item.value))}
          stroke="#ccc"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

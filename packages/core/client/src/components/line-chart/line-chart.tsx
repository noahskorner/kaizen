import {
  LineChart as RechartsLineChart,
  Line,
  YAxis,
  Tooltip,
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

export const LineChart = ({ stroke, data }: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
        <YAxis hide={true} domain={['auto', 'auto']} />
        <Tooltip
          animationDuration={0}
          content={({ payload }) => {
            if (payload && payload.length) {
              return (
                <span className="rounded-md bg-neutral-500 px-4 py-2 text-xs text-neutral-50">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(payload[0].value as number)}
                </span>
              );
            }

            // Return empty fragment or any other placeholder when there's no payload
            return <></>;
          }}
          contentStyle={{ backgroundColor: '#333', border: 'none' }}
          itemStyle={{ color: '#fff' }}
        />
        <Line
          type="linear"
          dataKey="value"
          stroke={stroke}
          strokeWidth={2}
          dot={false}
          activeDot={false}
        />
        <ReferenceLine
          y={Math.max(...data.map((item) => item.value))}
          stroke="#333"
          strokeDasharray="3 3"
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

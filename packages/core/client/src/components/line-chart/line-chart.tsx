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
  onTooltipHover: (value: number) => void;
}

export const LineChart = ({ stroke, data, onTooltipHover }: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
        <YAxis hide={true} domain={['auto', 'auto']} />
        <Tooltip
          animationDuration={0}
          position={{ y: 0 }}
          content={({ payload }) => {
            if (payload && payload.length) {
              const value = parseInt(payload[0].payload.value);
              if (!isNaN(value)) {
                onTooltipHover(value);
              }

              return (
                <span className="text-xs text-neutral-300">
                  {new Date(payload[0].payload.date).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }
                  )}
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
          activeDot={{
            stroke: '#000000'
          }}
        />
        <ReferenceLine
          y={data.reduce((acc, item) => acc + item.value, 0) / data.length}
          stroke="#ccc"
          strokeDasharray="3 3"
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

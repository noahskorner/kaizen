import { useState } from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  ResponsiveContainer
} from 'recharts';
import { renderActiveShape } from './render-active-shape';
import { renderShape } from './render-shape';

export interface PieChartProps {
  data: { name: string; value: number }[];
}

export const PieChart = ({ data }: PieChartProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onMouseEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart margin={{ top: 40, right: 40, left: 40, bottom: 40 }}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          inactiveShape={renderShape}
          data={data}
          innerRadius="75%"
          outerRadius="90%"
          className="fill-zinc-600"
          cornerRadius={8}
          paddingAngle={2}
          dataKey="value"
          onMouseEnter={onMouseEnter}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

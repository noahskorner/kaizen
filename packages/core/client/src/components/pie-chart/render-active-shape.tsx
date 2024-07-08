import { Sector } from 'recharts';
import { formatCurrency } from '../../utils/format-currency';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    payload,
    percent,
    value,
    cornerRadius
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        className="fill-neutral-50 font-bold lg:text-4xl">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        cornerRadius={cornerRadius}
        endAngle={endAngle}
        className="fill-green-300"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        cornerRadius={cornerRadius}
        className="fill-green-300"
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        className="stroke-green-300"
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} className="fill-neutral-50" stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        className="fill-neutral-50">{`${formatCurrency(value, 'USD')}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        className="fill-neutral-300 text-sm">
        {`${percent * 100 < 1 ? '<1' : (percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

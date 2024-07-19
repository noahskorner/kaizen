import { Sector } from 'recharts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    cornerRadius
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        cornerRadius={cornerRadius}
        endAngle={endAngle}
        className="fill-zinc-500"
      />
    </g>
  );
};

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './donut-chart.css';

const HEIGHT = 500;
const WIDTH = 500;
const GAP = 0.02;
const ARC_BORDER_RADIUS = 10;
const COLORS = [
  '#dc2626',
  '#ea580c',
  '#d97706',
  '#ca8a04',
  '#65a30d',
  '#16a34a',
  '#059669',
  '#0d9488',
  '#0891b2',
  '#0284c7',
  '#2563eb',
  '#4f46e5',
  '#7c3aed',
  '#9333ea',
  '#c026d3',
  '#db2777',
  '#e11d48'
];

interface DonutChartProps {
  data: { label: string; value: number }[];
}

export const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove(); // Clear previous chart

      const innerRadius = WIDTH * 0.3;
      const outerRadius = WIDTH * 0.34;
      const colors = d3.shuffle(COLORS);

      const pie = d3
        .pie<{ label: string; value: number }>()
        .value((d) => d.value);

      const arc = d3
        .arc<d3.PieArcDatum<{ label: string; value: number }>>()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .padAngle(GAP)
        .cornerRadius(ARC_BORDER_RADIUS);

      const arcs = svg
        .append('g')
        .attr('transform', `translate(${WIDTH / 2}, ${HEIGHT / 2})`)
        .selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

      arcs
        .append('path')
        .attr('d', arc)
        .attr('fill', (_d, i) => colors[i % colors.length]);
    }
  }, [data]);

  return <svg ref={svgRef} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}></svg>;
};

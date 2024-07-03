import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

interface DataPoint {
  date: string;
  netWorth: number;
}

interface VerticalBarChartProps {
  data: DataPoint[];
}

export const VerticalBarChart = ({ data }: VerticalBarChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.netWorth) as number])
      .nice()
      .range([innerHeight, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    chart
      .append('g')
      .call(yAxis)
      .selectAll('text')
      .attr('font-size', '12px')
      .attr('font-family', 'Inter');

    chart
      .append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll('text')
      .attr('font-size', '12px')
      .attr('font-family', 'Inter')
      .attr('transform', 'rotate(-40)')
      .attr('text-anchor', 'end');

    chart
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.date) as number)
      .attr('y', (d) => y(d.netWorth))
      .attr('width', x.bandwidth())
      .attr('height', (d) => innerHeight - y(d.netWorth))
      .attr('fill', '#4338ca');
  }, [data]);

  return <svg ref={svgRef} width={'100%'} height={'100%'}></svg>;
};

import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface LineGraphProps {
  data: { date: string; value: number }[];
  width: number;
  height: number;
}

export const LineGraph = ({ data, width, height }: LineGraphProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Clear previous content
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.date)) as [Date, Date])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)!])
      .nice()
      .range([innerHeight, 0]);

    const line = d3
      .line<{ date: string; value: number }>()
      .x((d) => x(new Date(d.date)))
      .y((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '-4em')
      .attr('text-anchor', 'end')
      .text('Value');

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .append('text')
      .attr('fill', '#000')
      .attr('y', -6)
      .attr('dy', '2.5em')
      .attr('dx', `${innerWidth / 2}`)
      .attr('text-anchor', 'end')
      .text('Date');

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

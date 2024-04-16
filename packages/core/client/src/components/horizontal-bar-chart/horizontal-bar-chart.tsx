import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export interface Data {
  country: string;
  value: number;
}

export interface HorizontalBarChartProps {
  data: Data[];
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const margin = { top: 20, right: 30, bottom: 40, left: 90 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      const svg = d3
        .select(svgRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // Add X axis
      const x = d3.scaleLinear().domain([0, 13000]).range([0, width]);
      svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end');

      // Y axis
      const y = d3
        .scaleBand()
        .range([0, height])
        .domain(data.map((d) => d.country))
        .padding(0.1);
      svg.append('g').call(d3.axisLeft(y));

      //Bars
      svg
        .selectAll('myRect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', x(0))
        .attr('y', (d) => d.country)
        .attr('width', (d) => d.value)
        .attr('height', y.bandwidth())
        .attr('fill', '#69b3a2');
    }
  }, [data]);

  return <svg ref={svgRef} />;
};

import React, { Component } from 'react'
import * as d3 from 'd3'

export default (node, ads) => {

  const width = 500
      , height = 500

  const svg = d3.select(node)
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .append('g')
    .attr('transform', 'translate(0,0)')
    .selectAll('.ad')
    .data(Object.values(ads))
    .enter()
    .append('circle')
    .attr('class', 'ad-bubble')
    .attr('r', 10)
    .attr('fill', 'turquoise')
    .attr('cx', 100)
    .attr('cy', 300)
    .exit()


  console.log('bubbling', svg, Object.values(ads))

}
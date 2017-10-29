import React, { Component } from 'react'
import {
  scaleLinear, max, select
} from 'd3'

export default class Bubbles extends Component {

  constructor(){
    super()
    this.createBubbles = this.createBubbles.bind(this)
  }

  componentDidMount(){ this.createBubbles() }
  componentDidUpdate(){ this.createBubbles() }
  createBubbles() {
    console.log(this.props.ads)
    const node = this.node
    const dataMax = max(this.props.data)
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]])

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')
    
    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()
    
    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d,i) => i * 25)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25)
  }

  render(){
    console.log(this.props)
    return (
      <svg
        ref={node => this.node = node}
        height={500}
        width={500}
      />
    )
  }

}

// export default (node, ads) => {



//   const svg = d3.select(node)
//     .append('svg')
//     .attr('height', height)
//     .attr('width', width)
//     .append('g')
//     .attr('transform', 'translate(0,0)')
//     .selectAll('.ad')
//     .data(Object.values(ads))
//     .enter()
//     .append('circle')
//     .attr('class', 'ad-bubble')
//     .attr('r', 10)
//     .attr('fill', 'turquoise')
//     .attr('cx', 100)
//     .attr('cy', 300)
//     .exit()


//   console.log('bubbling', svg, Object.values(ads))

// }
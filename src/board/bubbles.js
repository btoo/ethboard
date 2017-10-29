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
    const node = this.node
    
    select(node)
      .selectAll('.ad')
      .data(this.props.ads)
      .enter()
      .append('circle')
      .attr('class', 'ad')
    
    select(node)
      .selectAll('.ad')
      .data(this.props.ads)
      .exit()
      .remove()
    
    select(node)
      .selectAll('.ad')
      .data(this.props.ads)
      .attr('fill', 'turquoise')
      .attr('cx', 100)
      .attr('cy', 300)
      .attr('r', d => d.total)
    
    // ==========================================
    
    // const dataMax = max(this.props.data)
    // const yScale = scaleLinear()
    //   .domain([0, dataMax])
    //   .range([0, this.props.size[1]])
    
    // select(node)
    //   .selectAll('rect')
    //   .data(this.props.data)
    //   .enter()
    //   .append('rect')
    
    // select(node)
    //   .selectAll('rect')
    //   .data(this.props.data)
    //   .exit()
    //   .remove()
    
    // select(node)
    //   .selectAll('rect')
    //   .data(this.props.data)
    //   .style('fill', '#fe9922')
    //   .attr('x', (d,i) => i * 25)
    //   .attr('y', d => this.props.size[1] - yScale(d))
    //   .attr('height', d => yScale(d))
    //   .attr('width', 25)
  }

  render(){
    return (
      <svg
        ref={node => this.node = node}
        height={'100vh'}
        width={'100%'}
      />
    )
  }

}
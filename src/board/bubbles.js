import React, { Component } from 'react'
import {
  scaleLinear,
  max,
  select,
  forceSimulation,
  forceX, forceY, forceCollide
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
    
    const bubbles = select(node)
      .selectAll('.ad')
      .data(this.props.ads)
      .attr('fill', 'turquoise')
      .attr('cx', 100)
      .attr('cy', 300)
      // .attr('r', 88)
      .attr('r', d => d.total / 10)
    
    // for every tick of the d3 clock, run this function
    const ticked = _ => {
      console.log('ticked')
      bubbles
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
    }

    // the simulation is a collection of forces about where we want our circles to go and how we want our circles to interact
    forceSimulation()
      .force('x', forceX(this.props.width / 2).strength(0.05)) // bring to center on x-axis
      .force('y', forceY(this.props.height / 2).strength(0.05)) // bring to center on y-axis
      .force('collide', forceCollide(d => d.total / 10))
      .nodes(this.props.ads)
      .on('tick', ticked)

    
      

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
        // height={'100vh'}
        // width={'100%'}
        height={this.props.height}
        width={this.props.width}
      />
    )
  }

}
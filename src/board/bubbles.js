import React, { Component } from 'react'
import {
  scaleLinear,
  max,
  select,
  forceSimulation,
  forceX, forceY, forceCollide,
  scaleSqrt
} from 'd3'

export default class Bubbles extends Component {

  constructor(){
    super()
    this.createBubbles = this.createBubbles.bind(this)
  }

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
      .attr('cx', this.props.width / 2)
      .attr('cy', this.props.height / 2)
      .attr('r', d => d.total / 10)
      
    // scale radii to fit screen dimensions
    // const radiusScale = scaleSqrt().domain()

    // the simulation is a collection of forces about where we want our circles to go and how we want our circles to interact
    forceSimulation()
      .force('x', forceX(this.props.width / 2).strength(0.05)) // bring to center on x-axis
      .force('y', forceY(this.props.height / 2).strength(0.05)) // bring to center on y-axis
      .force('collide', forceCollide(d => d.total / 10))
      .nodes(this.props.ads)
      .on('tick', _ => { // for every tick of the d3 clock, run this function
        bubbles
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
      })

  }

  componentDidMount(){ this.createBubbles() }
  componentDidUpdate(){ this.createBubbles() }

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
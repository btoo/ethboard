import React, { Component } from 'react'
import {
  scaleLinear,
  max,
  select,
  forceSimulation,
  forceX, forceY, forceCollide,
  scaleSqrt
} from 'd3'

import testImg from 'board/img/test-1.png'

export default class Bubbles extends Component {

  constructor(){
    super()
    this.createBubbles = this.createBubbles.bind(this)
  }

  createBubbles() {
    const bubblesGroup = this.bubblesGroup;
    
    bubblesGroup
      .selectAll(".ad")
      .data(this.props.ads)
      .enter()
      .append("circle")
      .attr("class", "ad");
    
    bubblesGroup
      .selectAll(".ad")
      .data(this.props.ads)
      .exit()
      .remove();
    
    const bubbles = bubblesGroup
      .selectAll(".ad")
      .data(this.props.ads)
      .attr("fill", "turquoise")
      .attr("cx", this.props.width / 2)
      .attr("cy", this.props.height / 2)
      .attr("r", d => d.total / 10)
      .attr('fill', d => `url(#ad-${d.address})`)
      
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
    return <svg className="bubbles" height={this.props.height} width={this.props.width}>
        <defs>
          {this.props.ads.map((ad, i) => (
            <pattern
              key={i}
              id={"ad-" + ad.address}
              height="100%"
              width="100%"
              patternContentUnits="objectBoundingBox"
            >
              <image
                height="1"
                width="1"
                preserveAspectRatio="none"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref={testImg}
              />
            </pattern>
          ))}
        </defs>
        <g className="bubbles--group" ref={node => (this.bubblesGroup = select(node))} />
      </svg>;
  }

}
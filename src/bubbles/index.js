import React, { Component } from 'react'
import {
  scaleLinear,
  max,
  select,
  forceSimulation, drag,
  forceX, forceY, forceCollide,
  scaleSqrt, event
} from 'd3'
import './index.css'

const navBubbleDatum = { adIndex: -1 } // dummy data point for nav bubble
    , forcePosition = d => d.adIndex === -1 ? 1 : 0.1

export default class Bubbles extends Component {

  constructor(props){
    super(props)
    this.createBubbles = this.createBubbles.bind(this)
  }

  createBubbles() {
    const bubblesGroup = this.bubblesGroup
        , data = [...this.props.ads, navBubbleDatum]
        , totalContributions = this.props.ads.reduce((acc, ad) => acc + ad.total, 0)

    // the simulation is a collection of forces about where we want our circles to go and how we want our circles to interact
    const simulation = forceSimulation()
      .force('x', forceX(this.props.width / 2).strength(forcePosition)) // bring to center on x-axis
      .force('y', forceY(this.props.height / 2).strength(forcePosition).y(d => d.adIndex === -1 ? 0 : this.props.height / 2)) // bring to center on y-axis
      .force('collide', forceCollide(d => d.adIndex === -1
        ? this.props.height / 2
        // : (d.total / 10) + 1 // extra 1px spacing
        : (d.total / totalContributions) * (this.props.width / 2) // extra 1px spacing
      ))
      .nodes(data)
      .on('tick', e => { // for every tick of the d3 clock, run this function
        bubblesGroup.selectAll('circle')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
      })

    bubblesGroup.selectAll('.nav--bubble').data(navBubbleDatum).enter()
      .attr('r', '50vh')
      .attr('fill', 'turquoise')

    bubblesGroup.selectAll('.nav--bubble').data(navBubbleDatum).exit().remove()
    
    bubblesGroup.selectAll('.ad').data(data)
      .enter()
      .append('circle')
      .attr('class', d => d.adIndex === -1 ? 'nav--bubble' : 'ad')
      .call(drag()
        .on('start', d => {
          if(!event.active) simulation.alphaTarget(0.3).restart()
          if(d.adIndex !== -1){
            d.fx = d.x
            d.fy = d.y
          }
        })
        .on('drag', d => {
          if(d.adIndex !== -1){
            d.fx = event.x
            d.fy = event.y
          }
        })
        .on('end', d => {
          if(!event.active) simulation.alphaTarget(0)
          if(d.adIndex !== -1){
            d.fx = null
            d.fy = null
          }
        })
      )
    
    bubblesGroup.selectAll('.ad').data(data).exit().remove()
    
    const bubbles = bubblesGroup.selectAll('.ad').data(data)
      .attr('cx', this.props.width / 2)
      .attr('cy', this.props.height / 2)
      // .attr('r', d => d.total / 10)
      .attr('r', d => (d.total / totalContributions) * (this.props.width / 2))
      .attr('fill', d => `url(#ad-${d.address})`)
    
    // scale radii to fit screen dimensions
    // const radiusScale = scaleSqrt().domain()

  }

  componentWillMount(){
    
  }

  componentDidMount(){ this.createBubbles() }
  componentDidUpdate(){ this.createBubbles() }

  render(){
    return (
      <svg className="bubbles" height={this.props.height} width={this.props.width}>
        <defs>
          {this.props.ads.map((ad, i) => (
            <pattern
              key={i}
              id={'ad-' + ad.address}
              height="100%"
              width="100%"
              patternContentUnits="objectBoundingBox"
            >
              <image
                height="1"
                width="1"
                preserveAspectRatio="xMidYMid slice"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref={ad.img}
              />
            </pattern>
          ))}
        </defs>
        <g className="bubbles--group" ref={node => {
            this.bubblesGroup = select(node)
          }} />
      </svg>
    )
  }

}
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

const navBubbleDatum = { navBubble: true } // dummy data point for nav bubble
    , forcePosition = d => d.navBubble ? 1 : 0.1
    , getNavBubbleRadius = _ => document.querySelector('header').clientHeight

export default class Bubbles extends Component {

  constructor(props){
    super(props)
    this.createBubbles = this.createBubbles.bind(this)
  }

  createBubbles() {

    const bubblesGroup = this.bubblesGroup
        , data = [...this.props.ads, navBubbleDatum]
    
    const totalContributions = this.props.ads.reduce((acc, ad) => acc + ad.total, 0)
        , maxRadius = Math.min( // get min of minWidth and minHeight
            (this.props.width / 2) - getNavBubbleRadius(), // minWidth
            this.props.height - getNavBubbleRadius()
          )
        , maxTotalContributionsForAnyOneAd = this.props.ads.length
            ? Math.max(...this.props.ads.map(ad => ad.total))
            : 0
        , getRadius = d => (d.total / maxTotalContributionsForAnyOneAd) * maxRadius / 2

    const boundNode = dimension => d => totalContributions
            ? Math.max(d.r, Math.min(this.props[dimension ? 'width' : 'height'] - d.r, d[dimension ? 'x' : 'y']))
            : this.props[dimension ? 'width' : 'height'] / 2
        , boundNodeVertically = boundNode(false)
        , boundNodeHorizontally = boundNode(true)
    
    // the simulation is a collection of forces about where we want our circles to go and how we want our circles to interact
    const simulation = forceSimulation()
      .force('x', forceX(this.props.width / 2).strength(forcePosition)) // bring to center on x-axis
      .force('y', forceY(this.props.height / 2).strength(forcePosition).y(d => d.navBubble ? 0 : this.props.height / 2)) // bring to center on y-axis
      .force('collide', forceCollide(d => d.navBubble
        ? (this.props.height / 2) + 22
        // : (((d.total / totalContributions) * this.props.width) / 2) + 1 // extra 1px spacing
        : (d.r = getRadius(d))
      ))
      .nodes(data)
      .on('tick', e => { // for every tick of the d3 clock, run this function
        bubblesGroup.selectAll('.ad')
          .attr('cx', boundNodeHorizontally)
          .attr('cy', boundNodeVertically)
      })

    bubblesGroup.selectAll('.nav--bubble').data(navBubbleDatum).enter()
    bubblesGroup.selectAll('.nav--bubble').data(navBubbleDatum).exit().remove()
    
    bubblesGroup.selectAll('.ad').data(data)
      .enter()
      .append('circle')
      .attr('class', d => d.navBubble ? 'nav--bubble' : 'ad')
      .call(drag()
        .on('start', d => {
          if(!event.active) simulation.alphaTarget(0.3).restart()
          if(!d.navBubble){
            d.fx = d.x
            d.fy = d.y
          }
        })
        .on('drag', d => {
          if(!d.navBubble){
            d.fx = event.x
            d.fy = event.y
          }
        })
        .on('end', d => {
          if(!event.active) simulation.alphaTarget(0)
          if(!d.navBubble){
            d.fx = null
            d.fy = null
          }
        })
      )
    
    bubblesGroup.selectAll('.ad').data(data).exit().remove()
    
    const bubbles = bubblesGroup.selectAll('.ad').data(data)
      .attr('cx', this.props.width / 2)
      .attr('cy', this.props.height / 2)
      .attr('r', d => d.r = getRadius(d))
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
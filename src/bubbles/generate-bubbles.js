import store from 'store'
import {
  scaleLinear, min, max,
  forceSimulation, forceX, forceY, forceCollide,
  easeCubic, transition, interpolateNumber
} from 'd3'
import { focusBubble } from './focus-bubble'
import handleDrag from './handle-drag'

export const navBubbleRadius = 210 // = 420/2

const generateNavBubbleDatum = bubbles => ({ // dummy data point for nav bubble
  navBubble: true,
  fixed: true,
  fx: bubbles.props.width / 2, // fix x position of nav bubble
  fy: bubbles.props.height / 2 // fix y position of nav bubble
})

export default bubbles => {
  
  const navBubbleDatum = generateNavBubbleDatum(bubbles)
      , bubblesGroup = bubbles.bubblesGroup
      , data = [...bubbles.props.ads, navBubbleDatum] // include dummy navBubble datum in data array
  
  const totalContributions = bubbles.props.ads.reduce((acc, ad) => acc + ad.total, 0)
      , maxRadius = Math.max(
          Math.min( // min of minWidth and minHeight = maxDiameter
            (bubbles.props.width / 2) - navBubbleRadius, // minWidth
            (bubbles.props.height / 2) - navBubbleRadius // minHeight
          ) / 2, // radius = diameter / 2
          22 // disallow max radius smaller than 22
        )
      , arrayOfContributionTotals = bubbles.props.ads.map(ad => ad.total)
      , radiusScale = scaleLinear()
          .domain([min(arrayOfContributionTotals), max(arrayOfContributionTotals)]) // domain consists of min and max inputs (ads' total contributions)
          .range([8, maxRadius]) // range consists of min and max outputs (rendered bubble radii)
      , generateCollideRadius = d => d.navBubble ? navBubbleRadius : (d.r = radiusScale(d.total)) + 1 // extra 1px spacing between bubbles

  const boundNode = dimension => d => totalContributions
          ? Math.max(d.r, Math.min(bubbles.props[dimension ? 'width' : 'height'] - d.r, d[dimension ? 'x' : 'y']))
          : bubbles.props[dimension ? 'width' : 'height'] / 2
      , boundNodeVertically = boundNode(false)
      , boundNodeHorizontally = boundNode(true)
  
  // the simulation is a collection of forces about where we want our circles to go and how we want our circles to interact
  const simulation = forceSimulation()
    .force('x', forceX(bubbles.props.width / 2).strength(0.1)) // bring to center on x-axis
    .force('y', forceY(bubbles.props.height / 2).strength(0.1)) // bring to center on y-axis
    .force('collide', forceCollide(generateCollideRadius))
    .nodes(data)
    .on('tick', e => { // for every tick of the d3 clock, run bubbles function
      navBubble
        .attr('cx', d => d.x = d.fx = (bubbles.props.width / 2))
        .attr('cy', d => d.y = d.fy = (bubbles.props.height / 2))

      bubblesGroup.selectAll('.ad')
        .attr('cx', boundNodeHorizontally)
        .attr('cy', boundNodeVertically)
    })

  const navBubble = bubblesGroup.selectAll('.nav--bubble')
  navBubble.data([navBubbleDatum]).enter()
  navBubble.data([navBubbleDatum]).exit().remove()
  
  bubblesGroup.selectAll('.ad').data(data)
    .enter()
    .append('circle')
    .attr('class', d => d.navBubble ? 'nav--bubble' : 'ad')
    .on('click', focusBubble({bubbles, radiusScale}))
    .call(handleDrag(simulation))
  
  bubblesGroup.selectAll('.ad').data(data)
    .exit()
    .remove()
  
  bubblesGroup.selectAll('.ad').data(data)
    .attr('cx', bubbles.props.width / 2)
    .attr('cy', bubbles.props.height / 2)
    .attr('r', d => d.r = radiusScale(d.total))
    .attr('fill', d => `url(#ad-${d.address})`)

}
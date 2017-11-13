import {
  select,
  scaleLinear, min, max,
  forceSimulation, drag,
  forceX, forceY, forceCollide,
  event, easeCubic, transition, interpolateNumber
} from 'd3'

const forcePositionStrength = d => d.navBubble ? 1 : 0.1
    , navBubbleRadius = 210 // = 420/2

const generateNavBubbleDatum = bubbles => ({ // dummy data point for nav bubble
  navBubble: true,
  fixed: true,
  fx: bubbles.props.width / 2, // fix x position of nav bubble
  fy: bubbles.props.height / 2 // fix y position of nav bubble
})

export default bubbles => {
  
  const navBubbleDatum = generateNavBubbleDatum(bubbles)
      , bubblesGroup = bubbles.bubblesGroup
      , data = [...bubbles.props.ads, navBubbleDatum]
  
  const totalContributions = bubbles.props.ads.reduce((acc, ad) => acc + ad.total, 0)
      , maxRadius = Math.max(
          Math.min( // min of minWidth and minHeight = maxDiameter
            (bubbles.props.width / 2) - navBubbleRadius, // minWidth
            (bubbles.props.height / 2) - navBubbleRadius // minHeight
          ) / 2, // radius = diameter / 2
          22 // disallow radius smaller than 22
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
    .force('x', forceX(bubbles.props.width / 2).strength(forcePositionStrength)) // bring to center on x-axis
    .force('y', forceY(bubbles.props.height / 2).strength(forcePositionStrength)) // bring to center on y-axis
    .force('collide', forceCollide(generateCollideRadius))
    .nodes(data)
    .on('tick', e => { // for every tick of the d3 clock, run bubbles function
      bubblesGroup.selectAll('.ad')
        .attr('cx', boundNodeHorizontally)
        .attr('cy', boundNodeVertically)
    })

  bubblesGroup.selectAll('.nav--bubble').data([navBubbleDatum]).enter()
  bubblesGroup.selectAll('.nav--bubble').data([navBubbleDatum]).exit().remove()
  
  bubblesGroup.selectAll('.ad').data(data)
    .enter()
    .append('circle')
    .attr('class', d => d.navBubble ? 'nav--bubble' : 'ad')
    .on('click', (d, i, nodes) => {
      
      const interpolateX = interpolateNumber(d.x, bubbles.props.width / 2)
          , interpolateY = interpolateNumber(d.y, bubbles.props.height / 2)
          , interpolateR = interpolateNumber(d.r, navBubbleRadius)

      select(nodes[i])
        .transition()
        .duration(222)
        .attrTween('cx', d => t => d.x = interpolateX(t))
        .attrTween('cy', d => t => d.y = interpolateY(t))
        .attrTween('r', d => t => {
          const newRadius = interpolateR(t)
          simulation.force('collide', forceCollide(d => d.adIndex === i ? newRadius : generateCollideRadius(d)))
          return d.r = newRadius
        })
        .on('end', d => {
          simulation.alphaTarget(0.3).restart()
          d.fx = d.x
          d.fy = d.y
          simulation.alphaTarget(0)
        })
      
    })
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
  
  bubblesGroup.selectAll('.ad').data(data)
    .exit()
    .remove()
  
  bubblesGroup.selectAll('.ad').data(data)
    .attr('cx', bubbles.props.width / 2)
    .attr('cy', bubbles.props.height / 2)
    .attr('r', d => d.r = radiusScale(d.total))
    .attr('fill', d => `url(#ad-${d.address})`)

}
import {
  scaleLinear,
  min, max,
  forceSimulation, drag,
  forceX, forceY, forceCollide,
  event
} from 'd3'

const navBubbleDatum = { navBubble: true } // dummy data point for nav bubble
    , forcePosition = d => d.navBubble ? 1 : 0.1
    , getNavBubbleRadius = _ => document.querySelector('header').clientHeight


export default bubbles => {
  
  const bubblesGroup = bubbles.bubblesGroup
        , data = [...bubbles.props.ads, navBubbleDatum]
    
    const totalContributions = bubbles.props.ads.reduce((acc, ad) => acc + ad.total, 0)
        , maxRadius = Math.min( // min of minWidth and minHeight = maxDiameter
            (bubbles.props.width / 2) - getNavBubbleRadius(), // minWidth
            bubbles.props.height - getNavBubbleRadius() // minHeight
          ) / 2 // radius = diameter / 2
        , arrayOfContributionTotals = bubbles.props.ads.map(ad => ad.total)
        , radiusScale = scaleLinear()
            .domain([min(arrayOfContributionTotals), max(arrayOfContributionTotals)]) // domain consists of min and max inputs (ads' total contributions)
            .range([8, maxRadius]) // range consists of min and max outputs (rendered bubble radii)
    
    const boundNode = dimension => d => totalContributions
            ? Math.max(d.r, Math.min(bubbles.props[dimension ? 'width' : 'height'] - d.r, d[dimension ? 'x' : 'y']))
            : bubbles.props[dimension ? 'width' : 'height'] / 2
        , boundNodeVertically = boundNode(false)
        , boundNodeHorizontally = boundNode(true)
    
    // the simulation is a collection of forces about where we want our circles to go and how we want our circles to interact
    const simulation = forceSimulation()
      .force('x', forceX(bubbles.props.width / 2).strength(forcePosition)) // bring to center on x-axis
      .force('y', forceY(bubbles.props.height / 2).strength(forcePosition).y(d => d.navBubble ? 0 : bubbles.props.height / 2)) // bring to center on y-axis
      .force('collide', forceCollide(d => d.navBubble
        ? (bubbles.props.height / 2) + 22
        : (d.r = radiusScale(d.total)) + 1 // extra 1px spacing between bubbles
      ))
      .nodes(data)
      .on('tick', e => { // for every tick of the d3 clock, run bubbles function
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
    
    bubblesGroup.selectAll('.ad').data(data)
      .exit()
      .remove()
    
    bubblesGroup.selectAll('.ad').data(data)
      .attr('cx', bubbles.props.width / 2)
      .attr('cy', bubbles.props.height / 2)
      .attr('r', d => d.r = radiusScale(d.total))
      .attr('fill', d => `url(#ad-${d.address})`)

}
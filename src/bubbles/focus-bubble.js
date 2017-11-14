import store from 'store'
import { focusAd, unfocusAd } from 'board/actions'
import { select, interpolateNumber, forceCollide } from 'd3'

export const interpolateRadiiAndUpdateForceSimulation = ({simulation, interpolateR, interpolateRBack, radiusScale, newlyFocusedAd, alreadyFocusedAd,}) => isNewlyFocused => d => t => {

  const interpolatedRadiusForNewlyFocusedAd = interpolateR(t)
      , interpolatedRadiusForPreviouslyFocusedAd = interpolateRBack(t)

  simulation.force('collide', forceCollide(d => {
    if(d.adIndex === newlyFocusedAd.adIndex) {
      return d.r = interpolatedRadiusForNewlyFocusedAd
    }
    else if(d.adIndex === alreadyFocusedAd.adIndex) {
      return d.r = interpolatedRadiusForPreviouslyFocusedAd
    }
    else if(d.navBubble) {
      return d.r = 0
    }
    else {
      return d.r = radiusScale(d.total)
    }
  }))
  
  return d.r = isNewlyFocused ? interpolatedRadiusForNewlyFocusedAd : interpolatedRadiusForPreviouslyFocusedAd

}

export const unfocusBubble = ({bubbles, navBubbleRadius, nodes, alreadyFocusedAd, iRAUFS}) => d => {

  if (alreadyFocusedAd) {
    const interpolateXBack = interpolateNumber(bubbles.props.width / 2, alreadyFocusedAd.originalX)
        , interpolateYBack = interpolateNumber(bubbles.props.height / 2, alreadyFocusedAd.originalY)

    select(nodes[alreadyFocusedAd.adIndex])
      .transition()
      .duration(222)
      .attrTween('cx', d => t => (d.x = interpolateXBack(t)))
      .attrTween('cy', d => t => (d.y = interpolateYBack(t)))
      .attrTween('r', iRAUFS(false))
      .on('end', d => {
        d.fx = null
        d.fy = null
      })
  }
  store.dispatch(unfocusAd())
  store.dispatch(focusAd(d))

}

export const focusBubble = ({bubbles, radiusScale, navBubbleRadius, simulation}) => (d, i, nodes) => {
      
  // save these for later, when the ad bubble is eventually unfocused and needs to return to its original position
  d.originalX = d.x
  d.originalY = d.y
  d.originalR = d.r

  const newlyFocusedAd = d
      , alreadyFocusedAd = store.getState().board.focusedAd

  const interpolateX = interpolateNumber(d.x, bubbles.props.width / 2)
      , interpolateY = interpolateNumber(d.y, bubbles.props.height / 2)
      , interpolateR = interpolateNumber(d.r, navBubbleRadius)
      , interpolateRBack = interpolateNumber(navBubbleRadius, alreadyFocusedAd.originalR)

  const iRAUFS = interpolateRadiiAndUpdateForceSimulation({simulation, interpolateR, interpolateRBack, radiusScale, newlyFocusedAd, alreadyFocusedAd})

  select(nodes[i]).transition().duration(222)
    .attrTween('cx', d => t => d.x = interpolateX(t))
    .attrTween('cy', d => t => d.y = interpolateY(t))
    .attrTween('r', iRAUFS(true))
    .on('start', unfocusBubble({bubbles, navBubbleRadius, nodes, alreadyFocusedAd, iRAUFS}))
    .on('end', d => {
      d.fx = d.x
      d.fy = d.y
    })
  
}
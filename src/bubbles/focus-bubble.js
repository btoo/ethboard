import { select, interpolateNumber, forceCollide } from 'd3'
import store from 'store'
import { focusAd, unfocusAd } from 'board/actions'
import { navBubbleRadius } from './generate-bubbles'
import { interpolate } from 'd3-interpolate';

const getAlreadyFocusedAd = _ => store.getState().board.focusedAd

const interpolateRadiiAndUpdateForceSimulation = ({simulation, interpolateR, interpolateRBack, radiusScale, newlyFocusedAd, alreadyFocusedAd}) => isNewlyFocused => d => t => {

  alreadyFocusedAd = alreadyFocusedAd && alreadyFocusedAd.adIndex >= 0 ? alreadyFocusedAd : getAlreadyFocusedAd()
  const interpolatedRadiusForNewlyFocusedAd = interpolateR(t)
      , interpolatedRadiusForPreviouslyFocusedAd = typeof interpolateRBack === 'function' ? interpolateRBack(t) : d.originalR

  simulation.force('collide', forceCollide(d => {
    if(d.adIndex === newlyFocusedAd.adIndex) {
      return d.r = interpolatedRadiusForNewlyFocusedAd
    }
    else if(d.adIndex === alreadyFocusedAd.adIndex) {
      return d.r = interpolatedRadiusForPreviouslyFocusedAd
    }
    else if(d.navBubble) {
      return d.r = navBubbleRadius
    }
    else {
      return d.r = radiusScale(d.total)
    }
  }))
  
  return d.r = isNewlyFocused ? interpolatedRadiusForNewlyFocusedAd : interpolatedRadiusForPreviouslyFocusedAd
}


export const unfocusBubble = ({bubbles, nodes, iRAUFS,
  simulation, interpolateR, radiusScale, newlyFocusedAd // these parameters are only required if and the iRAUFS fn was not provided
}) => d => {

  const alreadyFocusedAd = getAlreadyFocusedAd()
  if (alreadyFocusedAd.adIndex >= 0) {

    iRAUFS = iRAUFS || interpolateRadiiAndUpdateForceSimulation({simulation, interpolateR, radiusScale, newlyFocusedAd, alreadyFocusedAd})

    const interpolateXBack = interpolateNumber(bubbles.props.width / 2, alreadyFocusedAd.originalX)
        , interpolateYBack = interpolateNumber(bubbles.props.height / 2, alreadyFocusedAd.originalY)
        , interpolateRBack = interpolateNumber(navBubbleRadius, alreadyFocusedAd.originalR)

    select(nodes[alreadyFocusedAd.adIndex])
      .transition()
      .duration(88)
      .attrTween('cx', d => t => (d.x = interpolateXBack(t)))
      .attrTween('cy', d => t => (d.y = interpolateYBack(t)))
      // .attrTween('r', iRAUFS(false))
      .attrTween('r', d => t => (d.r = interpolateRBack(t)))
      .on('end', d => {
        d.fx = null
        d.fy = null
        store.dispatch(unfocusAd()) // update the focusedAd to the dummy
        bubbles.bubblesBackground.on('click', null) // remove the background's handler for unfocusing
      })
  }

}


export const focusBubble = ({bubbles, radiusScale, simulation}) => (d, i, nodes) => {
      
  const newlyFocusedAd = d
  
  // save these for later, when the ad bubble is eventually unfocused and needs to return to its original position
  newlyFocusedAd.originalX = newlyFocusedAd.x
  newlyFocusedAd.originalY = newlyFocusedAd.y
  newlyFocusedAd.originalR = newlyFocusedAd.r

  const interpolateX = interpolateNumber(newlyFocusedAd.x, bubbles.props.width / 2)
      , interpolateY = interpolateNumber(newlyFocusedAd.y, bubbles.props.height / 2)
      , interpolateR = interpolateNumber(newlyFocusedAd.r, navBubbleRadius)

  const iRAUFS = interpolateRadiiAndUpdateForceSimulation({simulation, interpolateR, radiusScale, newlyFocusedAd})
      , bubbleUnfocuser = unfocusBubble({bubbles, nodes, iRAUFS})

  select(nodes[i]).transition().duration(222)
    .attrTween('cx', d => t => d.x = interpolateX(t))
    .attrTween('cy', d => t => d.y = interpolateY(t))
    .attrTween('r', d => t => d.r = interpolateR(t))
    .on('start', bubbleUnfocuser)
    .on('end', d => {
      d.fx = d.x
      d.fy = d.y
      store.dispatch(focusAd(newlyFocusedAd)) // update the focusedAd to te clicked ad data
      bubbles.bubblesBackground.on('click', bubbleUnfocuser)// attach a click handler to the bg to unfocus the ad when clicked on
    })
  
}
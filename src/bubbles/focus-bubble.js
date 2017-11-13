import store from 'store'
import { focusAd, unfocusAd } from 'board/actions'
import { select, interpolateNumber, forceCollide } from 'd3'


export const unfocusBubble = ({bubbles, navBubbleRadius, nodes, simulation, generateCollideRadius}) => d => {

  const alreadyFocusedAd = store.getState().board.focusedAd
  if (alreadyFocusedAd) {
    const interpolateXBack = interpolateNumber(bubbles.props.width / 2, alreadyFocusedAd.originalX),
      interpolateYBack = interpolateNumber(bubbles.props.height / 2, alreadyFocusedAd.originalY),
      interpolateRBack = interpolateNumber(navBubbleRadius, alreadyFocusedAd.originalR)

    select(nodes[alreadyFocusedAd.adIndex])
      .transition()
      .duration(222)
      .attrTween('cx', d => t => (d.x = interpolateXBack(t)))
      .attrTween('cy', d => t => (d.y = interpolateYBack(t)))
      .attrTween('r', d => t => {
        const newRadius = interpolateRBack(t)
        simulation.force('collide', forceCollide(d => (d.adIndex === alreadyFocusedAd.adIndex ? newRadius : generateCollideRadius(d))))
        return (d.r = newRadius)
      })
      .on('end', d => {
        d.fx = null
        d.fy = null
      })
  }
  store.dispatch(unfocusAd())
  store.dispatch(focusAd(d))

}
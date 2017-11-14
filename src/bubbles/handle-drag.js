import { drag, event } from 'd3'

const dragStart = simulation => d => {
  if (!event.active) simulation.alphaTarget(0.3).restart()
  if (!d.navBubble) {
    d.fx = d.x
    d.fy = d.y
  }
}

const dragDuring = d => {
  if (!d.navBubble) {
    d.fx = event.x
    d.fy = event.y
  }
}

const dragEnd = simulation => d => {
  if (!event.active) simulation.alphaTarget(0)
  if (!d.navBubble) {
    d.fx = null
    d.fy = null
  }
}

export default simulation => drag()
  .on('start', dragStart(simulation))
  .on('drag', dragDuring)
  .on('end', dragEnd(simulation))
  
import store from 'store'

export const GET_DIMENSIONS = 'GET_DIMENSIONS'
const getDimensions = (height, width) => ({
  type: GET_DIMENSIONS,
  height, width
})

export const updateDimensions = _ => store.dispatch(getDimensions(window.innerHeight, window.innerWidth))

window.addEventListener('resize', updateDimensions)
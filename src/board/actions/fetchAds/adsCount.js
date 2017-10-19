export const REQUEST_ADS_COUNT = 'REQUEST_ADS_COUNT'
const requestAdsCount = _ => ({
  type: REQUEST_ADS_COUNT
})

export const RECEIVE_ADS_COUNT = 'RECEIVE_ADS_COUNT'
const receiveAdsCount = adsCount => {
  return {
    type: RECEIVE_ADS_COUNT,
    adsCount
  }
}

export const INVALIDATE_ADS_COUNT = 'INVALIDATE_ADS_COUNT'
const invalidateAdsCount = error => {
  return {
    type: INVALIDATE_ADS_COUNT,
    error
  }
}

const shouldFetchAdsCount = state => {
  if(!state.board.adsCount) return true
  else if(state.board.fetchingAdsCount) return false
  else return state.board.fetchAdsCountError
}

export const fetchAdsCountIfNeeded = boardContract => async (dispatch, getState) => {
  if(shouldFetchAdsCount(getState())){
    dispatch(requestAdsCount())
    try {
      return dispatch(receiveAdsCount(
        (await boardContract.getAdsCount.call()).toNumber()
      ))
    } catch(error) {
      return dispatch(invalidateAdsCount(error))
    }
  } else {
    return Promise.resolve('adsCount fetchin not needed')
  }
}
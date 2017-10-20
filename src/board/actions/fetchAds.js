import Ad from 'contracts/Ad.sol'

export const REQUEST_ADS = 'REQUEST_ADS'
const requestAds = _ => ({
  type: REQUEST_ADS
})

export const RECEIVE_ADS = 'RECEIVE_ADS'
const receiveAds = ads => {
  return {
    type: RECEIVE_ADS,
    ads
  }
}

export const INVALIDATE_ADS = 'INVALIDATE_ADS'
const invalidateAds = error => {
  return {
    type: INVALIDATE_ADS,
    error
  }
}

const shouldFetchAds = state => state.board.adsCount !== state.board.ads.length

export const fetchAdsIfNeeded = boardContract => async (dispatch, getState) => {
  
  const state = getState()
      , { toAscii } = state.app.web3
  
  if(shouldFetchAds(state)){
    dispatch(requestAds())
    try {

      const adsCount = (await boardContract.getAdsCount.call()).toNumber()

      const ads = await Promise.all([...Array(adsCount).keys()].map(
        async adIndex => {
          const address = await state.board.boardContract.getAdAddress.call(adIndex)
              , contract = Ad.at(address)
              , [
                  titleHex, imgHex, hrefHex, totalBigNumber
                ] = await contract.getState.call()
              , title = toAscii(titleHex)
              , img = toAscii(imgHex)
              , href = toAscii(hrefHex)
              , total = totalBigNumber.toNumber()
  
          return { address, contract, adIndex, title, img, href, total }
        }
      ))
  
      return dispatch(receiveAds(ads))
    } catch(error) {
      return dispatch(invalidateAds(error))
    }

  } else {
    return Promise.resolve('ads fetchin not needed')
  }
}
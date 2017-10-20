import Ad from 'contracts/Ad.sol'
import { constructAdFromIndex } from 'ad/util'

export const SEND_AD = 'SEND_AD'
const sendAd = _ => ({
  type: SEND_AD
})

export const AD_DELIVERED = 'AD_DELIVERED'
const adDelivered = postedAd => {
  return {
    type: AD_DELIVERED,
    postedAd
  }
}

export const INVALIDATE_AD_DELIVERY = 'INVALIDATE_AD_DELIVERY'
const invalidateAdDelivery = error => {
  return {
    type: INVALIDATE_AD_DELIVERY,
    error
  }
}

export const postAd = (web3, txObj, boardContract, ads, {title, img, href, contribution}) => async dispatch => {
  
  dispatch(sendAd())
  try {
    await boardContract.postAd(
      title,
      img,
      href,
      {
        ...txObj,
        value: contribution
      }
    )

    const postedAd = await constructAdFromIndex(web3, boardContract)(ads.length)
    dispatch(adDelivered(postedAd))

  } catch(error) {
    return dispatch(invalidateAdDelivery(error))
  }

}
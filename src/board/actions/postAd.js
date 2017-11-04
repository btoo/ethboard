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

export const postAd = (web3, txObj, boardContract, postedAdIndex, {title, img, href, contribution}) => async dispatch => {
  
  dispatch(sendAd())
  try {

    // var result = web3.eth.estimateGas({
    //   to: '0xc4abd0339eb8d57087278718986382264244252f',
    //   data:
    //     '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    // })
    // console.log(result)

    await boardContract.postAd(
      title,
      img,
      href,
      {
        ...txObj,
        value: contribution
      }
    )

    const postedAd = await constructAdFromIndex(web3, boardContract)(postedAdIndex)
    dispatch(adDelivered(postedAd))

  } catch(error) {
    return dispatch(invalidateAdDelivery(error))
  }

}
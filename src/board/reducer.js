import Bo from 'contracts/Bo.test'
console.log('the', Bo())

import Board from 'contracts/Board.sol'
import {
  REQUEST_ADS,
  RECEIVE_ADS,
  INVALIDATE_ADS,
  SEND_AD,
  AD_DELIVERED,
  INVALIDATE_AD_DELIVERY
} from './actions'

const boardAddress = '0x4afad1cae9cf3872198530c78e1fc31d54d1c0e7'
    , boardContract = Board.at(boardAddress)

// console.log(boardContract.AdPosted)
// boardContract.allEvents().watch((error, result) => {
//   console.log('evented')
//   console.log(error, result)
//   // if (!error)
//   //     console.log(result);
// })

export default (state = {
  boardAddress,
  boardContract,
  fetchingAdsCount: false,
  fetchAdsCountError: null,
  adsCount: null,
  fetchingAds: false,
  fetchAdsError: null,
  ads: []
}, action) => {

  switch (action.type){
    
    case REQUEST_ADS: return {
      ...state,
      fetchingAds: true
    }

    case RECEIVE_ADS: return {
      ...state,
      fetchingAds: false,
      ads: action.ads
    }

    case INVALIDATE_ADS: return {
      ...state,
      fetchingAds: false,
      fetchAdsError: action.error
    }

    case SEND_AD: return {
      ...state,
      postingAd: true
    }

    case AD_DELIVERED: return {
      ...state,
      postingAd: false,
      ads: {
        ...state.ads,
        [action.postedAd.address]: action.postedAd
      }
    }

    case INVALIDATE_AD_DELIVERY: return {
      ...state,
      postingAd: false,
      postAdError: action.error
    }

    default: return state
    
  }
  
}
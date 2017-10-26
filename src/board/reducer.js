import Board from 'contracts/Board.sol'

import {
  REQUEST_ADS,
  RECEIVE_ADS,
  INVALIDATE_ADS,
  SEND_AD,
  AD_DELIVERED,
  INVALIDATE_AD_DELIVERY
} from './actions'

const boardAddress = '0x6181123dcc7d86e95c4e34aa369a5a6977bfe0f9'
    , boardContract = Board.at(boardAddress)

// console.log(boardContract.AdPosted) // works
// boardContract.AdPosted((error, result) => console.log(error, result)) // doesnt work

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
import Board from 'contracts/Board.sol'
import {
  REQUEST_ADS_COUNT,
  RECEIVE_ADS_COUNT,
  INVALIDATE_ADS_COUNT,
  REQUEST_ADS,
  RECEIVE_ADS,
  INVALIDATE_ADS
} from './actions'

const boardAddress = '0x58e0635d3c3dcaefc002d602a4d1489ab860b46d'

export default (state = {
  boardAddress,
  boardContract: Board.at(boardAddress),
  fetchingAdsCount: false,
  fetchAdsCountError: null,
  adsCount: null,
  fetchingAds: false,
  fetchAdsError: null,
  ads: [],
}, action) => {

  switch (action.type){

    case REQUEST_ADS_COUNT: return {
      ...state,
      fetchingAdsCount: true
    }

    case RECEIVE_ADS_COUNT: return {
      ...state,
      fetchingAdsCount: false,
      adsCount: action.adsCount
    }

    case INVALIDATE_ADS_COUNT: return {
      ...state,
      fetchingAdsCount: false,
      fetchAdsCountError: action.error
    }

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

    default: return state
    
  }
  
}
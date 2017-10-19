import Board from 'contracts/Board.sol'
import {
  REQUEST_ADS_COUNT,
  RECEIVE_ADS_COUNT,
  INVALIDATE_ADS_COUNT,
  POST_NEW_AD
} from './actions'

const boardAddress = '0xff45ccd2a0dfb7da3f2812e643ddb101fca1bae9'

export default (state = {
  boardAddress,
  boardContract: Board.at(boardAddress),
  fetchingAdsCount: false,
  fetchAdsCountError: null,
  adsCount: 0,
  ads: {}
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

    case POST_NEW_AD: return {
      ...state,
      
    }

    default: return state
  }
  
}
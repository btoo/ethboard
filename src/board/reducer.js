import Board from 'contracts/Board.sol'
import {
  SEND_BOARD,
  BOARD_DELIVERED,
  INVALIDATE_BOARD_DELIVERY,
  REQUEST_ADS,
  RECEIVE_ADS,
  INVALIDATE_ADS,
  SEND_AD,
  AD_DELIVERED,
  INVALIDATE_AD_DELIVERY
} from './actions'
import { web3 } from 'app/reducer'
import { isAddress } from 'ethereum-address'

const initBoardAddress = '0x5ede10a2182686530b9e5f85b03e12eb2c5a8377'
    // , boardAddress = web3.utils.isAddress(initBoardAddress) && web3.eth.getCode(initBoardAddress)  // web3 1.0.0 hasnt been released yet
    , boardAddress = isAddress(initBoardAddress) && web3.eth.getCode(initBoardAddress)
        ? initBoardAddress
        : ''

// console.log(boardContract.AdPosted) // works
// boardContract.AdPosted((error, result) => console.log(error, result)) // doesnt work

export default (state = {
  boardContract: initBoardAddress ? Board.at(initBoardAddress) : null,
  fetchingAdsCount: false,
  fetchAdsCountError: null,
  fetchingAds: false,
  fetchAdsError: null,
  ads: [],
  height: window.innerHeight,
  width: window.innerWidth
}, action) => {
  
  switch (action.type){
    
    case SEND_BOARD: return {
      ...state,
      creatingBoard: true
    }

    case BOARD_DELIVERED:
      return {
        ...state,
        creatingBoard: false,
        boardContract: action.boardContract
      }

    case INVALIDATE_BOARD_DELIVERY: return {
      ...state,
      creatingBoard: false,
      createBoardError: action.error
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

    case SEND_AD: return {
      ...state,
      postingAd: true
    }

    case AD_DELIVERED:

      const postedAd = action.postedAd
      const updatedAds = Object.assign([],
        state.ads,
        {[postedAd.address]: postedAd}
      )
      updatedAds.push(postedAd)

      return {
        ...state,
        postingAd: false,
        ads: updatedAds
      }

    case INVALIDATE_AD_DELIVERY: return {
      ...state,
      postingAd: false,
      postAdError: action.error
    }

    default: return state
    
  }
  
}
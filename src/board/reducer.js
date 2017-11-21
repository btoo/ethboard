import Board from 'contracts/Board.sol'
import {
  SEND_BOARD, BOARD_DELIVERED, INVALIDATE_BOARD_DELIVERY,
  REQUEST_ADS, RECEIVE_ADS, INVALIDATE_ADS,
  SEND_AD, AD_DELIVERED, INVALIDATE_AD_DELIVERY,
  FOCUS_AD, UNFOCUS_AD
} from './actions'
import { web3 } from 'app/reducer'
import { isAddress } from 'ethereum-address'

// const boardAddress = web3.utils.isAddress(initBoardAddress) && web3.eth.getCode(initBoardAddress)  // web3 1.0.0 hasnt been released yet
let boardAddress = '0x8fce4a3305c6ff17ab345bfb5fba0b7b252cd707'
try { if(!isAddress(boardAddress) || (web3.eth.getCode(boardAddress) === '0x0'))  // metamask doesnt support getCode without a callback, so use a try-catch
  boardAddress = ''
} catch(e) {
  console.error(e)
  boardAddress = ''
}

// console.log(boardContract.AdPosted) // works
// boardContract.AdPosted((error, result) => console.log(error, result)) // doesnt work

const dummyFocusedAd = { adIndex: -1, originalR: 0 }

export default (state = {
  boardContract: boardAddress ? Board.at(boardAddress) : null,
  fetchingAdsCount: false,
  fetchAdsCountError: null,
  fetchingAds: false,
  fetchAdsError: null,
  ads: [],
  height: window.innerHeight,
  width: window.innerWidth,
  focusedAd: dummyFocusedAd
}, action) => {
  
  switch (action.type){
    
    case SEND_BOARD: return {
      ...state,
      creatingBoard: true
    }

    case BOARD_DELIVERED: return {
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

    case FOCUS_AD: return {
      ...state,
      focusedAd: action.focusedAd
    }

    case UNFOCUS_AD: return {
      ...state,
      focusedAd: dummyFocusedAd
    }

    default: return state
    
  }
  
}
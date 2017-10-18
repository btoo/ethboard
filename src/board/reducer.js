import {
  REQUEST_BOARD_CONTRACT,
  RECEIVE_BOARD_CONTRACT,
  POST_NEW_AD
} from './actions'

export default (state = {
  boardAddress: "0xfbe6c062c3c45e5ee8b0af892190919f77ab5ae7",
  boardContract: null,
  fetchingBoardContract: false,
  fetchedBoardContract: false,
  fetchBoardError: null,
  adsCount: 0,
  ads: []
}, action) => {

  switch (action.type){

    case REQUEST_BOARD_CONTRACT: return {
      ...state,
      fetchingBoardContract: true
    }

    case RECEIVE_BOARD_CONTRACT: return {
      ...state,
      fetchingBoardContract: false,
      boardContract: action.boardContract,
      adsCount: action.adsCount
    }

    case POST_NEW_AD: return {
      ...state,
      
    }

    default: return state
  }
  
}
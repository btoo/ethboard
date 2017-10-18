import {
  REQUEST_BOARD_CONTRACT,
  RECEIVE_BOARD_CONTRACT
} from './actions'

export default (state = {
  boardAddress: "0x191372551f0911ecd4694f2be63af3378e7da83b",
  boardContract: null,
  fetchingBoardContract: false,
  fetchedBoardContract: false,
  fetchBoardError: null,
  adsCount: 0
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
    default: return state
  }
  
}
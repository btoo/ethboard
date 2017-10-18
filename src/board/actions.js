import Board from 'contracts/Board.sol'

export const REQUEST_BOARD_CONTRACT = 'REQUEST_BOARD_CONTRACT'
const requestBoardContract = boardAddress => ({
  type: REQUEST_BOARD_CONTRACT,
  boardAddress
})

export const RECEIVE_BOARD_CONTRACT = 'RECEIVE_BOARD_CONTRACT'
const receiveBoardContract = ({boardAddress, boardContract, adsCount}) => {
  return {
    type: RECEIVE_BOARD_CONTRACT,
    boardAddress,
    boardContract,
    adsCount
  }
}

export const fetchBoardContract = boardAddress => async dispatch => {
  dispatch(requestBoardContract(boardAddress))
  const boardContract = await Board.at(boardAddress)
  dispatch(receiveBoardContract({
    boardAddress,
    boardContract,
    adsCount: (await boardContract.getAdsCount()).toNumber()
  }))
}



const shouldFetchBoardContract = (state, boardAddress) => {
  console.log(state)
  // const posts = state.postsBySubreddit[boardAddress]
  // if (!posts) {
  //   return true
  // } else if (posts.isFetching) {
  //   return false
  // } else {
  //   return posts.didInvalidate
  // }
}
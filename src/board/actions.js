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



export const POST_NEW_AD = 'POST_NEW_AD'

export const postNewAd = (txObj, boardContract) => ({title, img, href, contribution}) => async dispatch => {

  // dispatch()

  const posted = await boardContract.postAd(
    `test title`,
    `test img`,
    `test href`,
    {
      ...txObj,
      value: contribution
    }
  )

  console.log(posted)

}

// `test title #${oldAdsLength + 1}`,
// `test img #${oldAdsLength + 1}`,
// `test href #${oldAdsLength + 1}`,
// {from: '0x6e23ef9c592916902334648a886972759c5dd908', value: 88}
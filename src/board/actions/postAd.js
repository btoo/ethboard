export const postAd = ({title, img, href, contribution}) => async (dispatch, getState) => {
  
  const state = getState()

  const posted = await state.board.boardContract.postAd(
    title,
    img,
    href,
    {
      ...state.app.txObj,
      value: contribution
    }
  )

  console.log(posted)

}
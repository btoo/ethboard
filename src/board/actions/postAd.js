export const postAd = (txObj, boardContract) => ({title, img, href, contribution}) => async dispatch => {
  
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
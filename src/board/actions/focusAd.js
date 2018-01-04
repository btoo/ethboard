export const FOCUS_AD = 'FOCUS_AD'
export const focusAd = focusedAd => ({
  type: FOCUS_AD,
  focusedAd
})

export const UNFOCUS_AD = 'UNFOCUS_AD'
export const unfocusAd = _ => ({
  type: UNFOCUS_AD
})
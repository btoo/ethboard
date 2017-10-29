import Ad from 'contracts/Ad.sol'

export const constructAdFromIndex = (web3, boardContract) => async adIndex => {
  const { toAscii } = web3
      , address = await boardContract.getAdAddress.call(adIndex)
      , contract = Ad.at(address)
      , [
          titleHex, imgHex, hrefHex, totalBigNumber
        ] = await contract.getState.call()
      , title = toAscii(titleHex)
      , img = toAscii(imgHex)
      , href = toAscii(hrefHex)
      , total = totalBigNumber.toNumber()
  
  return { address, contract, adIndex, title, img, href, total }
}
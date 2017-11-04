import Ad from 'contracts/Ad.sol'

export const constructAdFromIndex = (web3, boardContract) => async adIndex => {
  const address = await boardContract.getAdAddress.call(adIndex)
      , contract = Ad.at(address)
      , [
          title, img, href, totalBigNumber
        ] = await contract.getState.call()
      , total = totalBigNumber.toNumber()
  
  return { address, contract, adIndex, title, img, href, total }
}
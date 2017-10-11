const {
        eth
      } = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    , abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
    , VotingContract = eth.contract(abi)


// the "at" address is deployedContract.address in rpc.js
const contractInstance = VotingContract.at('0x428d7b29e52eca7d40d8448a9cd58485c94bdcb8')
    , candidates = {
        Rama: 'candidate-1',
        Nick: 'candidate-2',
        Jose: 'candidate-3'
      }

const voteForCandidate = _ => {
  const candidateName = $("#candidate").val();
  contractInstance.voteForCandidate(candidateName, {from: eth.accounts[0]}, _ => {
    let div_id = candidates[candidateName]
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString())
  })
}

$(document).ready(_ => {
  // Object.keys(candidates).map(candidate => {
  //   let val = contractInstance.totalVotesFor.call(candidate).toString()
  //   $("#" + candidates[candidate]).html(val)
  // })

  console.log('ready')
  console.log(
    contractInstance
      // .viewIPC.call().toString()
  )


})
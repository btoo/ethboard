const fs = require('fs')
    , Web3 = require('web3')
    , web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
    , code = fs.readFileSync('Board.sol').toString()
    , solc = require('solc')
    , compiledCode = solc.compile(code)
    , abiDefinition = JSON.parse(compiledCode.contracts[':Board'].interface)
    , BoardContract = web3.eth.contract(abiDefinition)
    

const data = compiledCode.contracts[':Board'].bytecode
    , from = web3.eth.accounts[0] // deploy the contract from the first test account
    , gas = 4700000 // the from address is paying the gas (just some estimate)

console.log('from: ', from)
BoardContract.new(
  'test post', // passed into solidity code's Board constructor
  { data, from, gas },
  (err, deployedContract) => { if(deployedContract.address) {

    const contractInstance = BoardContract.at(deployedContract.address)
    console.log(contractInstance.viewIPC.call())
    // console.log(contractInstance.viewOPAddress())
    // console.log(contractInstance.viewInitalPostContent)

  }}
)


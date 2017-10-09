const fs = require('fs')
    , Web3 = require('web3')
    , web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
    , code = fs.readFileSync('Voting.sol').toString()
    , solc = require('solc')
    , compiledCode = solc.compile(code)
    , abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
    , VotingContract = web3.eth.contract(abiDefinition)

const data = compiledCode.contracts[':Voting'].bytecode
    , from = web3.eth.accounts[0] // deploy the contract from the first test account
    , gas = 4700000 // the from address is paying the gas (just some estimate)

VotingContract.new(
  [ // passed into solidity code's Voting constructor
    'candidate1',
    'candidate2',
    'candidate3'
  ],
  { data, from, gas },
  (err, deployedContract) => { if(deployedContract.address) {

    const contractInstance = VotingContract.at(deployedContract.address)
    
    const fromBalance = web3.eth.getBalance(from)
    console.log(
      // fromBalance
      web3.fromWei(fromBalance)
    )

  }}
)


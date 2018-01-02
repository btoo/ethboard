var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib)
  // deployer.autolink() // autolink has been deprecated - https://github.com/trufflesuite/truffle-deployer/commit/52e63189453e078f64b84aa3a50a2c7991b022b4
  deployer.link(ConvertLib, MetaCoin)
  deployer.deploy(MetaCoin)
}

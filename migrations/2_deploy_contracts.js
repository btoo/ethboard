module.exports = deployer => {
  deployer.deploy(ConvertLib)
  deployer.autolink()
  deployer.deploy(MetaCoin)
}

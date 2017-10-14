pragma solidity ^0.4.8;

// import "./Contribution.sol";

contract Ad {

  address owner;

  address publisher;
  bytes32 title;
  bytes32 img;
  bytes32 href;
  uint total;
  // Contribution[] contributions;

  function Ad(bytes32 newAdTitle, bytes32 newAdImg, bytes32 newAdHref, uint contribution) {
    publisher = tx.origin;
    title = newAdTitle;
    img = newAdImg;
    href = newAdHref;
    total = contribution;
  }

  function getTotalContributions() constant returns (uint) {
    return total;
  }

  function addContribution(uint contribution) {
    owner.transfer(contribution);
    total += contribution;
  }

}

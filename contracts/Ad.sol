pragma solidity ^0.4.8;
// pragma solidity ^0.4.8;

// import "./Contribution.sol";

contract Ad {

  address owner; // owner of billboard

  address publisher; // make private?
  bytes32 title;
  bytes32 img;
  bytes32 href;
  uint256 total;
  // Contribution[] contributions;

  function Ad(address newAdOwner, bytes32 newAdTitle, bytes32 newAdImg, bytes32 newAdHref, uint256 contribution) {
    owner = newAdOwner;
    publisher = tx.origin;
    title = newAdTitle;
    img = newAdImg;
    href = newAdHref;
    total = contribution;
  }

  function getState() constant returns (bytes32 adTitle, bytes32 adImg, bytes32 adHref, uint256 adTotal) {
    adTitle = title;
    adImg = img;
    adHref = href;
    adTotal = total;
  }

  function addContribution() payable returns (uint256) {
    if (!owner.send(msg.value)) {
      throw;
    }
    total += msg.value;
    return total;
  }

}

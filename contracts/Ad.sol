// pragma solidity ^0.4.17;
pragma solidity ^0.4.8;

// import "./Contribution.sol";

contract Ad {

  address owner; // owner of billboard

  address publisher; // make private?
  string title;
  string img;
  string href;
  uint256 total;
  // Contribution[] contributions;

  function Ad(address newAdOwner, string newAdTitle, string newAdImg, string newAdHref, uint256 contribution) {
    owner = newAdOwner;
    publisher = tx.origin;
    title = newAdTitle;
    img = newAdImg;
    href = newAdHref;
    total = contribution;
  }

  function getState() constant returns (string adTitle, string adImg, string adHref, uint256 adTotal) {
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

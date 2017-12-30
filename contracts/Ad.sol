// pragma solidity ^0.4.17;
pragma solidity ^0.4.8;

// import "./Board.sol";
// import "./Contribution.sol";

contract Ad {

  address owner; // owner of billboard
  // Board billboard;

  address publisher; // make private?
  string title;
  string img;
  string href;
  uint256 total;
  // Contribution[] contributions;

  function Ad(address newAdOwner, /* address billboardAddress, */ string newAdTitle, string newAdImg, string newAdHref, uint256 contribution) {
    owner = newAdOwner;
    // billboard = Board(billboardAddress);
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

  // @TODO: should added contributions go to the owner of the ad or the owner of the billboard? ill make it go to the owner of the billboard for now heheh
  function addContribution() payable returns (uint256) {
    if (!owner.send(msg.value)) {
      throw;
    }
    total += msg.value;
  }

}

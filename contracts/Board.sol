pragma solidity ^0.4.18;
// pragma solidity ^0.4.8;

import "./Ad.sol";

// we may be able to modify this so that ALL ad related data is kept inside the ad contract
// and the only data being stored here is the list of ad ADDRESSES
contract Board {

  address owner;
  Ad[] ads; // storing as array instead because returning a mapping is impractical
  // mapping(address => Ad) adSpaces;

  function Board(/* string initAdTitle, string initAdImg, string initAdHref */) public payable {
    owner = msg.sender;
  }

  // event AdPosted(
  //   address indexed postedAdAddress,
  //   uint indexed postedAdIndex,
  //   bytes32 postedAdTitle,
  //   bytes32 postedAdImg,
  //   bytes32 postedAdHref
  // );

  function postAd(string postedAdTitle, string postedAdImg, string postedAdHref) public payable returns (address) {
    require(!owner.send(msg.value));
    ads.push(new Ad(owner, postedAdTitle, postedAdImg, postedAdHref, msg.value));
    return address(ads[ads.length - 1]);
  }

  function getAdsCount() view public returns (uint) {
    return ads.length;
  }

  modifier published (uint index) {
    if (index >= 0 && index <= ads.length - 1) {
      _;
    }
  }

  function getAdAddress(uint index) constant public published(index) returns (address ad) {
    return address(ads[index]);
  }

  function getOwner() constant public returns (address) {
    return owner;
  }

}

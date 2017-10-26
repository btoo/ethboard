pragma solidity ^0.4.15;

import "./Ad.sol";

// we may be able to modify this so that ALL ad related data is kept inside the ad contract
// and the only data being stored here is the list of ad ADDRESSES
contract Board {

  address owner;
  // address[] ads;
  Ad[] ads;
  // mapping(address => Ad) adSpaces;

  function Board(bytes32 initAdTitle, bytes32 initAdImg, bytes32 initAdHref, uint256 contribution) {
    owner = msg.sender;
    ads.push(new Ad(owner, initAdTitle, initAdImg, initAdHref, contribution));
  }

  // event AdPosted(
  //   address indexed postedAdAddress,
  //   uint indexed postedAdIndex,
  //   bytes32 postedAdTitle,
  //   bytes32 postedAdImg,
  //   bytes32 postedAdHref
  // );

  function postAd(bytes32 postedAdTitle, bytes32 postedAdImg, bytes32 postedAdHref) payable returns (address) {
    if (!owner.send(msg.value)) {
      throw;
    }
    ads.push(new Ad(owner, postedAdTitle, postedAdImg, postedAdHref, msg.value));
    // adSpaces[address(ads[ads.length - 1])] = ads[ads.length - 1];
    // AdPosted( // events arent working atm.. like why
    //   address(ads[ads.length - 1]),
    //   ads.length - 1,
    //   postedAdTitle,
    //   postedAdImg,
    //   postedAdHref
    // );
    return address(ads[ads.length - 1]);
  }

  function getAdsCount() constant returns (uint) {
    return ads.length;
  }

  modifier published (uint index) {
    if (index >= 0 && index <= ads.length - 1) {
      _;
    }
  }

  function getAdAddress(uint index) published(index) returns (address ad) {
    return address(ads[index]);
  }

  function getOwner() returns (address) {
    return owner;
  }

}

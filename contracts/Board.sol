// pragma solidity ^0.4.11; // wtf m8 - Error: Source file requires different compiler version (current compiler is 0.4.8+commit.60cc1668.Emscripten.clang - note that nightly builds are considered to be strictly less than the released version
pragma solidity ^0.4.8;

import "./Ad.sol";

contract Board {

  address owner;
  Ad[] ads;
  mapping(address => Ad) adSpaces;

  function Board(bytes32 initAdTitle, bytes32 initAdImg, bytes32 initAdHref, uint256 contribution) {
    owner = msg.sender;
    ads.push(new Ad(owner, initAdTitle, initAdImg, initAdHref, contribution));
  }
  
  function postAd(bytes32 newAdTitle, bytes32 newAdImg, bytes32 newAdHref/* , uint256 contribution */) payable returns (address) {
    if (!owner.send(msg.value)) {
      throw;
    }
    ads.push(new Ad(owner, newAdTitle, newAdImg, newAdHref, msg.value));
    adSpaces[address(ads[ads.length - 1])] = ads[ads.length - 1];
    return address(ads[ads.length - 1]);
  }

  // function postAd(bytes32 newAdTitle, bytes32 newAdImg, bytes32 newAdHref) returns (bool) {
  //   ads.push(Ad({
  //     advertiser: msg.sender,
  //     title: newAdTitle,
  //     img: newAdImg,
  //     href: newAdHref
  //   }));
  //   return true;
  // }

  function getAdsLength() constant returns (uint) {
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

  // // @TODO: make address private
  // function getAd(uint index) returns (address advertiser, bytes32 title, bytes32 img, bytes32 href) {
  //   if (index > ads.length - 1) {
  //     advertiser = msg.sender;
  //     title = "asdf";
  //     img = "asdf";
  //     href = "asdf";
  //   } else {
  //     advertiser = ads[index].advertiser;
  //     title = ads[index].title;
  //     img = ads[index].img;
  //     href = ads[index].href;
  //   }
  // }

}

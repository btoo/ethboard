pragma solidity ^0.4.8;

import "./Ad.sol";

contract Board {

  address owner;
  Ad[] ads;
  mapping(address => Ad) adSpaces;

  function Board(bytes32 initAdTitle, bytes32 initAdImg, bytes32 initAdHref, uint contribution) {
    owner = msg.sender;
    ads.push(new Ad(initAdTitle, initAdImg, initAdHref, contribution));
  }
  
  function postAd(bytes32 newAdTitle, bytes32 newAdImg, bytes32 newAdHref, uint contribution) returns (address) {
    owner.transfer(contribution);
    ads.push(new Ad(newAdTitle, newAdImg, newAdHref, contribution));
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

pragma solidity ^0.4.8;

contract Board {

  // original poster (the poster of the very first post)
  // address public op;

  // struct Member {
  //   Post[] posts;
  //   address memberAddress;
  // }

  // struct Post {
  //   bytes32 content;
  //   address poster;
  // }

  // Post[] posts;

  // mapping(address => Member) public members;

  // function viewOPAddress() public constant returns(address memberAddress) {
  //   return members[op].memberAddress;
  // }

  // function viewInitalPostContent() public constant returns(bytes32 initalPostContent) {
  //   return posts[0].content;
  // }

  // function new Post(){

  // }
    
  // function viewParticipants() constant returns (bytes32[] participants) {

  // }

  // function viewIPC() public constant returns(bytes32) {
  //     // return initPostContent;
  // }

  // bytes32 public initPostContent;

  struct Ad {
    address advertiser;
    bytes32 text;
    bytes32 url;
  }

  Ad[] ads;

  function getAdsLength() constant returns (uint) {
    return ads.length;
  }

  function getAd(uint index) returns (address advertiser, bytes32 text, bytes32 url) {
    if (index > ads.length - 1) {
      advertiser = msg.sender;
      text = "asdf";
      url = "asdf";
    } else {
      advertiser = ads[index].advertiser;
      text = ads[index].text;
      url = ads[index].url;
    }
  }

  // function Board(bytes32 ipc) public {
  //   initPostContent = ipc;
  function Board(bytes32 initAdText, bytes32 initAdUrl) public {

    ads.push(Ad({
      advertiser: msg.sender,
      text: initAdText,
      url: initAdUrl
    }));

    // op = msg.sender;
    // members[op]

    // Post memory initialPost = Post({
    //   content: initPostContent,
    //   poster: op
    // });

    // posts.push(initialPost);
    
    // members[op] = Member({
    //   posts: posts,
    //   memberAddress: op
    // });
    
  }

  // /* mapping field below is equivalent to an associative array or hash.
  // The key of the mapping is candidate name stored as type bytes32 and value is
  // an unsigned integer to store the vote count
  // */
  
  // mapping (bytes32 => uint8) public votesReceived;
  
  // /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  // We will use an array of bytes32 instead to store the list of candidates
  // */
  
  // bytes32[] public candidateList;

  // /* This is the constructor which will be called once when you
  // deploy the contract to the blockchain. When we deploy the contract,
  // we will pass an array of candidates who will be contesting in the election
  // */
  // function Voting(bytes32[] candidateNames) {
  //   candidateList = candidateNames;
  // }

  // // This function returns the total votes a candidate has received so far
  // function totalVotesFor(bytes32 candidate) returns (uint8) {
  //   if (validCandidate(candidate) == false) {
  //     revert();
  //   }
  //   return votesReceived[candidate];
  // }

  // // This function increments the vote count for the specified candidate. This
  // // is equivalent to casting a vote
  // function voteForCandidate(bytes32 candidate) {
  //   if (validCandidate(candidate) == false) {
  //     revert();
  //   }
    
  //   votesReceived[candidate] += 1;
  // }

  // function validCandidate(bytes32 candidate) returns (bool) {
  //   for (uint i = 0; i < candidateList.length; i++) {
  //     if (candidateList[i] == candidate) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }


}

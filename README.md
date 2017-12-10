## ** wip **

# EthBoard

EthBoard is an online billboard hosted on the Ethereum Virtual Machine. The billboard is a free-for-all space in which the amount of ETH that a publisher contributes to post an advertisement will yield a larger percentage of the client's browser window real-estate.

To get your own EthBoard running locally, first install ethereum's testrpc and run it:
```bash
npm i -g ethereumjs-testrpc
testrpc
```

Then install EthBoard's dependencies:
```bash
yarn
```

Finally, start the development server, using the first of `testrpc`'s ten test accounts as your own:
```bash
yarn start
```

* You can also use [MetaMask](https://metamask.io/) to test publishing advertisements from different accounts/nodes.
# EthBoard

EthBoard is an online billboard hosted on the Ethereum Virtual Machine.

To get your own EthBoard running locally, first install ethereum's testrpc and run it:
```
npm install -g ethereumjs-testrpc
testrpc
```

Then install EthBoard's dependencies:
```
yarn
```

Finally, start the development server, using the first of `testrpc`'s ten test accounts as your own:
```
yarn start
```
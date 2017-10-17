import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import store from '../store'
import Web3 from 'web3'
import './index.css'

import AccountListContainer from 'components/AccountList/AccountListContainer'
import BoardContainer from 'board'

window.addEventListener('load', _ => render(
  <Provider store={store}>
    <BoardContainer />
    {/* <BoardContainer web3={web3Provided} /> */}
    {/* <AccountListContainer web3={this.props.web3} /> */}
  </Provider>,
  document.getElementById('app')
))
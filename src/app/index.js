import React, { Component } from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducer'
import Web3 from 'web3'
import './index.css'

import AccountListContainer from 'components/AccountList/AccountListContainer'
import BoardContainer from 'board'

let store = createStore(reducer)

window.addEventListener('load', _ => {                    
  
  render(
    <Provider store={store}>
      <div className="App">
        <BoardContainer />
        {/* <BoardContainer web3={web3Provided} /> */}
        {/* <AccountListContainer web3={this.props.web3} /> */}
      </div>
    </Provider>,
    document.getElementById('app')
  )

})
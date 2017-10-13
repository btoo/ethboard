import React, { Component } from 'react'
import './App.css'

import AccountListContainer from 'components/AccountList/AccountListContainer'
import BoardContainer from 'components/BoardContainer'

class App extends Component {
  render () {
    return (
      <div className="App">
        <BoardContainer web3={this.props.web3} />
        <AccountListContainer web3={this.props.web3} />
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchEthAccounts
} from './actions'

import BoardContainer from 'board'
import createNewBoard from 'new'
import './index.css'


const mapStateToProps = store => {
  return {
    eth: store.app.web3.eth
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchEthAccounts
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  
  componentWillMount(){
    this.props.fetchEthAccounts(this.props.eth)
  }

  render() { return (
    <div>
      header
      <button onClick={createNewBoard}>
        click here to create a new board and then check your console to view its address
      </button>
      <BoardContainer />
      footer
    </div>
  )}
}
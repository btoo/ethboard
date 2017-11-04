import React, { Component } from 'react'

export default class Nav extends Component {
  
  render() { return (
    <nav className="nav">
      this is the nav
      <br/>
      {
        this.props.boardContract
          ? 'address: ' + this.props.boardContract.address
          : ''
      }
    </nav>
  )}

}
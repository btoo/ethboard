import React, { Component } from 'react'

export default class Nav extends Component {
  
  render() { return (
    <nav className="nav">
      this is the nav
      <br/>
      address: {this.props.boardAddress}
    </nav>
  )}

}
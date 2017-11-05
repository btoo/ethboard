import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { postAd } from 'board/actions'

const mapStateToProps = store => { // set the props for this component
  return {
    web3: store.app.web3,
    txObj: store.app.txObj,
    boardContract: store.board.boardContract,
    ads: store.board.ads
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  postAd
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class AdPoster extends Component { // use class declaration for now because this babel decorator doesnt support decorators on anything else..
  
  constructor(props){
    super(props)
    this.state = {
      title: '',
      img: '',
      href: '',
      contribution: ''
    }

    this.placeholder = {
      title: 'Ad title',
      img: 'Ad image url',
      href: 'Ad website',
      contribution: 'Ad contribution (in gwei)'
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    this.setState({ [target.name]: target.value })
  }


  handleSubmit(event) {
    const postedAdIndex = this.props.ads.length
    this.props.postAd(
      this.props.web3,
      this.props.txObj,
      this.props.boardContract,
      postedAdIndex,
      this.state
    )
    event.preventDefault()
  }

  render() { return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Title
        <input
          name="title"
          type="text"
          value={this.state.title}
          placeholder={this.placeholder.title}
          onChange={this.handleInputChange}
          />
      </label>
      <br />
      <label>
        Image
        <input
          name="img"
          type="text"
          value={this.state.img}
          placeholder={this.placeholder.img}
          onChange={this.handleInputChange}
          />
      </label>
      <br />
      <label>
        Website
        <input
          name="href"
          type="text"
          value={this.state.href}
          placeholder={this.placeholder.href}
          onChange={this.handleInputChange}
          />
      </label>
      <br />
      <label>
        Contribution (gwei)
        <input
          name="contribution"
          type="number"
          value={this.state.contribution}
          placeholder={this.placeholder.contribution}
          onChange={this.handleInputChange}
          />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  )}
  
}
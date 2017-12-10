import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { postAd } from 'board/actions'
import './index.css'
import AdPosterFormContainer, { field as AdPosterFormField } from './form'

const emptyAd = { title: '', img: '', href: '', contribution: '' }
    , lastFieldIndex = Object.keys(emptyAd).length - 1
    , placeholder = { title: 'title', img: 'image url', href: 'website url', contribution: 'contribution (in ETH)' }

const switchActiveFormField = next => adPoster => { if(next ? (adPoster.state.activeFormField < lastFieldIndex) : (adPoster.state.activeFormField > 0)) {
  adPoster.setState({
    ...adPoster.state,
    activeFormField: adPoster.state.activeFormField + (next ? 1 : -1)
  })
  setTimeout(_ => adPoster.fieldNodes[adPoster.state.activeFormField].focus(), 0) // need to wait for call stack to clear up (more info found here: https://www.youtube.com/watch?v=8aGhZQkoFbQ)
}}

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
export default class AdPoster extends Component {
  // use class declaration for now because this babel decorator doesnt support decorators on anything else..

  constructor(props) {
    super(props)
    this.state = {
      activeFormField: 0,
      ad: { ...emptyAd }
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.nextInput = this.nextInput.bind(this)
    this.prevInput = this.prevInput.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    this.setState({
      ...this.state,
      ad: {
        ...this.state.ad,
        [target.name]: target.value
      }
    })
  }

  nextInput(event) { switchActiveFormField(true)(this) }

  prevInput(event) { switchActiveFormField(false)(this) }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.state.activeFormField === lastFieldIndex
        ? this.handleSubmit()
        : this.nextInput()

      event.preventDefault()
    }
    // else continue with default behavior
  }

  handleSubmit(event) {
    this.setState({
      activeFormField: 0,
      ad: { ...emptyAd }
    })
    const postedAdIndex = this.props.ads.length
    this.props.postAd(
      this.props.web3,
      this.props.txObj,
      this.props.boardContract,
      postedAdIndex,
      this.state.ad
    )
    event && event.preventDefault()
  }

  render() {
    const activeFormField = this.state.activeFormField
    const fields = [ // i would use stateless components but i cant allow for the component to be rerendered, so ill have to do this for now
      <AdPosterFormField name="title" key="title" fieldIndex={0} activeFormField={activeFormField} handleKeyPress={this.handleKeyPress}>
        <input name="title" type="text" value={this.state.ad.title} placeholder={placeholder.title} onChange={this.handleInputChange} autoFocus />
      </AdPosterFormField>,
      <AdPosterFormField name="img" key="img" fieldIndex={1} activeFormField={activeFormField} handleKeyPress={this.handleKeyPress}>
        <input name="img" type="text" value={this.state.ad.img} placeholder={placeholder.img} onChange={this.handleInputChange} autoFocus />
      </AdPosterFormField>,
      <AdPosterFormField name="href" key="href" fieldIndex={2} activeFormField={activeFormField} handleKeyPress={this.handleKeyPress}>
        <input name="href" type="text" value={this.state.ad.href} placeholder={placeholder.href} onChange={this.handleInputChange} autoFocus />
      </AdPosterFormField>,
      <AdPosterFormField name="contribution" key="contribution" fieldIndex={3} activeFormField={activeFormField} handleKeyPress={this.handleKeyPress}>
        <input name="contribution" type="number" value={this.state.ad.contribution} placeholder={placeholder.contribution} onChange={this.handleInputChange} autoFocus />
      </AdPosterFormField>
    ]

    const submittable = !Object.values(this.state.ad).some(field => !field) // if any field is empty
        , buttonClass = c => `button ${c}`

    return (
      <form onSubmit={this.handleSubmit} className="post-ad-form" ref={node => {
        if(node) this.fieldNodes = node.querySelectorAll('.post-ad-form--field input')
      }}>

        <AdPosterFormContainer activeFormField={activeFormField}>
          {fields}
        </AdPosterFormContainer>

        <div className="post-ad-form--controls">
          <input type="button" onClick={this.prevInput} className={buttonClass(activeFormField > 0 ? '' : 'inactive')} value="prev" />
          <input type="button" onClick={this.nextInput} className={buttonClass(activeFormField < lastFieldIndex ? '' : 'inactive')} value="next" />
          <input type="submit" value="submit" className={buttonClass(activeFormField === fields.length - 1 ? '' : 'inactive')} disabled={!submittable} />
        </div>

      </form>
    )
  }
}
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { postAd } from 'board/actions'
import './index.css'
import AdPosterFormContainer, { field as AdPosterFormField } from './form'

const placeholder = {
  title: 'Ad title',
  img: 'Ad image url',
  href: 'Ad website',
  contribution: 'Ad contribution (in gwei)'
}

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

  constructor(props) {
    super(props)
    this.state = {
      activeFormField: 0,
      ad: {
        title: '',
        img: '',
        href: '',
        contribution: ''
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this)
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

  nextInput(fieldsCount){ return event => { if(this.state.activeFormField < (fieldsCount - 1)) {
    this.setState({
      ...this.state,
      activeFormField: this.state.activeFormField + 1
    })
  }}}

  prevInput(fieldsCount){ return event => { if(this.state.activeFormField > 0) {
    this.setState({
      ...this.state,
      activeFormField: this.state.activeFormField - 1
    })
  }}}

  handleSubmit(event) {
    this.setState({
      ...this.state,
      activeFormField: 0
    })
    const postedAdIndex = this.props.ads.length
    this.props.postAd(
      this.props.web3,
      this.props.txObj,
      this.props.boardContract,
      postedAdIndex,
      this.state.ad
    )
    event.preventDefault()
  }

  render(){
    
    const activeFormField = this.state.activeFormField
    const fields = [
      <AdPosterFormField name="title" key="title" fieldIndex={0} activeFormField={activeFormField}>
        <input name="title" type="text" value={this.state.ad.title} placeholder={placeholder.title} onChange={this.handleInputChange} />
      </AdPosterFormField>,
      <AdPosterFormField name="img" key="img" fieldIndex={1} activeFormField={activeFormField}>
        <input name="img" type="text" value={this.state.ad.img} placeholder={placeholder.img} onChange={this.handleInputChange} />
      </AdPosterFormField>,
      <AdPosterFormField name="href" key="href" fieldIndex={2} activeFormField={activeFormField}>
        <input name="href" type="text" value={this.state.ad.href} placeholder={placeholder.href} onChange={this.handleInputChange} />
      </AdPosterFormField>,
      <AdPosterFormField name="contribution" key="contribution" fieldIndex={3} activeFormField={activeFormField}>
        <input name="contribution" type="number" value={this.state.ad.contribution} placeholder={placeholder.contribution} onChange={this.handleInputChange} />
      </AdPosterFormField>
    ]

    return (
      <form onSubmit={this.handleSubmit} className="post-ad-form">

        <AdPosterFormContainer activeFormField={activeFormField}>
          {fields}
        </AdPosterFormContainer>
        
        <div className="post-ad-form--controls">
          <input type="button" onClick={this.prevInput(fields.length)} className={activeFormField > 0 ? '' : 'disabled'} value="prev" />
          <input type="button" onClick={this.nextInput(fields.length)} className={activeFormField < (fields.length - 1) ? '' : 'disabled'} value="next" />
          {activeFormField === (fields.length - 1)
            ? <input type="submit" value="submit" />
            : ''
          }
        </div>

      </form>
    )
  }

}
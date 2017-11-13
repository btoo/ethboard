import React, { Component } from 'react'
import { select } from 'd3'
import './index.css'

import generateBubbles from './generate-bubbles'

export default class BubblesContainer extends Component {

  constructor(props){
    super(props)
  }
  
  componentDidMount(){ generateBubbles(this) }
  componentDidUpdate(){ generateBubbles(this) }

  render(){
    return (
      <svg className="bubbles" height={this.props.height} width={this.props.width}>
        <defs>
          {this.props.ads.map((ad, i) => (
            <pattern
              key={i}
              id={'ad-' + ad.address}
              height="100%"
              width="100%"
              patternContentUnits="objectBoundingBox"
            >
              <image
                height="1"
                width="1"
                preserveAspectRatio="xMidYMid slice"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref={ad.img}
              />
            </pattern>
          ))}
        </defs>
        <rect className="bubbles--bg" width="100%" height="100%" />
        <g className="bubbles--group" ref={node => this.bubblesGroup = select(node)} />
      </svg>
    )
  }

}
import React from 'react'

export default props => (
  <div className="post-ad-form--fields">
    {/* {props.children[props.activeFormField]} */}
    {props.children}
  </div>
)

export const field = props => {
  let classes = ['post-ad-form--field', `post-ad-form--field-${props.name}`]
  
  const disabled = props.activeFormField !== props.fieldIndex
  disabled && classes.push('disabled')

  const classesText = classes.join(' ')

  return (
    <label className={classesText} htmlFor={`post-ad-form--field-${props.name}`} onKeyPress={props.handleKeyPress}>
      {/* {props.name} */}
      {props.children}
    </label>
  )
}